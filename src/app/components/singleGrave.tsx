"use client";

import { useEffect, useState } from "react";
import { useScrolledBoxes } from "../HandleScroll";
import { Casualty } from "../data/names";
import Image from "next/image";

interface SingleGraveProps {
  startBox: number;
  endBox: number;
}

export default function SingleGrave({ startBox, endBox }: SingleGraveProps) {
  const scrolledBoxes = useScrolledBoxes();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scrolledBoxes >= startBox);
  }, [scrolledBoxes, startBox]);

  if (!isVisible) return null;

  // Calculate opacity for black overlay based on scroll position
  const blackOverlayStart = startBox + 100;
  const fadeInProgress = Math.max(
    0,
    Math.min(1, (scrolledBoxes - blackOverlayStart) / 70)
  );

  // Calculate when to show the photo and text
  const textStart = blackOverlayStart + 80;
  const showPhoto = scrolledBoxes >= textStart;

  // Only start fading out when we're near the end of the photo section
  const fadeOutStart = endBox - 200; // Start fading out earlier
  const fadeOutProgress =
    scrolledBoxes >= fadeOutStart
      ? Math.max(0, Math.min(1, (endBox - scrolledBoxes) / 20))
      : 1;

  const fadeProgress = fadeInProgress * fadeOutProgress;

  return (
    <>
      {/* Black overlay */}
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300"
        style={{
          opacity: fadeProgress,
          zIndex: 40,
        }}
      />

      {/* Container for sticky elements */}
      <div
        style={{ height: `${(endBox - startBox) * 22}px` }}
        className="relative"
      >
        {/* Grave */}
        <div
          className="sticky top-[50vh] -translate-y-1/2 flex justify-center mt-[1000px]"
          style={{ zIndex: 41 }}
        >
          <div
            className="w-[60px] aspect-[2/3]"
            style={{
              clipPath:
                "path('M0 20C0 8.954 8.954 0 20 0h20c11.046 0 20 8.954 20 20v70H0V20Z')",
              background: "black",
            }}
          />
        </div>

        {/* Photo and Story */}
        {showPhoto && (
          <div
            className="sticky top-[50vh] -translate-y-1/2 flex flex-col items-center mt-[4000px] max-w-3xl mx-auto px-4"
            style={{
              zIndex: 42,
              opacity: fadeOutProgress, // Apply fade out to the content
            }}
          >
            <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/hind-rajab.jpg"
                alt="Hind Rajab"
                fill
                priority
                sizes="200px"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>

            <div className="text-white space-y-6 leading-relaxed">
              <h1
                className="text-3xl font-bold mb-6 text-center"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                Hind Rajab, 5
              </h1>
              <p className="text-lg" data-aos="fade-up" data-aos-delay="200">
                On January 29th, Hind Rajab, aged 5, tried to flee from the Tel
                al-Hawa neighborhood of Gaza City with her family. During their
                journey, the Israeli military fired on their vehicle, killing
                everyone in the car except for Hind and her cousin Layan.
              </p>
              <p className="text-lg" data-aos="fade-up" data-aos-delay="400">
                After Layan was also killed, Hind remained alone in the car. She
                managed to speak with the Palestine Red Crescent Society (PRCS)
                by phone, telling them she was scared and asking to be rescued.
              </p>
              <p className="text-lg" data-aos="fade-up" data-aos-delay="600">
                After coordinating passage with the Israeli military, the
                Palestine Red Crescent Society dispatched an ambulance to rescue
                her. When the paramedics arrived, however, they were shot and
                killed.
              </p>
              <p className="text-lg" data-aos="fade-up" data-aos-delay="800">
                Two weeks later, Hind's body, along with her entire family's,
                was recovered.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
