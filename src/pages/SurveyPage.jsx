import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

export default function SurveyPage({ data, onComplete }) {
  const [currentQuestionId, setCurrentQuestionId] = useState("1.1");
  const [responses, setResponses] = useState({});
  const [showThemeIntro, setShowThemeIntro] = useState(true);

  const allQuestions = data.flatMap((t) => t.questions);
  const currentQuestion = allQuestions.find((q) => q.id === currentQuestionId);
  const totalQuestions = allQuestions.length;
  const currentIndex = allQuestions.findIndex((q) => q.id === currentQuestionId);

  const handleAnswer = (value, next) => {
    const updated = { ...responses, [currentQuestionId]: value };
    setResponses(updated);

    if (next === null || next === "End") {
      const results = calculateResults(updated, data);
      onComplete(results);
      return;
    }

    // Determine next question
    const nextQuestion = allQuestions.find((q) => q.id === next);
    const currentThemeId = theme.themeId;
    const nextThemeId = data.find((t) => t.questions.some((q) => q.id === nextQuestion.id))?.themeId;

    // If changing themes, show intro screen
    if (nextThemeId !== currentThemeId) {
      setShowThemeIntro(true);
    }

    setCurrentQuestionId(next);
  };


  const calculateResults = (responses, data) => {
    const themeScores = data.map((theme) => {
      const questions = theme.questions;
      const total = questions.reduce((sum, q) => sum + (responses[q.id] || 0), 0);
      const max = 8; // max score per theme
      return {
        themeId: theme.themeId,
        themeName: theme.themeName,
        total,
        max,
        percent: Math.round((total / max) * 100),
      };
    });

    const overallTotal = themeScores.reduce((sum, t) => sum + t.total, 0);
    const overallMax = themeScores.reduce((sum, t) => sum + t.max, 0);

    return {
      themes: themeScores,
      overallPercent: Math.round((overallTotal / overallMax) * 100),
    };
  };

  // Find current theme based on question
  const theme = data.find((t) => t.questions.some((q) => q.id === currentQuestionId));

  return (
  <AnimatePresence mode="wait">
    {showThemeIntro ? (
      <motion.div
        key="intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">{theme.themeName}</h2>
        <p className="text-gray-700 text-lg mb-6">{theme.description}</p>
        <button
          onClick={() => setShowThemeIntro(false)}
          className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
        >Go To Questions
        </button>
      </motion.div>
    ) : (
      <motion.div
        key="question"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg"
      >
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      </motion.div>
    )}
  </AnimatePresence>
);
};