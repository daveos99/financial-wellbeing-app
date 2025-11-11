// src/components/ReportDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import DejaVuSans from "../assets/fonts/DejaVuSans.ttf";

// ✅ Register Unicode-safe font
Font.register({
  family: "DejaVuSans",
  src: DejaVuSans,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "DejaVuSans",
    padding: 32,
    fontSize: 11,
    color: "#111827",
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1E3A8A",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 6,
    color: "#1E3A8A",
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.5,
  },
  themeBlock: {
    marginTop: 10,
    marginBottom: 14,
    padding: 8,
    border: "1px solid #E5E7EB",
    borderRadius: 4,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  barLabel: { width: "30%", fontSize: 10 },
  barTrack: {
    flexGrow: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#4F46E5",
    borderRadius: 4,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #D1D5DB",
    paddingBottom: 4,
    marginBottom: 4,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #E5E7EB",
    paddingVertical: 3,
  },
  questionText: { width: "70%" },
  answerText: { width: "30%", textAlign: "right" },
  reasonRow: {
    borderBottom: "1px solid #E5E7EB",
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pageBreak: {
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #E5E7EB",
    pageBreakBefore: "always",
  },
});

export default function ReportDocument({ results }) {
  const { themes = [], overallPercent = 0, ratingForReport = "", reasons } =
    results || {};

  // Filter unanswered items
  const themesWithAnswers = themes
    .map((theme) => ({
      theme,
      answeredQuestions: (theme.questions || []).filter(
        (q) => q?.selectedLabel && q.selectedLabel !== "Not answered"
      ),
    }))
    .filter(({ answeredQuestions }) => answeredQuestions.length > 0);

  const answeredReasons = (reasons?.responses || []).filter(
    (r) => r?.answer && r.answer !== "Not answered"
  );
  const hasTopThree = Array.isArray(reasons?.topThree) && reasons.topThree.length > 0;

  return (
    <Document>
      {/* ===== PAGE 1 ===== */}
      <Page size="A4" style={styles.page}>
        {/* ===== TITLE ===== */}
        <Text style={styles.heading}>Mastering Money Report</Text>

        {/* ===== OVERALL SUMMARY ===== */}
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Overall Score:</Text>{" "}
          {overallPercent}%
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Rating:</Text> {ratingForReport}
        </Text>

        {/* ===== THEME SUMMARY BAR CHART ===== */}
        <Text style={styles.sectionTitle}>Theme Summary</Text>
        {themes.map((theme) => (
          <View key={theme.themeId} style={styles.barRow}>
            <Text style={styles.barLabel}>{theme.themeName}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${Math.min(theme.percent, 100)}%` },
                ]}
              />
            </View>
            <Text style={{ width: 30, textAlign: "right", fontSize: 10 }}>
              {theme.percent}%
            </Text>
          </View>
        ))}

        {/* ===== DETAILED BREAKDOWN ===== */}
        {!!themesWithAnswers.length && (
          <View style={styles.pageBreak}>
            <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
            {themesWithAnswers.map(({ theme, answeredQuestions }, idx) => (
              <View key={theme.themeId} style={styles.themeBlock}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {theme.themeName} — {theme.percent}%
                </Text>

                {/* Column Headers */}
                <View style={styles.questionHeader}>
                  <Text style={{ width: "70%", fontWeight: "bold" }}>
                    Question
                  </Text>
                  <Text
                    style={{
                      width: "30%",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    Answer (Score)
                  </Text>
                </View>

                {/* Questions & Answers (answered only) */}
                {answeredQuestions.map((q) => (
                  <View key={q.id} style={styles.questionRow}>
                    <Text style={styles.questionText}>{q.text}</Text>
                    <Text style={styles.answerText}>
                      {q.selectedLabel} ({q.score})
                    </Text>
                  </View>
                ))}

                {/* Force page break every 3-4 themes for readability */}
                {idx > 0 && idx % 3 === 0 && (
                  <View style={{ pageBreakAfter: "always" }} />
                )}
              </View>
            ))}
          </View>
        )}

        {/* ===== REASONS SECTION ===== */}
        {(answeredReasons.length > 0 || hasTopThree) && (
          <View style={styles.pageBreak}>
            <Text style={styles.sectionTitle}>What’s Holding You Back?</Text>

            {/* All reasons with responses */}
            {answeredReasons.map((r) => (
                <View key={r.id} style={styles.reasonRow}>
                  <Text style={{ width: "70%" }}>{r.text}</Text>
                  <Text style={{ width: "30%", textAlign: "right" }}>
                    {r.answer}
                  </Text>
                </View>
              ))}

            {/* Top 3 ranked reasons */}
            {hasTopThree && (
              <>
                <Text style={styles.sectionTitle}>Your Top 3 Barriers</Text>
                {reasons.topThree.map((r, i) => (
                  <Text key={r.id} style={styles.text}>
                    {i + 1}. {r.text}
                  </Text>
                ))}
              </>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
