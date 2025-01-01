import BoxGrid from "./box";
import InfoText from "./info/InfoText";
import IntroContent from "./info/Intro";
import DeathsGraph from "./info/deaths-graph";
import { fetchSummaryData } from "./data/summary-info";
import { getNames } from "./data/names";
import SingleGrave from "./components/singleGrave";
import FatalityRatios from "./components/fatilityRatios";

export default async function Home() {
  const storyStart = 2300;
  const storyEnd = 2900;

  const [summaryData, names] = await Promise.all([
    fetchSummaryData(),
    getNames(),
  ]);

  // Calculate the split point for the grids
  const totalGraves = summaryData.gaza.killed.total;
  const firstGridSize = storyStart;
  const secondGridSize = totalGraves - firstGridSize;

  // Split the names array accordingly
  const firstGridNames = names.slice(0, firstGridSize);
  const secondGridNames = names.slice(firstGridSize);

  // Calculate row positions based on actual scroll calculations
  const boxHeight = 90; // matches HandleScroll.tsx
  const gap = 80; // matches HandleScroll.tsx
  const boxesPerRow = 8;
  const heightPerRow = boxHeight + gap;

  const firstGridRow = 10;
  // Calculate second grid position based on story height and SingleGrave margins
  const singleGraveMargins = 5000; // 1000px + 4000px from SingleGrave margins
  const secondGridRow =
    Math.ceil(storyEnd / boxesPerRow) +
    Math.ceil(singleGraveMargins / heightPerRow);

  return (
    <main className="min-h-screen">
      <InfoText content={<IntroContent />} startBox={100} endBox={500} />

      <InfoText
        content={
          <div className="space-y-2">
            <h1 className="font-bold text-center">
              Each grave represents a Palestinian killed in Gaza since October
              7th.
            </h1>
            <h1 className="font-bold text-center">
              There are {totalGraves} graves.
            </h1>
          </div>
        }
        startBox={700}
        endBox={1000}
      />

      <InfoText
        content={<DeathsGraph />}
        startBox={1100}
        endBox={1400}
        source="Tech For Palestine"
      />

      <InfoText
        content={
          <div className="space-y-2">
            <h1 className="font-bold text-center">
              Each grave is a name and a life lost. Scroll over each grave to
              see their story.
            </h1>
          </div>
        }
        startBox={1600}
        endBox={1800}
      />

      {/* First grid - leads up to the featured grave */}
      <BoxGrid
        total={firstGridSize}
        names={firstGridNames}
        namesStart={1800}
        namesEnd={storyStart}
        startRow={firstGridRow}
      />

      {/* Featured transition to a single grace, and Hind Rajab story */}
      <SingleGrave startBox={storyStart} endBox={storyEnd} />

      {/* Second grid - continues after the story */}
      <BoxGrid
        total={secondGridSize}
        names={secondGridNames}
        startRow={secondGridRow}
      />

      <FatalityRatios startBox={3000} endBox={3500} />
    </main>
  );
}
