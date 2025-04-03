import React from "react";

const LoadingSpinner = ({ size = "10", color = "gray-900" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-4 border-${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
