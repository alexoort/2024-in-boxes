"use client";

import { useEffect, useState } from "react";
import { SummaryData, fetchSummaryData } from "../data/summary-info";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DeathsGraph() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const summaryData = await fetchSummaryData();
        setData(summaryData);
      } catch {
        setError("Failed to fetch data");
      }
    };
    getData();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Loading...</div>;

  const chartData = [
    {
      category: "Deaths",
      Gaza: data.gaza.killed.total,
      "West Bank": data.west_bank.killed.total,
    },
    {
      category: "Injuries",
      Gaza: data.gaza.injured.total,
      "West Bank": data.west_bank.injured.total,
    },
  ];

  return (
    <div className="w-full h-[400px] my-8 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        A look at the shocking numbers...
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Gaza" fill="#ef4444" />
          <Bar dataKey="West Bank" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
