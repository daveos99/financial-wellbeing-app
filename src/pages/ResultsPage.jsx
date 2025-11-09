// src/pages/ResultsPage.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SurveyButton from "../components/Button";

// Helper: Convert overall score to rating label
function getRating(overallPercent) {
  if (overallPercent >= 90) return "💎 Money Master";
  if (overallPercent >= 80) return "🌟 Great at Money";
  if (overallPercent >= 70) return "👍 Good with Money";
  if (overallPercent >= 60) return "🙂 OK with Money";
  if (overallPercent >= 50) return "😕 Poor with Money";
  if (overallPercent >= 40) return "⚠️ Need Help with Money";
  return "🚨 Failing with Money";
}

export default function ResultsPage({ results, onRestart }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const themes = results && Array.isArray(results.themes) ? results.themes : [];
  const overall = results?.overallPercent ?? 0;
  const rating = getRating(overall);

  if (!themes || themes.length === 0) {
    return (
      <div className="max-w-3xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          No results to display
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          It looks like there are no completed responses yet.
        </p>
        <SurveyButton onClick={onRestart} className="mt-8">
          Restart Survey
        </SurveyButton>
      </div>
    );
  }

  // 🎨 Color palette for bar chart
  const colors = [
    "#6366F1", "#10B981", "#F59E0B", "#EF4444",
    "#3B82F6", "#8B5CF6", "#14B8A6", "#F97316",
    "#EC4899", "#84CC16", "#06B6D4", "#A855F7",
  ];

  // 📊 Prepare chart data
  const chartData = themes.map((t, i) => ({
    theme: t.themeName,
    score: Math.round((t.total / t.max) * 100),
    fill: colors[i % colors.length],
  }));

  // ✉️ Send report via API
  const handleSendReport = async () => {
    if (!email) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Sending...");
    try {
      const res = await fetch("/api/sendReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          results,
          responses: results.responses ?? {},
        }),
      });
      if (res.ok) setStatus("✅ Report sent successfully!");
      else setStatus("❌ Failed to send report.");
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Something went wrong while sending the report.");
    }
  };

  return (
    <div className="max-w-4xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Your Mastering Money Results
      </h2>

      {/* 📊 Horizontal Bar Chart */}
      {chartData.length > 0 && (
        <div className="w-full mb-10">
          <div className="max-w-3xl mx-auto" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
              >
                <XAxis type="number" domain={[0, 105]} hide />
                <YAxis
                  type="category"
                  dataKey="theme"
                  tick={{ fontSize: 12, fill: "#333" }}
                  width={150}
                />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar
                  dataKey="score"
                  radius={[8, 8, 8, 8]}
                  label={{ position: "right", formatter: (v) => `${v}%` }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 💯 Overall Score */}
      <div className="mb-8">
        <p className="text-4xl font-extrabold text-indigo-700">
          Overall Score: {overall}%
        </p>
        <p className="text-2xl font-semibold mt-2 text-gray-800">{rating}</p>
      </div>

      {/* ✉️ Email Input & Send Button */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email to receive a detailed report"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm text-center focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleSendReport}
          className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
        >
          Send Report
        </button>
        {status && (
          <p className="text-sm mt-2 text-gray-600 transition-all duration-300">
            {status}
          </p>
        )}
      </div>

      {/* 🔁 Restart Survey */}
      <SurveyButton onClick={onRestart} className="mt-10">
        Restart Survey
      </SurveyButton>
    </div>
  );
}
