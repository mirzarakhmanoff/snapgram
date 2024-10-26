import React from "react";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
}) => {
  return (
    <div
      className={`bg-gray-700 animate-pulse `}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default SkeletonLoader;
