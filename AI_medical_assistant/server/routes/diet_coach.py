from flask import Blueprint, request, jsonify
import os

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# ------------------------------
# Blueprint
# ------------------------------
diet_coach_bp = Blueprint("diet_coach", __name__)

# ------------------------------
# Gemini via LangChain
# ------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.4,
    max_retries=3,        # 🔥 this is why it will work
    timeout=30
)

# ------------------------------
# Prompt Template
# ------------------------------
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a certified dietician."),
        ("human",
        """
Generate a personalized diet plan based on:
- Age: {age}
- Height: {height} cm
- Weight: {weight} kg
- Gender: {gender}
- Lifestyle: {lifestyle}
- Goal: {goal}
- Diseases: {diseases}
- Allergies: {allergies}
- Meal Preference: {meal_pref}
- Cuisine Preference: {cuisine}

Return ONLY the following sections in plain text:
Breakfast
Mid-Morning Snack
Lunch
Evening Snack
Dinner
Hydration
Lifestyle Tips
Disclaimer

Rules:
- No markdown
- No HTML
- No emojis
- Clear formatting
"""
        )
    ]
)

# ------------------------------
# Chain
# ------------------------------
chain = prompt | llm | StrOutputParser()

# ------------------------------
# API Endpoint
# ------------------------------
@diet_coach_bp.route("/plan", methods=["POST"])
def generate_diet_plan():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        user_info = {
            "age": data.get("age", "N/A"),
            "height": data.get("height", "N/A"),
            "weight": data.get("weight", "N/A"),
            "gender": data.get("gender", "N/A"),
            "lifestyle": data.get("lifestyle", "N/A"),
            "goal": data.get("goal", "N/A"),
            "diseases": data.get("diseases", "None"),
            "allergies": data.get("allergies", "None"),
            "meal_pref": data.get("meal_pref", "None"),
            "cuisine": data.get("cuisine", "None"),
        }

        response = chain.invoke(user_info)

        return jsonify({"response": response.strip()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
