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
import { VERSION_LABEL } from "../config/version";
import { THEME_COLORS } from "../constants/colors";

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
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #E5E7EB",
    paddingTop: 8,
  },
  footerText: {
    fontSize: 9,
    color: "#6B7280",
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

  const answeredReasons = (reasons?.responses || []).filter((r) => {
    const ans = (r?.answer || "").trim();
    return ans === "Yes" || ans === "Somewhat";
  });
  const hasTopThree = Array.isArray(reasons?.topThree) && reasons.topThree.length > 0;

  return (
    <Document>
      {/* ===== PAGE 1 ===== */}
      <Page size="A4" style={styles.page}>
        {/* ===== TITLE ===== */}
        <Text style={styles.heading}>Mastering Money Report</Text>

        {/* ===== OVERALL SUMMARY ===== */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Overall Score: {overallPercent}%
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Rating: {ratingForReport}
        </Text>

        {/* ===== THEME SUMMARY BAR CHART ===== */}
        <Text style={styles.sectionTitle}>Theme Summary</Text>
        {themes.map((theme, index) => {
          const barColor = THEME_COLORS[index % THEME_COLORS.length];
          return (
            <View key={theme.themeId} style={styles.barRow}>
              <Text style={styles.barLabel}>{theme.themeName}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${Math.min(theme.percent, 100)}%`,
                      backgroundColor: barColor,
                    },
                  ]}
                />
              </View>
              <Text style={{ width: 30, textAlign: "right", fontSize: 10 }}>
                {theme.percent}%
              </Text>
            </View>
          );
        })}

        {/* ===== TOP 3 REASONS ===== */}
        {hasTopThree && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>Your Top Barriers</Text>
            {reasons.topThree.map((r, i) => (
              <Text key={r.id} style={styles.text}>
                {i + 1}. {r.text} {/*({`#${i + 1}`})*/}
              </Text>
            ))}
          </View>
        )}

        {/* ===== DETAILED BREAKDOWN ===== */}
        {!!themesWithAnswers.length && (
          <View style={styles.pageBreak} break>
            <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
            {themesWithAnswers.map(({ theme, answeredQuestions }, idx) => (
              <View key={theme.themeId} style={styles.themeBlock} wrap={false}>
                {/* Column Headers */}
                <View style={styles.questionHeader}>
                  <Text style={{ width: "70%", fontWeight: "bold" }}>
                    {`${theme.themeName} = ${theme.percent}%`}
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
                {answeredQuestions.map((q) => {
                  const highlight =
                    typeof q.score === "number" && Number(q.score) === 0;
                  return (
                    <View
                      key={q.id}
                      style={[
                        styles.questionRow,
                        highlight && { backgroundColor: "#FEE2E2" },
                      ]}
                    >
                      <Text style={styles.questionText}>{q.text}</Text>
                      <Text style={styles.answerText}>
                        {q.selectedLabel} ({q.score})
                      </Text>
                    </View>
                  );
                })}

                {/* Force page break every 3-4 themes for readability */}
                {idx > 0 && idx % 3 === 0 && (
                  <View style={{ pageBreakAfter: "always" }} />
                )}
              </View>
            ))}
          </View>
        )}

        {/* ===== REASONS SECTION ===== */}
        {answeredReasons.length > 0 && (
          <View style={styles.pageBreak} break>
            <Text style={styles.sectionTitle}>
              What's holding you back from being better at money?
            </Text>

            {/* All reasons with responses */}
            {answeredReasons.map((r) => {
              const rankIndex = reasons?.topThree?.findIndex(
                (top) => top.id === r.id
              );
              const rankSuffix = rankIndex > -1 ? ` (#${rankIndex + 1})` : "";
              return (
                <View key={r.id} style={styles.reasonRow}>
                  <Text style={{ width: "70%" }}>
                    {r.text}
                    {rankSuffix}
                  </Text>
                  <Text style={{ width: "30%", textAlign: "right" }}>
                    {r.answer}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {`Mastering Money Assessment ${VERSION_LABEL}`}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

