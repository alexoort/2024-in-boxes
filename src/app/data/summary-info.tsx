// Fetch summary data from Tech For Palestine API
export interface SummaryData {
  gaza: {
    killed: {
      total: number;
      children: number;
      women: number;
      civil_defence: number;
      press: number;
      medical: number;
    };
    injured: {
      total: number;
    };
    last_update: string;
  };
  west_bank: {
    killed: {
      total: number;
      children: number;
    };
    injured: {
      total: number;
      children: number;
    };
  };
}

export async function fetchSummaryData(): Promise<SummaryData> {
  const response = await fetch(
    "https://data.techforpalestine.org/api/v3/summary.min.json",
    { next: { revalidate: 3600 } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch summary data");
  }
  return response.json();
}
