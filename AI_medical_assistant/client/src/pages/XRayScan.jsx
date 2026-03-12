import { useState } from "react";

function XRayScan() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload an image file first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/xray/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.response);
    } catch {
      setResult("❌ Error during image analysis.");
    }

    setLoading(false);
  };

  const formatResult = (text) => {
    return text
      .replace(/^###\s*(.*)$/gm, '<span class="text-green-700 font-bold text-lg">$1</span><br /><br />') // Green section titles
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/^•\s*/gm, '• ') // bullets
      .replace(/\n{2,}/g, '<br /><br />') // Paragraph breaks
      .replace(/\n/g, '<br />'); // Line breaks
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/7088486/pexels-photo-7088486.jpeg"
          alt="X-Ray Scan"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            X-Ray Scan Analyzer
          </h1>
          <p className="max-w-3xl text-white/90 text-base md:text-md font-normal drop-shadow">
            Upload your X-ray image and let our AI analyze it for a quick, preliminary report. <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Note:</span> This tool is for informational purposes and does not replace professional medical advice.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="flex flex-col justify-center items-center px-6 py-16 min-h-screen">
        <div className="w-full max-w-2xl flex flex-col bg-white border border-gray-100 rounded-3xl shadow-lg p-10 md:p-16 mb-10 space-y-10">
          <div className="text-center">
            <h2 className="text-md md:text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-3">
              <span className="bg-green-100 rounded-full">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z" fill="currentColor"/>
                </svg>
              </span>
              X-Ray Scan Feature
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Upload a PNG, JPG, or JPEG X-ray image for instant AI-powered analysis.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="w-full flex flex-col items-center">
              <label className="font-semibold mb-2 text-green-800 flex items-center gap-2">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM5 5h14v7.382l-2.447-2.447a2 2 0 0 0-2.828 0l-5.382 5.382-2.447-2.447V5Zm0 14v-4.618l3.553-3.553 2.447 2.447a2 2 0 0 0 2.828 0l5.382-5.382L19 14.618V19H5Z" fill="currentColor"/>
                </svg>
                Upload X-Ray Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={e => setFile(e.target.files[0])}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl text-gray-700 px-4 py-6 focus:outline-none focus:border-green-500 hover:border-green-400 transition-colors duration-200 text-center cursor-pointer"
              />
              {file && (
                <div className="flex items-center gap-2 text-green-700 mt-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Image Selected Successfully</span>
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
                {loading ? "Analyzing..." : "Analyze X-Ray"}
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        {result && (
          <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-lg mt-8 space-y-8">
            <h3 className="text-green-700 text-center text-2xl font-semibold mb-6 lg:text-3xl">
              X-Ray Analysis Result
            </h3>
            <div
              className="bg-gray-50 rounded-xl p-6 text-gray-800 text-lg text-left"
              dangerouslySetInnerHTML={{ __html: formatResult(result) }}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default XRayScan;
