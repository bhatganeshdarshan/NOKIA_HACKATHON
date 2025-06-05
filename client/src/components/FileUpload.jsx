import { useState, useRef } from 'react';

export default function FileUpload({
  onFileSelect,
  accept,
  multiple = false,
  maxSize = 5, // in MB
  label = 'Upload File',
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length === 0) return;

    if (!multiple && files.length > 1) {
      setError('Please select only one file');
      return;
    }

    const validFiles = Array.from(files).filter((file) => {
      if (accept && !accept.split(',').some((type) => file.type.match(type.trim()))) {
        setError(`Invalid file type. Allowed types: ${accept}`);
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size should be less than ${maxSize}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4 flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>{label}</span>
              <button
                type="button"
                className="ml-1"
                onClick={onButtonClick}
              >
                or drag and drop
              </button>
            </label>
          </div>
          <p className="text-xs text-gray-500">
            {accept ? `Accepted file types: ${accept}` : 'All file types'} (max {maxSize}MB)
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
} 