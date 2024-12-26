import BoxGrid from "./box";
import InfoText from "./info/InfoText";
import Title from "./title";
import IntroContent from "./info/Intro";
import DeathsGraph from "./info/deaths-graph";
import { SummaryData, fetchSummaryData } from "./data/summary-info";
import { getNames } from "./data/names";

export default async function Home() {
  const [summaryData, names] = await Promise.all([
    fetchSummaryData(),
    getNames(),
  ]);

  return (
    <main className="min-h-screen">
      <InfoText content={<IntroContent />} startBox={100} endBox={200} />

      <InfoText
        content={<DeathsGraph />}
        startBox={300}
        endBox={400}
        source="Tech For Palestine"
      />

      <BoxGrid
        total={summaryData.gaza.killed.total}
        names={names}
        namesStart={500}
      />
    </main>
  );
}
