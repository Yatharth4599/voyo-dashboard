// StateTrendsChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const StateTrendsChart = ({ data }) => {
  const topStates = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        width: "100%",
        height: 400,
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#0f172a",
          marginBottom: "12px",
        }}
      >
        📈 Top 10 States by Call Minutes
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={topStates} margin={{ left: 80 }}>
          <XAxis type="number" />
          <YAxis
            dataKey="state"
            type="category"
            tick={{ fill: "#475569", fontSize: 14 }}
          />
          <Tooltip cursor={{ fill: "#f1f5f9" }} />
          <Bar dataKey="value">
            {topStates.map((entry, index) => (
              <Cell key={index} fill="#3b82f6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StateTrendsChart;
