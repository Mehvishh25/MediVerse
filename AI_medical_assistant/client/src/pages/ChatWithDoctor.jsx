import { useState, useRef } from "react";
import axios from "axios";

function ChatWithDoctor() {
  const [image, setImage] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audio = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudioBlob(audio);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (!audioBlob || !image)
      return alert("Please provide both audio and image.");

    const formData = new FormData();
    formData.append("audio", audioBlob, "patient_audio.wav");
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/visual-diagnosis",
        formData
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error occurred! Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg"
          alt="Visual Diagnosis Assistant"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Visual Diagnosis Assistant
          </h1>
          <p className="max-w-3xl text-white/90 text-base md:text-md font-normal drop-shadow">
            Upload an image of the affected area and record a short description
            of your symptoms. Our AI-powered assistant will analyze your input
            and provide a preliminary diagnosis and advice.{" "}
            <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Note:</span> This
            tool is for informational purposes and does not replace professional
            medical advice.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-b from-green-50 to-white min-h-screen">
        <div className="w-full max-w-4xl flex flex-col bg-white border border-gray-100 rounded-3xl shadow-xl p-10 md:p-16 mb-10 space-y-12">
          <div className="text-center">
            <h2 className="text-md md:text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-3">
              <span className="bg-green-100 rounded-full">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-green-600"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Visual Diagnosis Feature
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Upload an image and record a short description of your symptoms.
              Our advanced AI will analyze your inputs and offer a preliminary
              diagnosis and helpful recommendations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mt-2">
            <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="bg-white p-4 rounded-full shadow-md">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-green-600"
                >
                  <path
                    d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V20a1 1 0 1 1-2 0v-2.08A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <h3 className="font-semibold text-green-800 text-lg text-center">
                Record Patient's Voice
              </h3>

              <p className="text-gray-600 text-sm text-center mb-4">
                Describe your symptoms clearly for better analysis
              </p>

              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform"
                >
                  Stop Recording
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform"
                >
                  Start Recording
                </button>
              )}
              {audioBlob && (
                <div className="flex items-center gap-2 text-green-700 mt-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Audio Recorded Successfully
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-br from-green-50 to-indigo-50 rounded-2xl border border-green-100">
              <div className="bg-white p-4 rounded-full shadow-md">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-green-600"
                >
                  <path
                    d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM5 5h14v7.382l-2.447-2.447a2 2 0 0 0-2.828 0l-5.382 5.382-2.447-2.447V5Zm0 14v-4.618l3.553-3.553 2.447 2.447a2 2 0 0 0 2.828 0l5.382-5.382L19 14.618V19H5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-green-800 text-md md:text-lg text-center">
                Upload Image of Affected Area
              </h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Clear photos help provide more accurate analysis
              </p>
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl text-gray-700 px-4 py-6 focus:outline-none focus:border-green-500 hover:border-green-400 transition-colors duration-200 text-center cursor-pointer"
                />
              </div>
              {image && (
                <div className="flex items-center gap-2 text-green-700 mt-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Image Selected Successfully
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSubmit}
              className="bg-green-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-3 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
              {loading ? "Processing Your Request..." : "Submit for Diagnosis"}
            </button>
          </div>
        </div>
        {result && (
          <div className="w-full max-w-4xl bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-xl mt-12 space-y-10">
            <div className="border-l-4 border-green-500 pl-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center gap-2">
                <span className="text-2xl">🗣️</span>
                Transcript
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {result.transcript}
                </p>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center gap-2">
                <span className="text-2xl">👨‍⚕️</span>
                Doctor's Response
              </h2>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {result.doctor_text}
                </p>
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
                <span className="text-2xl">🔊</span>
                Voice Output
              </h2>
              <div className="bg-purple-50 rounded-xl p-6">
                <audio
                  controls
                  src={`http://localhost:5000${result.audio_url}`}
                  className="w-full h-12 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ChatWithDoctor;
