"use client";

import { useEffect, useState } from "react";

export function useScrolledBoxes() {
  const [scrolledBoxes, setScrolledBoxes] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const boxHeight = 90; // aspect-[2/3] of 60px width = 90px height
      const gap = 80; // gap-20 = 80px
      const boxesPerRow =
        window.innerWidth >= 1024
          ? 8 // lg:grid-cols-8
          : window.innerWidth >= 768
          ? 6 // md:grid-cols-6
          : 4; // grid-cols-4

      const scrollPosition = window.scrollY;
      const totalHeightPerRow = boxHeight + gap;

      // Calculate how many complete rows have been scrolled past
      const rowsScrolled = Math.floor(scrollPosition / totalHeightPerRow);
      // Calculate boxes scrolled based on rows and boxes per row
      const boxesScrolled = Math.max(0, rowsScrolled * boxesPerRow);

      console.log("Scroll Calculation:", {
        scrollPosition,
        totalHeightPerRow,
        rowsScrolled,
        boxesPerRow,
        boxesScrolled,
      });

      setScrolledBoxes(boxesScrolled);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return scrolledBoxes;
}
