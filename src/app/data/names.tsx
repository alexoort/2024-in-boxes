// Fetch and process casualty data from the database
// Returns an array of names and details of those killed in Gaza

import { getCasualties } from "../lib/db";

export interface Casualty {
  name: string;
  en_name: string;
  age?: number | null;
  dob?: string | null;
}

export async function getNames(): Promise<Casualty[]> {
  try {
    const casualties = await getCasualties();
    if (!casualties || casualties.length === 0) {
      console.log("No casualties data found");
      return [];
    }

    return casualties.map((casualty) => ({
      name: casualty.name || "Unknown",
      en_name: casualty.en_name || "",
      age: casualty.age || null,
      dob: casualty.dob || null,
    }));
  } catch (error) {
    console.error("Error fetching names:", error);
    return []; // Return empty array instead of throwing
  }
}
