export default function ProgressBar({
  progress,
  size = 'md',
  showLabel = true,
  label,
  color = 'primary',
}) {
  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {label || `${Math.round(progress)}%`}
          </span>
          {!label && <span className="text-sm font-medium text-gray-700">{`${Math.round(progress)}%`}</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${colors[color]} rounded-full transition-all duration-300 ease-in-out ${sizes[size]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 