from flask import Blueprint, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM

medchatbot_bp = Blueprint("medchatbot", __name__)

tokenizer = AutoTokenizer.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")
model = AutoModelForCausalLM.from_pretrained("Abonia/tinyllama-medical-chat").cpu()

@medchatbot_bp.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")

        prompt = f"Patient: {user_input}\nDoctor:"
        inputs = tokenizer(prompt, return_tensors="pt")
        inputs = {k: v.cpu() for k, v in inputs.items()}

        outputs = model.generate(
            **inputs,
            max_new_tokens=80,
            do_sample=True,
            top_p=0.9,
            top_k=50,
            pad_token_id=tokenizer.eos_token_id
        )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        doctor_reply = response.split("Doctor:")[-1].split("Patient:")[0].strip()

        return jsonify({"reply": doctor_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
