// TopStates.jsx
import React from "react";

const TopStates = ({ data }) => {
  const topStates = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: "fit-content",
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
        🏆 Top States
      </h3>
      {topStates.map((state, index) => (
        <div key={state.state} style={{ marginBottom: "8px", color: "#334155" }}>
          {index + 1}. {state.state} - {state.value} mins
        </div>
      ))}
    </div>
  );
};

export default TopStates;
