"use client";

import { useEffect, useState } from "react";
import { Casualty } from "./data/names";
import { useScrolledBoxes } from "./HandleScroll";

interface BoxGridProps {
  total: number;
  names?: Casualty[];
  namesStart?: number;
  namesEnd?: number;
  startRow?: number; // Which row this grid should start on
}

export default function BoxGrid({
  total,
  names = [],
  namesStart = 0,
  namesEnd = 0,
  startRow = 0,
}: BoxGridProps) {
  const [showNames, setShowNames] = useState(false);
  const [mappedBoxes, setMappedBoxes] = useState<(Casualty | null)[]>([]);
  const boxes = Array.from({ length: total }, (_, index) => index);
  const scrolledBoxes = useScrolledBoxes();

  useEffect(() => {
    // Show names between namesStart and namesEnd
    const shouldShow = scrolledBoxes > namesStart && scrolledBoxes < namesEnd;
    setShowNames(shouldShow);

    // Only create the mapping when we need to show names
    if (shouldShow && mappedBoxes.length === 0) {
      console.log("Creating name mapping...");
      const newMapping = Array(total).fill(null);
      names.forEach((casualty, index) => {
        if (index < total) {
          newMapping[index] = casualty;
        }
      });
      setMappedBoxes(newMapping);
    }
  }, [scrolledBoxes, namesStart, namesEnd, names, total, mappedBoxes.length]);

  // Calculate grid position
  const rowHeight = 170; // 90px (box height) + 80px (gap)
  const topOffset = startRow * rowHeight;

  return (
    <div style={{ marginTop: topOffset }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-20">
          {boxes.map((box) => (
            <div key={box} className="relative w-full max-w-[60px] group">
              {/* Tooltip */}
              {showNames && mappedBoxes[box] && (
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-sm w-48 text-center"
                  style={{ zIndex: 9999 }}
                >
                  <div className="font-bold">{mappedBoxes[box]!.name}</div>
                  {mappedBoxes[box]!.en_name && (
                    <div className="text-gray-600">
                      {mappedBoxes[box]!.en_name}
                    </div>
                  )}
                  {mappedBoxes[box]!.age && (
                    <div className="text-gray-500">
                      Age: {mappedBoxes[box]!.age}
                    </div>
                  )}
                </div>
              )}

              {/* Grave shape */}
              <div
                className="w-full aspect-[2/3] transition-colors duration-200"
                style={{
                  clipPath:
                    "path('M0 20C0 8.954 8.954 0 20 0h20c11.046 0 20 8.954 20 20v70H0V20Z')",
                  background: "black",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4B0000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "black";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
