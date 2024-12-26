export interface DailyDeathsData {
  report_date: string;
  report_source?: "mohtel" | "gmotel" | "unocha";
  report_period?: 24 | 48 | 0;
  massacres_cum?: number;
  killed: number;
  killed_cum: number;
  killed_children_cum?: number;
  killed_women_cum?: number;
  injured?: number;
  injured_cum: number;
  civdef_killed_cum?: number;
  med_killed_cum?: number;
  press_killed_cum?: number;
}

export async function fetchDailyDeaths(): Promise<DailyDeathsData[]> {
  const response = await fetch(
    "https://data.techforpalestine.org/api/v2/killed-in-gaza-daily.min.json",
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch daily deaths data");
  }

  const data: DailyDeathsData[] = await response.json();

  // Sort by date in ascending order
  return data.sort(
    (a, b) =>
      new Date(a.report_date).getTime() - new Date(b.report_date).getTime()
  );
}

// Helper function to get the latest complete data entry
export function getLatestCompleteEntry(
  data: DailyDeathsData[]
): DailyDeathsData | null {
  // Reverse array to start from the end
  for (let i = data.length - 1; i >= 0; i--) {
    const entry = data[i];
    // Check if entry has all the cumulative data we need
    if (
      entry.killed_cum &&
      entry.killed_children_cum &&
      entry.killed_women_cum
    ) {
      return entry;
    }
  }
  return null;
}
