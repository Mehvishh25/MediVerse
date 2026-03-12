from flask import Blueprint, request, jsonify

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

medchatbot_bp = Blueprint("medchatbot", __name__)

# ------------------------------
# Gemini via LangChain
# ------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.4,
    max_retries=3,   # 🔥 handles 503 overloads
    timeout=30
)

# ------------------------------
# System prompt (medical guardrails)
# ------------------------------
SYSTEM_PROMPT = (
    "You are an experienced, ethical AI medical assistant. "
    "Only answer strictly medical questions. "
    "Do NOT answer math, general knowledge, or unrelated queries. "
    "If the question is not medical, reply ONLY with: 'I don't know.' "
    "Never call yourself 'Doctor'. Avoid greetings. "
    "Be concise. Ask follow-up questions if necessary."
)

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
# Chat memory (simple in-memory)
# ------------------------------
chat_history = []  # list of HumanMessage / AIMessage

# ------------------------------
# API Endpoint
# ------------------------------
@medchatbot_bp.route("/chat", methods=["POST"])
def chat():
    global chat_history

    try:
        data = request.get_json()
        user_input = data.get("message", "").strip()

        if not user_input:
            return jsonify({"reply": "❌ Please send a valid message."}), 400

        # Invoke LangChain
        reply = chain.invoke({
            "chat_history": chat_history,
            "input": user_input
        })

        # Update memory
        chat_history.append(HumanMessage(content=user_input))
        chat_history.append(AIMessage(content=reply))

        return jsonify({"reply": reply})

    except Exception as e:
        print("🚨 Gemini Error:", str(e))
        return jsonify({"reply": f"❌ Gemini error: {str(e)}"}), 500
