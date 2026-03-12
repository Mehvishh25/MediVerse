import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Dropzone = ({ className, reportDets, accept, setFile }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setFiles((prev) => [...prev, ...updatedFiles]);

      // ✅ Send the first file up to parent
      if (setFile) setFile(acceptedFiles[0]);
    }
    console.log(rejectedFiles);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <form>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center md:text-xl sm:text-lg">Drop the files here ...</p>
        ) : (
          <p className="text-center md:text-xl sm:text-lg">
            Drag and Drop your {reportDets}
            <br />
            Or click here to browse your device
          </p>
        )}
      </div>

      <h3 className="mt-12 text-center">
        Accepted files: (if your chosen file doesn't appear here, that means your file format was incorrect)
      </h3>
      <ul className="p-10 lg:ml-15 gap-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {files.map((file) => (
          <li key={file.name}>
            <img
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-teal-600 rounded-full hover:bg-blue-900"
              onClick={() => removeFile(file.name)}
            >
              <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 m-0.5" />
            </button>
            <p className="mt-2 text-blue-900 text-[12px] font-medium">{file.name}</p>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Dropzone;
