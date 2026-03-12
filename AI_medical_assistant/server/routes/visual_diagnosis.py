from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from utils.voice_of_patient import transcribe_with_groq
from utils.voice_of_doctor import text_to_speech_with_gtts
from utils.brain import analyze_image, encode_image
from dotenv import load_dotenv

load_dotenv()

visual_bp = Blueprint("visual", __name__)

@visual_bp.route("/visual-diagnosis", methods=["POST"])
def visual_diagnosis():
    try:
        audio = request.files.get("audio")
        image = request.files.get("image")

        if not audio or not image:
            return jsonify({"error": "Both audio and image are required."}), 400

        os.makedirs("temp", exist_ok=True)
        audio_path = os.path.join("temp", secure_filename(audio.filename))
        image_path = os.path.join("temp", secure_filename(image.filename))
        audio.save(audio_path)
        image.save(image_path)

        # Step 1: Transcribe voice
        transcript = transcribe_with_groq(
            stt_model="whisper-large-v3",
            audio_filepath=audio_path,
            GROQ_API_KEY=os.getenv("GROQ_API_KEY")
        )

        # Step 2: Analyze image with LLM
        doctor_text = analyze_image(
            query=(
                "You are a doctor. A patient has uploaded the following image and said this: '"
                    + transcript +
                    "'. Based on the image and this statement, explain what medical condition they might have in simple terms."
            ),
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            encoded_img=encode_image(image_path)
        )

        voice_path = os.path.join("temp", "final.mp3")
        error_message = ""

        # Step 3: Use gTTS for text-to-speech
        try:
            text_to_speech_with_gtts(input_text=doctor_text, output_filepath=voice_path)
        except Exception as e:
            print(f"ERROR in gTTS: {e}")
            return jsonify({
                "transcript": transcript,
                "doctor_text": doctor_text,
                "audio_url": None,
                "error": "Voice synthesis failed: gTTS error."
            }), 200

        # Step 4: Return response
        return jsonify({
            "transcript": transcript,
            "doctor_text": doctor_text,
            "audio_url": "/static/final.mp3",
            "error": error_message  # Empty if successful
        }), 200

    except Exception as e:
        print(f"❌ Unexpected error in /visual-diagnosis: {e}")
        return jsonify({"error": str(e)}), 500
