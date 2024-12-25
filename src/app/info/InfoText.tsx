"use client";
import { useEffect, useState, ReactNode } from "react";

interface InfoTextProps {
  content: ReactNode;
  source?: string;
  startBox: number;
  endBox: number;
}

export default function InfoText({
  content,
  source = "3",
  startBox = 200,
  endBox = 300,
}: InfoTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const boxHeight = 120; // Height of each box
      const boxesScrolled = Math.floor(window.scrollY / boxHeight);

      setIsVisible(boxesScrolled >= startBox && boxesScrolled < endBox);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startBox, endBox]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-6 bg-sky-100 mx-auto max-w-4xl rounded-lg shadow-md">
      <div className="text-lg">{content}</div>
      {source && (
        <div className="text-right mt-2 text-sky-800">
          <span className="text-sm">[Source: {source}]</span>
        </div>
      )}
    </div>
  );
}
