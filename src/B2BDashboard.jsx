import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const pieColors = ["#3b82f6", "#f97316", "#10b981", "#d946ef"];

const dummyClients = [
  { id: 1, name: "MindEase Inc.", minutes: 2400 }
];

const emotionalShiftData = [
  { name: "Negative", value: 22 },
  { name: "Neutral", value: 34 },
  { name: "Positive", value: 39 }
];

const topIssuesData = [
  { name: "Anxiety", value: 30 },
  { name: "Relationship", value: 24 },
  { name: "Career", value: 16 },
  { name: "Loneliness", value: 12 },
  { name: "Self-Worth", value: 9 }
];

const emotionByLanguage = [
  { name: "Hindi", Anger: 40, Sadness: 30 },
  { name: "Hinglish", Anger: 25, Sadness: 20 },
  { name: "Tamil", Anger: 15, Sadness: 25 },
  { name: "Bhojpuri", Anger: 20, Sadness: 25 }
];

const crisisDetection = [
  { name: "Week 1", value: 3.2 },
  { name: "Week 2", value: 2.7 },
  { name: "Week 3", value: 2.4 },
  { name: "Week 4", value: 2.1 }
];

const anxiousLooping = [
  { name: "Week 1", value: 15 },
  { name: "Week 2", value: 8 },
  { name: "Week 3", value: 27 },
  { name: "Week 4", value: 41 }
];

const responseQuality = [
  { name: "Comforting", value: 80 },
  { name: "Uplifting", value: 78 },
  { name: "Reassuring", value: 85 }
];

const navItems = ["Dashboard", "Knowledge Base", "Agents", "Call History", "Settings"];

export default function B2BDashboard() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [selectedClient, setSelectedClient] = useState(dummyClients[0]);

  const navBtnStyle = (item) => ({
    background: activeView === item ? "#334155" : "transparent",
    color: "white",
    border: "none",
    fontSize: "16px",
    textAlign: "left",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      <aside style={{
        width: "240px",
        background: "#1e293b",
        color: "white",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        fontWeight: "500"
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>VOYO 🛰️</div>
        <nav style={{ fontSize: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {navItems.map(item => (
            <button
              key={item}
              style={navBtnStyle(item)}
              onClick={() => setActiveView(item)}
              onMouseEnter={(e) => e.target.style.background = "#334155"}
              onMouseLeave={(e) => {
                if (activeView !== item) e.target.style.background = "transparent";
              }}
            >
              {item === "Dashboard" && "📊 Dashboard"}
              {item === "Knowledge Base" && "📚 Knowledge Base"}
              {item === "Agents" && "🤖 Agents"}
              {item === "Call History" && "📞 Call History"}
              {item === "Settings" && "⚙️ Settings"}
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, background: "#f1f5f9", overflowY: "scroll", padding: "24px 40px" }}>
        {activeView === "Dashboard" && (
          <>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>🧠 Mental Health Overview</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Emotional Shift Post-Session</h3>
                <BarChart width={300} height={250} data={emotionalShiftData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#60a5fa" />
                </BarChart>
              </div>

              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Top Issues Detected in Conversations</h3>
                <BarChart layout="vertical" width={300} height={250} data={topIssuesData}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Bar dataKey="value" fill="#f59e0b" />
                </BarChart>
              </div>

              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Emotion Distribution by Language</h3>
                <LineChart width={300} height={250} data={emotionByLanguage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="Anger" stroke="#ef4444" />
                  <Line type="monotone" dataKey="Sadness" stroke="#3b82f6" />
                </LineChart>
              </div>

              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Crisis Detection Rate Over Time</h3>
                <LineChart width={300} height={250} data={crisisDetection}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
              </div>

              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Reduction in Anxious Looping Behavior</h3>
                <BarChart width={300} height={250} data={anxiousLooping}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#15803d" />
                </BarChart>
              </div>

              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                <h3>Response Quality by Type (%)</h3>
                <BarChart width={300} height={250} data={responseQuality}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#0e7490" />
                </BarChart>
              </div>
            </div>
          </>
        )}

        {activeView !== "Dashboard" && (
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "24px" }}>{activeView} coming soon...</h1>
        )}
      </main>
    </div>
  );
}
