import Dropzone from "./Dropzone";

function AnalysisContainer({
  reportDets,
  analysisName,
  accept,
  setFile,
  handleAnalyze,
  result,
  loading,
}) {
  return (
    <div className="analysis-container">
      <Dropzone
        className="cursor-pointer mt-10 border-2 border-dashed rounded-xl my-5 p-18 md:p-22 sm:p-20"
        reportDets={reportDets}
        accept={accept}
        setFile={setFile}
      />

      <div className="flex items-center justify-center">
        <button
          onClick={handleAnalyze}
          className="px-6 py-4 text-lg font-bold text-white bg-teal-600 rounded-md mb-6 border-2 border-gray-700 cursor-pointer"
        >
          {loading ? "Analyzing..." : "Click here to analyze"}
        </button>
      </div>

      <h3 className="text-teal-700 text-center text-2xl font-semibold mt-8 mb-6 lg:text-4xl">
        Analysis of your {analysisName}
      </h3>

      {/* ✅ Scrollable, wrapped result box */}
      <div className="ai-response-container border-2 rounded-xl p-5 my-6 max-h-[300px] overflow-y-auto bg-white shadow-sm">
        <p className="whitespace-pre-wrap break-words text-center text-gray-800 text-sm sm:text-base leading-relaxed">
          {result || "The Analysis of your report will generate here"}
        </p>
      </div>
    </div>
  );
}

export default AnalysisContainer;
