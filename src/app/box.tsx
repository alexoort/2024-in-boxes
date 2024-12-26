"use client";

import { useEffect, useState } from "react";
import { Casualty } from "./data/names";
import { useScrolledBoxes } from "./HandleScroll";

interface BoxGridProps {
  total: number;
  names?: Casualty[];
  namesStart?: number;
}

export default function BoxGrid({
  total,
  names = [],
  namesStart = 200,
}: BoxGridProps) {
  const [showNames, setShowNames] = useState(false);
  const boxes = Array.from({ length: total }, (_, index) => index);
  const scrolledBoxes = useScrolledBoxes();

  useEffect(() => {
    // Show names after scrolling past 200 boxes
    setShowNames(scrolledBoxes > namesStart);
  }, [scrolledBoxes, namesStart]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-20">
        {boxes.map((box) => (
          <div
            key={box}
            className="relative w-full max-w-[60px] aspect-[2/3] bg-black group"
          >
            {showNames && names[box] && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-sm w-48 text-center z-10">
                <div className="font-bold">{names[box].name}</div>
                {names[box].en_name && (
                  <div className="text-gray-600">{names[box].en_name}</div>
                )}
                {names[box].age && (
                  <div className="text-gray-500">Age: {names[box].age}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
