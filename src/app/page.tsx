import BoxGrid from "./box";
import InfoText from "./info/InfoText";
import Title from "./title";
import IntroContent from "./info/Intro";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Title />
      {/* Using with a custom component */}
      <InfoText content={<IntroContent />} startBox={200} endBox={300} />

      {/* Using with simple string content */}
      <InfoText
        content="Another interesting statistic about incarceration in America..."
        startBox={300}
        endBox={400}
        source="4"
      />

      {/* Using with inline JSX */}
      <InfoText
        content={
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">2.3 million</span>
            <span>Americans are currently incarcerated</span>
          </div>
        }
        startBox={800}
        endBox={900}
        source="5"
      />

      <BoxGrid />
    </main>
  );
}
