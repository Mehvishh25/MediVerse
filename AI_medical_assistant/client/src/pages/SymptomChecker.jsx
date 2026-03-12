import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Card from "../components/Card";

const symptoms = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
  "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
  "burning_micturition", "spotting_ urination", "fatigue", "weight_gain", "anxiety",
  "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy", "patches_in_throat",
  "irregular_sugar_level", "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating",
  "dehydration", "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite",
  "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
  "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
  "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation",
  "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs"
];

const options = symptoms.map(symptom => ({
  label: symptom.replaceAll("_", " "),
  value: symptom
}));

function SymptomChecker() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) return alert("Please select symptoms.");

    const selectedSymptoms = selectedOptions.map(opt => opt.value);
    setLoading(true);
    setPrediction(null);

    try {
      const res = await axios.post("http://localhost:5000/disease/predict-symptoms", {
        symptoms: selectedSymptoms,
      });
      setPrediction(res.data);
    } catch (err) {
      setPrediction({
        error: err?.response?.data?.error || "Something went wrong while predicting.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/6029056/pexels-photo-6029056.jpeg"
          alt="Symptom Checker"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Symptom Checker
          </h1>
          <p className="max-w-3xl text-white/90 text-base md:text-md font-normal drop-shadow">
            Select your symptoms and let our AI provide a preliminary disease prediction and helpful recommendations. <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Note:</span> This tool is for informational purposes and does not replace professional medical advice.
          </p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex flex-col justify-center items-center px-6 py-16 min-h-screen">
        <div className="w-full max-w-4xl flex flex-col bg-white border border-gray-100 rounded-3xl shadow-lg p-10 md:p-16 mb-10 space-y-12">
          <div className="text-center">
            <h2 className="text-sm md:text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-3">
              <span className="bg-green-100 rounded-full">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-600"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z" fill="currentColor"/></svg>
              </span>
              Symptom Checker Feature
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Select your symptoms from the list below and get a quick, AI-powered health evaluation.
            </p>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="max-w-3xl mx-auto">
              <Select
                options={options}
                isMulti
                onChange={setSelectedOptions}
                placeholder="Type or select symptoms..."
                className="mb-4 text-black"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-10 bg-green-700 shadow-lg hover:bg-green-800 text-white font-bold rounded-xl transition duration-200 text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                )}
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>
          </form>
        </div>

        {/* Prediction Result */}
        <div className="w-full max-w-6xl bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-lg mt-4 space-y-10">
          <h3 className="text-green-700 text-center text-2xl font-semibold mb-6 lg:text-3xl">
            Evaluation of your Symptoms
          </h3>
          <div className="ai-response-container">
            {prediction ? (
              prediction.error ? (
                <p className="text-center text-red-500 font-semibold">{prediction.error}</p>
              ) : (
                <div className="flex flex-col items-center text-green-900">
                  <Card heading={"Predicted Disease:"} para={prediction.disease} />
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr justify-items-stretch mt-6">
                    <Card paraHeading={"Description:"} para={prediction.description} />
                    <Card paraHeading={"Precautions:"} para={prediction.precautions?.join(", ") || "-"} />
                    <Card paraHeading={"Medications:"} para={prediction.medications?.join(", ") || "-"} />
                    <Card paraHeading={"Diets:"} para={prediction.diets?.join(", ") || "-"} />
                    <Card paraHeading={"Workout:"} para={prediction.workout?.join(", ") || "-"} />
                  </div>
                </div>
              )
            ) : (
              <h3 className="text-center text-gray-400">The Evaluation will generate here</h3>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SymptomChecker;
