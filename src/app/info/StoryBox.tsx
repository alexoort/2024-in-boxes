"use client";

import { useEffect, useState } from "react";
import { useScrolledBoxes } from "../HandleScroll";
import { Casualty } from "../data/names";

interface StoryBoxProps {
  startBox?: number;
  casualty?: Casualty;
}

export default function StoryBox({ startBox = 1500 }: StoryBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrolledBoxes = useScrolledBoxes();

  // Example casualty data - in production this would come from props
  const exampleCasualty: Casualty = {
    name: "محمد أحمد",
    en_name: "Mohammed Ahmed",
    age: 24,
  };

  useEffect(() => {
    const shouldBeVisible =
      scrolledBoxes >= startBox && scrolledBoxes < startBox + 500;
    setIsVisible(shouldBeVisible);

    // Add a delay for the expansion effect to let the boxes animate first
    if (shouldBeVisible) {
      setTimeout(() => setIsExpanded(true), 500);
    } else {
      setIsExpanded(false);
    }
  }, [scrolledBoxes, startBox]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-black transition-all duration-1000 ease-in-out ${
        isExpanded ? "h-screen" : "h-0"
      }`}
      style={{ zIndex: 40 }}
    >
      <div
        className={`flex flex-col items-center justify-center h-full text-white transition-all duration-1000 ${
          isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div
          className="text-4xl font-bold mb-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          {exampleCasualty.name}
        </div>
        <div
          className="text-2xl text-gray-300 mb-3"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          {exampleCasualty.en_name}
        </div>
        {exampleCasualty.age && (
          <div
            className="text-xl text-gray-400"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            Age: {exampleCasualty.age}
          </div>
        )}
      </div>
    </div>
  );
}
