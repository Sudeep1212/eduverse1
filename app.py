import streamlit as st
import cv2
import PIL
import numpy as np
import google.generativeai as genai
import warnings
from streamlit_extras.add_vertical_space import add_vertical_space
from mediapipe.python.solutions import hands, drawing_utils

# Hide excessive warnings
warnings.filterwarnings("ignore", category=UserWarning)

# -- Streamlit Page Config --
st.set_page_config(
    page_title="MagicLearn DrawInAir",
    layout="wide"
)

# -- Constants/Keys --
GOOGLE_API_KEY = "AIzaSyBiAMiZ0GSqTtaMIeBXzuv38-JHJJ8sy8w"  # Update with your valid API key

# -----------------------------
#         DrawInAir Class
# -----------------------------
class DrawInAir:
    def __init__(self):
        # Setup Webcam
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 950)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 550)
        self.cap.set(cv2.CAP_PROP_BRIGHTNESS, 130)

        # Blank canvas for drawing
        self.imgCanvas = np.zeros((550, 950, 3), dtype=np.uint8)

        # Mediapipe Hands
        self.mphands = hands.Hands(max_num_hands=1, min_detection_confidence=0.75)

        # Drawing state
        self.p1, self.p2 = 0, 0
        self.fingers = []

    def streamlit_config(self):
        """
        Adjust some Streamlit UI elements.
        """
        page_background_color = """
        <style>
            [data-testid="stHeader"] {
                background: rgba(0,0,0,0);
            }
            .block-container {
                padding-top: 0rem;
            }
        </style>
        """
        st.markdown(page_background_color, unsafe_allow_html=True)
        st.markdown('<h1 style="text-align: center;">MagicLearn DrawInAir</h1>', unsafe_allow_html=True)
        add_vertical_space(1)

    def process_frame(self):
        success, img = self.cap.read()
        if not success:
            return
        img = cv2.resize(img, (950, 550))
        self.img = cv2.flip(img, 1)
        self.imgRGB = cv2.cvtColor(self.img, cv2.COLOR_BGR2RGB)

    def process_hands(self):
        result = self.mphands.process(self.imgRGB)
        self.landmark_list = []
        if result.multi_hand_landmarks:
            for hand_lms in result.multi_hand_landmarks:
                drawing_utils.draw_landmarks(
                    self.img,
                    hand_lms,
                    hands.HAND_CONNECTIONS
                )
                for idx, lm in enumerate(hand_lms.landmark):
                    h, w, _ = self.img.shape
                    cx, cy = int(lm.x * w), int(lm.y * h)
                    self.landmark_list.append([idx, cx, cy])

    def identify_fingers(self):
        self.fingers = []
        if not self.landmark_list:
            return

        # Finger detection logic
        for finger_id in [4, 8, 12, 16, 20]:
            if finger_id != 4:
                if self.landmark_list[finger_id][2] < self.landmark_list[finger_id - 2][2]:
                    self.fingers.append(1)
                else:
                    self.fingers.append(0)
            else:
                if self.landmark_list[finger_id][1] < self.landmark_list[finger_id - 2][1]:
                    self.fingers.append(1)
                else:
                    self.fingers.append(0)

        # Draw a small circle at each raised fingertip
        for i, val in enumerate(self.fingers):
            if val == 1:
                cx, cy = self.landmark_list[(i + 1) * 4][1], self.landmark_list[(i + 1) * 4][2]
                cv2.circle(self.img, (cx, cy), 5, (255, 0, 255), 1)

    def handle_drawing_mode(self):
        """
        Different gestures to draw/erase/clear:
        - Thumb + Index (2 fingers up): draw
        - Thumb + Middle (2 fingers up): erase
        - Thumb + Index + Middle (3 fingers up): reset line anchor
        - Thumb + Pinky (2 fingers up): clear entire canvas
        """
        if sum(self.fingers) == 2 and self.fingers[0] == self.fingers[1] == 1:
            # Thumb + Index = Draw
            cx, cy = self.landmark_list[8][1], self.landmark_list[8][2]
            if self.p1 == 0 and self.p2 == 0:
                self.p1, self.p2 = cx, cy
            cv2.line(self.imgCanvas, (self.p1, self.p2), (cx, cy), (255, 0, 255), 5)
            self.p1, self.p2 = cx, cy

        elif sum(self.fingers) == 3 and self.fingers[0] == self.fingers[1] == self.fingers[2] == 1:
            # Thumb + Index + Middle = Move (reset anchor)
            self.p1, self.p2 = 0, 0

        elif sum(self.fingers) == 2 and self.fingers[0] == self.fingers[2] == 1:
            # Thumb + Middle = Erase
            cx, cy = self.landmark_list[12][1], self.landmark_list[12][2]
            if self.p1 == 0 and self.p2 == 0:
                self.p1, self.p2 = cx, cy
            cv2.line(self.imgCanvas, (self.p1, self.p2), (cx, cy), (0, 0, 0), 15)
            self.p1, self.p2 = cx, cy

        elif sum(self.fingers) == 2 and self.fingers[0] == self.fingers[4] == 1:
            # Thumb + Pinky = Clear canvas
            self.imgCanvas = np.zeros((550, 950, 3), dtype=np.uint8)

    def blend_canvas_with_feed(self):
        # Blend drawing canvas with camera feed
        imgGray = cv2.cvtColor(self.imgCanvas, cv2.COLOR_BGR2GRAY)
        _, imgInv = cv2.threshold(imgGray, 50, 255, cv2.THRESH_BINARY_INV)
        imgInv = cv2.cvtColor(imgInv, cv2.COLOR_GRAY2BGR)
        temp_img = cv2.addWeighted(self.img, 0.7, self.imgCanvas, 1, 0)
        temp_img = cv2.bitwise_and(temp_img, imgInv)
        self.img = cv2.bitwise_or(temp_img, self.imgCanvas)

    def analyze_image_with_genai(self):
        # Convert canvas to PIL image and send for analysis
        imgCanvas_rgb = cv2.cvtColor(self.imgCanvas, cv2.COLOR_BGR2RGB)
        pil_image = PIL.Image.fromarray(imgCanvas_rgb)

        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')

        prompt = (
            "Analyze the image and provide the following:\n"
            "* If a mathematical equation is present:\n"
            "   - The equation represented in the image.\n"
            "   - The solution to the equation.\n"
            "   - A short explanation of the steps taken to arrive at the solution.\n"
            "* If a drawing is present and no equation is detected:\n"
            "   - A brief description of the drawn image in simple terms.\n"
        )
        response = model.generate_content([prompt, pil_image])
        return response.text

    def main(self):
        # Layout: camera feed on left, instructions and output on right
        col1, _, col3 = st.columns([0.8, 0.02, 0.18])
        with col1:
            stframe = st.empty()
        with col3:
            st.markdown(
                """
                <h5 style="text-align: center;">Finger Gestures:</h5>
                <ul>
                    <li><b>Thumb + Index:</b> Start drawing.</li>
                    <li><b>Thumb + Middle:</b> Erase drawing.</li>
                    <li><b>Thumb + Index + Middle:</b> Reset drawing anchor.</li>
                    <li><b>Thumb + Pinky:</b> Clear canvas.</li>
                    <li><b>Index + Middle:</b> Analyze drawing (if triggered).</li>
                </ul>
                """,
                unsafe_allow_html=True
            )
            st.markdown('<h5 style="color:cyan;">OUTPUT:</h5>', unsafe_allow_html=True)
            result_placeholder = st.empty()

        while True:
            if not self.cap.isOpened():
                add_vertical_space(5)
                st.markdown(
                    """
                    <h4 style="color:orange;">
                    Error: Could not open webcam. Please ensure your webcam is connected.
                    </h4>
                    """,
                    unsafe_allow_html=True
                )
                break

            self.process_frame()
            self.process_hands()
            self.identify_fingers()
            self.handle_drawing_mode()
            self.blend_canvas_with_feed()

            # Convert to RGB and update the Streamlit image
            show_img = cv2.cvtColor(self.img, cv2.COLOR_BGR2RGB)
            stframe.image(show_img, channels="RGB")

            # Optionally trigger analysis (example gesture: Index + Middle)
            if len(self.fingers) == 5 and self.fingers[1] == 1 and self.fingers[2] == 1 and sum(self.fingers) == 2:
                result = self.analyze_image_with_genai()
                result_placeholder.write(f"Result: {result}")

        self.cap.release()
        cv2.destroyAllWindows()

# -----------------------------
#       Run DrawInAir Directly
# -----------------------------
if __name__ == "__main__":
    drawinair = DrawInAir()
    drawinair.streamlit_config()
    drawinair.main()
