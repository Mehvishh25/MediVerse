import { useState } from "react";

function LabReport() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert("Please select a PDF file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/lab/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.response);
    } catch {
      setResult("Error occurred during analysis.");
    }

    setLoading(false);
  };

  const formatResult = (text) => {
    return text
      // Convert ### headers to green bold titles
      .replace(/^###\s*(.*)$/gm, '<span class="text-green-700 font-bold text-lg">$1</span><br /><br />')
      // Convert **bold** text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Bullet points
      .replace(/^•\s*/gm, '• ')
      // Paragraph spacing
      .replace(/\n{2,}/g, '<br /><br />')
      // Line breaks
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/7088486/pexels-photo-7088486.jpeg"
          alt="Lab Report Analyzer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Lab Report Analyzer
          </h1>
          <p className="max-w-3xl text-white/90 text-base md:text-md font-normal drop-shadow">
            Upload your lab report PDF and let our AI analyze it for a quick, preliminary summary. <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Note:</span> This tool is for informational purposes and does not replace professional medical advice.
          </p>
        </div>
      </section>

      {/* Feature Card Section */}
      <section className="flex flex-col justify-center items-center px-6 py-16 min-h-screen">
        <div className="w-full max-w-2xl flex flex-col bg-white border border-gray-100 rounded-3xl shadow-lg p-10 md:p-16 mb-10 space-y-10">
          <div className="text-center">
            <h2 className="text-md md:text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-3">
              <span className="bg-green-100 rounded-full">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z" fill="currentColor"/>
                </svg>
              </span>
              Lab Report Feature
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Upload a PDF lab report for instant AI-powered analysis and summary.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="w-full flex flex-col items-center">
              <label className="font-semibold mb-2 text-green-800 flex items-center gap-2">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M19 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 18H8V4h8v16Zm-4-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="currentColor"/>
                </svg>
                Upload Lab Report (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => setFile(e.target.files[0])}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl text-gray-700 px-4 py-6 focus:outline-none focus:border-green-500 hover:border-green-400 transition-colors duration-200 text-center cursor-pointer"
              />
              {file && (
                <div className="flex items-center gap-2 text-green-700 mt-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">PDF Selected Successfully</span>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-green-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-3 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                )}
                {loading ? "Analyzing..." : "Analyze Lab Report"}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-lg mt-8 space-y-8">
            <h3 className="text-green-700 text-center text-2xl font-semibold mb-6 lg:text-3xl">
              Lab Report Analysis Result
            </h3>
            <div
              className="bg-gray-50 rounded-xl p-6 text-gray-800 text-lg text-left"
              dangerouslySetInnerHTML={{ __html: formatResult(result) }}
            ></div>
          </div>
        )}
      </section>
    </div>
  );
}

export default LabReport;
