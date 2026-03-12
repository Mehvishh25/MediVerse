from flask import Blueprint, request, jsonify
import os
import fitz  # PyMuPDF
import pytesseract
from pdf2image import convert_from_bytes

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

lab_report_bp = Blueprint("lab_report", __name__)

# ------------------------------
# Gemini via LangChain
# ------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.3,
    max_retries=3,
    timeout=30
)

# ------------------------------
# System prompt for lab analysis
# ------------------------------
SYSTEM_PROMPT = """
You are a skilled medical expert and health advisor. 
Analyze lab report content and provide structured output in markdown:

### 1. Key Medical Findings
- Identify abnormal values.
- Describe critical markers (glucose, hemoglobin, WBCs, cholesterol, etc.).

### 2. Health Insights
- Explain results in simple language.
- Include possible conditions or risk factors.

### 3. Recommended Actions
- Suggest lifestyle changes, follow-up tests, and when to consult a doctor.

### 4. Diet & Lifestyle Advice
- Provide relevant food, habits, and fitness tips.

Be concise and accurate. Only include health-related insights.
"""

# ------------------------------
# Prompt Template
# ------------------------------
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}")
    ]
)

chain = prompt | llm | StrOutputParser()

# ------------------------------
# Chat memory (optional, per report)
# ------------------------------
chat_history = []

# ------------------------------
# Helpers
# ------------------------------
def extract_text_pdf(pdf_bytes):
    """Extract text from searchable PDF"""
    text = ""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    for page in doc:
        text += page.get_text()
    return text.strip()

def extract_ocr_pdf(pdf_bytes):
    """Extract text from scanned PDF via OCR"""
    images = convert_from_bytes(pdf_bytes)
    text = ""
    for img in images:
        gray = img.convert("L")
        text += pytesseract.image_to_string(gray)
    return text.strip()

# ------------------------------
# Route: /lab/analyze
# ------------------------------
@lab_report_bp.route("/analyze", methods=["POST"])
def analyze_lab_report():
    global chat_history

    if "file" not in request.files:
        return jsonify({"response": "No file uploaded."}), 400

    file = request.files["file"]
    pdf_bytes = file.read()

    # Extract text
    text = extract_text_pdf(pdf_bytes)
    if not text or len(text) < 50:
        text = extract_ocr_pdf(pdf_bytes)

    if not text or len(text) < 50:
        return jsonify({"response": "Could not extract meaningful content from the lab report."}), 400

    try:
        # Call Gemini via LangChain
        reply = chain.invoke({
            "chat_history": chat_history,
            "input": text
        })

        # Update memory (optional per session)
        chat_history.append(HumanMessage(content=text))
        chat_history.append(AIMessage(content=reply))

        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"response": f"❌ Gemini error: {str(e)}"}), 500
