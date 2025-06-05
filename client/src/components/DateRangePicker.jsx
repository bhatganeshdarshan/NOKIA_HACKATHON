import { useState } from 'react';

export default function DateRangePicker({ startDate, endDate, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (e) => {
    onDateChange({ startDate: e.target.value, endDate });
  };

  const handleEndDateChange = (e) => {
    onDateChange({ startDate, endDate: e.target.value });
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="btn-secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">Date Range</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-96 rounded-md bg-white shadow-lg">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="mt-1 input-field"
                />
              </div>
              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="mt-1 input-field"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 