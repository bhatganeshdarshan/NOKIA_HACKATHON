export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
          error ? 'border-red-300' : 'border-gray-300'
        } focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
} 