"use client";
import { useEffect, useState, ReactNode } from "react";
import { useScrolledBoxes } from "../HandleScroll";

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
  const scrolledBoxes = useScrolledBoxes();

  useEffect(() => {
    setIsVisible(scrolledBoxes >= startBox && scrolledBoxes < endBox);
  }, [scrolledBoxes, startBox, endBox]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 z-10 p-6 bg-sky-100 mx-auto rounded-lg shadow-md"
      style={{
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "90vh",
        overflowY: "auto",
        width: "70%",
        maxWidth: "1200px",
      }}
    >
      <div className="text-lg">{content}</div>
      {source && (
        <div className="text-right mt-2 text-sky-800">
          <span className="text-sm">[Source: {source}]</span>
        </div>
      )}
    </div>
  );
}
