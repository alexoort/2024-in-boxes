import { FC } from "react";

interface FatalityRatiosProps {
  startBox: number;
  endBox: number;
}

const FatalityRatios: FC<FatalityRatiosProps> = ({ startBox, endBox }) => {
  return (
    <div
      className="w-full flex flex-col items-center gap-12 py-8"
      style={{ height: `${(endBox - startBox) * 22}px` }}
    >
      {/* Women and Children ratio */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4">
          70% of casualties are women and children
        </h2>
        <div className="grid grid-cols-10 gap-1">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square ${
                i < 70 ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center mt-2 text-gray-600">
          Each square represents 1% of total casualties
        </p>
      </div>

      {/* Children ratio */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4">
          40% of casualties are children
        </h2>
        <div className="grid grid-cols-10 gap-1">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square ${
                i < 40 ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center mt-2 text-gray-600">
          Each square represents 1% of total casualties
        </p>
      </div>

      {/* Women ratio */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4">
          30% of casualties are women
        </h2>
        <div className="grid grid-cols-10 gap-1">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square ${
                i < 30 ? "bg-purple-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center mt-2 text-gray-600">
          Each square represents 1% of total casualties
        </p>
      </div>
    </div>
  );
};

export default FatalityRatios;
