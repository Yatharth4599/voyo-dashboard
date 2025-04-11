import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";

const INDIA_GEO_JSON = "/india.geojson";

const heatMapData = [
  { state: "Maharashtra", value: 300, language: "Marathi", avgCallTime: 5 },
  { state: "Delhi", value: 240, language: "Hindi", avgCallTime: 6 },
  { state: "Gujarat", value: 150, language: "Gujarati", avgCallTime: 4 },
  { state: "Karnataka", value: 80, language: "Kannada", avgCallTime: 3 },
  { state: "Tamil Nadu", value: 60, language: "Tamil", avgCallTime: 4 },
  { state: "Uttar Pradesh", value: 610, language: "Hindi", avgCallTime: 5 },
  { state: "Bihar", value: 250, language: "Hindi", avgCallTime: 4 },
];

const colorScale = scaleLinear()
  .domain([0, 150, 300])
  .range(["#ffffff", "#6ec6ff", "#ff0000"]);

const navItems = ["Dashboard", "Clients", "Data", "Users", "Settings"];

const trendingLanguages = [
  { name: "Hindi", percent: 34 },
  { name: "English", percent: 26 },
  { name: "Marathi", percent: 14 },
  { name: "Bengali", percent: 10 },
  { name: "Telugu", percent: 6 },
];

const dummyClients = [
  { id: 1, name: "Acme Corp", minutes: 1320 },
  { id: 2, name: "Zenith Inc", minutes: 980 },
  { id: 3, name: "Globex Ltd", minutes: 1700 },
];

const sentimentData = [
  { name: "Improved", value: 55 },
  { name: "Neutral", value: 30 },
  { name: "Worsened", value: 15 }
];

const keywordData = [
  { name: "Interested", value: 180 },
  { name: "Price Asked", value: 160 },
  { name: "Callback", value: 100 },
  { name: "Discount", value: 75 }
];

const languageData = [
  { name: "Hinglish", value: 50 },
  { name: "Hindi", value: 35 },
  { name: "English", value: 15 }
];

const callOutcomeData = [
  { name: "Success", value: 320 },
  { name: "No Answer", value: 120 },
  { name: "Drop-off", value: 60 },
  { name: "Escalated", value: 40 }
];

const crmActionsData = [
  { name: "Lead Created", value: 210 },
  { name: "Demo Booked", value: 130 },
  { name: "Follow-up Task", value: 90 }
];

const agentScoreData = [
  { name: "Agent A", value: 85 },
  { name: "Agent B", value: 74 },
  { name: "Agent C", value: 79 }
];

export default function App() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedClient, setSelectedClient] = useState(dummyClients[0]);

  const getColor = (geo) => {
    const stateName = geo.properties.name || geo.properties.NAME_1;
    const match = heatMapData.find((d) => d.state === stateName);
    return !match || match.value === 0 ? "#ffffff" : colorScale(match.value);
  };

  const getTooltip = (geo) => {
    const stateName = geo.properties.name || geo.properties.NAME_1;
    const match = heatMapData.find((d) => d.state === stateName);
    return match
      ? `${match.state}\n🕒 ${match.value} mins\n🗣️ ${match.language}\n⏱️ Avg: ${match.avgCallTime} min`
      : `${stateName}\nNo data`;
  };

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
      {/* Sidebar */}
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
              {item === "Clients" && "👥 Clients"}
              {item === "Data" && "📁 Data"}
              {item === "Users" && "🙋 Users"}
              {item === "Settings" && "⚙️ Settings"}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f1f5f9", overflowY: "scroll", padding: "24px 40px" }}>
        {activeView === "Dashboard" ? (
          <>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#0f172a" }}>Realtime India Call Heatmap</h1>
            {/* Map and Sidebar */}
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ flex: 3, background: "#fff", borderRadius: "16px", padding: "16px" }}>
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1100, center: [82.8, 22] }} style={{ width: "100%", height: "600px" }}>
                  <Geographies geography={INDIA_GEO_JSON}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getColor(geo)}
                          stroke="#cbd5e1"
                          onMouseEnter={(e) => {
                            setTooltipContent(getTooltip(geo));
                            setTooltipPosition({ x: e.clientX, y: e.clientY });
                          }}
                          onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => setTooltipContent("")}
                          style={{ default: { outline: "none" }, hover: { fill: "#f97316", outline: "none" }, pressed: { outline: "none" } }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>🔥 Trending Languages</h3>
                {trendingLanguages.map((lang, idx) => (
                  <div key={idx} style={{ marginBottom: "10px", color: "#334155" }}>
                    {idx + 1}. {lang.name} - {lang.percent}%
                  </div>
                ))}
              </div>
            </div>

            {/* Tooltip */}
            {tooltipContent && (
              <div style={{
                position: "fixed", top: tooltipPosition.y + 15, left: tooltipPosition.x + 15,
                background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px",
                padding: "10px 14px", fontSize: "14px", whiteSpace: "pre-line", color: "#111827",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 9999, pointerEvents: "none"
              }}>
                {tooltipContent}
              </div>
            )}

            {/* Bar Chart */}
            <div style={{ marginTop: "60px", background: "#fff", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px" }}>📈 State-wise Talk Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={heatMapData}>
                  <XAxis dataKey="state" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="value">
                    {heatMapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorScale(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : activeView === "Clients" ? (
          <>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>👥 Clients</h1>
            <div style={{ display: "flex", gap: "32px" }}>
              {/* Left Client List */}
              <div style={{ flex: 1 }}>
                {dummyClients.map(client => (
                  <div key={client.id}
                    onClick={() => setSelectedClient(client)}
                    style={{
                      background: selectedClient.id === client.id ? "#cbd5e1" : "#fff",
                      padding: "16px", borderRadius: "10px", marginBottom: "12px", cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                    }}>
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>{client.name}</div>
                    <div style={{ color: "#475569" }}>Total Minutes: {client.minutes}</div>
                  </div>
                ))}
              </div>

              {/* Right Analytics View */}
              <div style={{ flex: 2, display: "grid", gap: "24px", gridTemplateColumns: "1fr 1fr" }}>
                {/* Pie Chart */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>Customer Sentiment Change</h3>
                  <PieChart width={300} height={250}>
                    <Pie data={sentimentData} dataKey="value" nameKey="name" outerRadius={80} label />
                    <Legend />
                  </PieChart>
                </div>

                {/* Keywords */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>Interest Keywords Detected</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart layout="vertical" data={keywordData}>
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Bar dataKey="value" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Call Outcomes */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>Call Outcomes</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={callOutcomeData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Language Usage */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>Language Usage</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={languageData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="value" fill="#d946ef" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Agent Score */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>Voice Agent Conversion Score</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={agentScoreData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CRM Actions */}
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
                  <h3>CRM Actions Triggered</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={crmActionsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : ( 
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "24px" }}>{activeView} section coming soon...</h1>
        )}
      </main>
    </div>
  );
}
