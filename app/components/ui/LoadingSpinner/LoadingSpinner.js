"use client";

export default function LoadingSpinner({ 
  size = "md", 
  color = "blue",
  className = "",
  text = ""
}) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colors = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    green: "border-green-600",
    red: "border-red-600",
    yellow: "border-yellow-600"
  };

  const spinnerClasses = `
    ${sizes[size]} 
    border-2 border-gray-200 
    ${colors[color]} 
    border-t-transparent 
    rounded-full 
    animate-spin
    ${className}
  `;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={spinnerClasses}></div>
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}
