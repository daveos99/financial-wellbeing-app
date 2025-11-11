// src/pages/ResultsPage.jsx
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
import SurveyButton from "../components/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportDocument from "../components/ReportDocument";

// Helper: Convert overall score to rating label
function getRatingForReport(overallPercent) {
  if (overallPercent >= 90) return "★ Money Master";
  if (overallPercent >= 80) return "✓ Great at Money";
  if (overallPercent >= 70) return "✓ Good with Money";
  if (overallPercent >= 60) return "≈ OK with Money";
  if (overallPercent >= 50) return "– Poor with Money";
  if (overallPercent >= 40) return "⚠ Needs Help with Money";
  return "✗ Failing with Money";
}


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
  const themes = results && Array.isArray(results.themes) ? results.themes : [];
  const overall = results?.overallPercent ?? 0;
  const rating = getRating(overall);
  const ratingForReport = getRatingForReport(overall);

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

      {/* 📄 Download PDF Report */}
      <div className="mt-8">
        <PDFDownloadLink
          document={<ReportDocument results={{ ...results, ratingForReport }} />}
          fileName="MasteringMoneyReport.pdf"
        >
          {({ loading }) => (
            <button
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
            >
              {loading ? "Generating Report..." : "Download PDF Report"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* 🔁 Restart Survey */}
      <SurveyButton onClick={onRestart} className="mt-10">
        Restart Survey
      </SurveyButton>
    </div>
  );
}

