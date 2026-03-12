import io
import base64
from flask import Blueprint, request, jsonify
from PIL import Image

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

xray_analyzer_bp = Blueprint("xray_analyzer", __name__)

# ------------------------------
# LLM INIT (GLOBAL - BETTER PERFORMANCE)
# ------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",   # ✅ Correct model
    temperature=0,
    max_retries=3,
    timeout=60
)

# ------------------------------
# PROMPT
# ------------------------------
PROMPT_TEMPLATE = """
You are a highly skilled radiology imaging expert.

Analyze the medical image and return structured markdown output.

1. Image Type & Region
- Imaging modality
- Body region
- Image quality

2. Key Findings
- Main observations
- Possible abnormalities

3. Diagnostic Assessment
- Primary possible diagnosis
- Differential diagnoses (ranked)

4. Patient Friendly Explanation
- Simple explanation
- No medical jargon

IMPORTANT:
- If image is NOT a medical X-ray, say: Invalid medical imaging type.
- This is AI assistance, not a final medical diagnosis.
"""

# ------------------------------
# ROUTE
# ------------------------------
@xray_analyzer_bp.route("/analyze", methods=["POST"])
def analyze_xray():

    if "file" not in request.files:
        return jsonify({"response": "No image uploaded"}), 400

    try:
        file = request.files["file"]

        # ------------------------------
        # Load Image
        # ------------------------------
        image = Image.open(io.BytesIO(file.read())).convert("RGB")

        # Optional resize
        max_width = 600
        if image.width > max_width:
            ratio = max_width / image.width
            image = image.resize((max_width, int(image.height * ratio)))

        # ------------------------------
        # Convert to Base64
        # ------------------------------
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_base64 = base64.b64encode(buffer.getvalue()).decode()

        # ------------------------------
        # Create Multimodal Message
        # ------------------------------
        message = HumanMessage(
            content=[
                {"type": "text", "text": PROMPT_TEMPLATE},
                {
                    "type": "image_url",
                    "image_url": f"data:image/png;base64,{img_base64}"
                }
            ]
        )

        # ------------------------------
        # Call Gemini
        # ------------------------------
        response = llm.invoke([message])

        return jsonify({"response": response.content})

    except Exception as e:
        print("🚨 Xray Error:", str(e))
        return jsonify({"response": f"Error analyzing X-ray: {str(e)}"}), 500
