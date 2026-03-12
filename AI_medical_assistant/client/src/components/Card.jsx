// components/Card.jsx
export default function Card({ heading, paraHeading, para }) {
  return (
    <div className="w-full h-full p-5 border border-gray-200 rounded-xl shadow-md bg-gray-50 flex flex-col justify-start">
      {heading && (
        <h3 className="text-xl font-bold text-green-700 mb-2 text-center">{heading}</h3>
      )}
      {paraHeading && (
        <h4 className="text-md font-semibold text-gray-700 mb-1">{paraHeading}</h4>
      )}
      <p className="text-sm text-gray-800 whitespace-pre-line">{para}</p>
    </div>
  );
}
