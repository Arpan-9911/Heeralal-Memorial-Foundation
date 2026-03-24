import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden bg-neutral-800 rounded ${className}`}
    >
      <div className="absolute inset-0 animate-pulse bg-linear-to-r 
        from-gray-300 to-gray-200" />
    </div>
  );
};

const Loader = () => {
  return (
    <div className="space-y-4">
      
      {/* Title */}
      <Skeleton className="h-6 w-1/3" />

      {/* Subtitle */}
      <Skeleton className="h-4 w-1/2" />

      {/* Card */}
      <div className="space-y-3 mt-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
      </div>

    </div>
  );
};

export default Loader;