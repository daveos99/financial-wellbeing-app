import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

const PRESET_REASONS = [
  { id: "r1", text: "I am not that motivated to get better at money" },
  { id: "r2", text: "I don't need to get better at money as I am already good enough" },
  { id: "r3", text: "The thought of tring to get better at money feels overwhelming or unpleasant" },
  { id: "r4", text: "I am too stressed about or ashamed of my current situation and can't think about getting better at money" },
  { id: "r5", text: "I don't want to admit that I have a money problem" },
  { id: "r6", text: "No matter what I do I am screwed anyway, so why bother trying to get better at money" },
  { id: "r7", text: "I don't want to give up my current lifestyle to get better at money" },
  { id: "r8", text: "I don't really think or worry about the future and getting better at money - YOLO" },
  { id: "r9", text: "I cannot control or do not want to control my spending to get better at money" },
  {
    id: "r10",
    text: "I can't get better at money as I have limited or no financial literacy about things like budgeting, compounding, super, credit",
  },
  { id: "r11", text: "I don't want to have to create or run a budget to get better at money" },
  { id: "r12", text: "I can't get better at money as I don't understand how money works" },
  { id: "r13", text: "I can't get better at money as I don't like or can't use spreadsheets" },
  { id: "r14", text: "I don't like or don't have the time to learn about personal finance to get better at money" },
  { id: "r15", text: "I'm not smart enough to get better at money" },
  { id: "r16", text: "I can't get better at money as I'm no good at maths" },
  { id: "r17", text: "I don't know how to get better at money" },
  { id: "r18", text: "I can't get better at money as I am no good with money" },
  { id: "r19", text: "I can't get better at money as I don't earn enough money to be able to save any" },
  { id: "r20", text: "I can't get better at money as I am scared or anxious about money" },
  { id: "r21", text: "I can't get better at money as I have bigger problems (Health, Relationships, Addiction, Gambling, etc.)" },
  {
    id: "r22",
    text: "My spending provides relief from other problems (Retail therapy) and might stop me getting better at money",
  },
  { id: "r23", text: "I am too busy and don't have time to get better at money" },
  { id: "r24", text: "I don't trust other people to give me good advice on how to get better at money" },
  { id: "r25", text: "I don't know who to trust or believe to help me get better at money" },
  { id: "r26", text: "I have been burnt before when trying to get better at money" },
  { id: "r27", text: "I cannot afford the cost of getting help to get better at money" },
];

const REASON_OPTIONS = ["True", "Somewhat True", "False"];

const INITIAL_CUSTOM_REASONS = [
  { id: "c1", text: "" },
  { id: "c2", text: "" },
  { id: "c3", text: "" },
];

export default function ReasonsPage({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true);
  const [responses, setResponses] = useState({});
  const [customReasons, setCustomReasons] = useState(() =>
    INITIAL_CUSTOM_REASONS.map((reason) => ({ ...reason }))
  );
  const [stage, setStage] = useState("preset");
  const [ranking, setRanking] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPreset = PRESET_REASONS.length;
  const activeReason = PRESET_REASONS[currentIndex];

  const recordResponse = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handlePresetAnswer = (value) => {
    if (!activeReason) return;
    recordResponse(activeReason.id, value);

    if (currentIndex >= totalPreset - 1) {
      setStage("custom");
    } else {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const handleCustomChange = (id, text) => {
    setCustomReasons((prev) =>
      prev.map((reason) => (reason.id === id ? { ...reason, text } : reason))
    );
    setRanking((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, text } : entry))
    );
    setResponses((prev) => {
      const next = { ...prev };
      if (text.trim()) {
        next[id] = "True";
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const goToRanking = () => {
    setStage("ranking");
  };

  const validCustomReasons = customReasons.filter(
    (reason) => reason.text.trim() !== ""
  );

  const allReasons = [...PRESET_REASONS, ...validCustomReasons];

  const toggleRanking = (reason) => {
    setRanking((prev) => {
      if (prev.find((r) => r.id === reason.id)) {
        return prev.filter((r) => r.id !== reason.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, reason];
    });
  };

  const handleFinish = () => {
    const reviewed = allReasons.map((reason) => ({
      id: reason.id,
      text: reason.text,
      response: responses[reason.id] || "Not answered",
    }));

    const responsesForPdf = reviewed.map((reason) => ({
      id: reason.id,
      text: reason.text,
      answer: reason.response,
    }));

    const topThree = ranking.map((reason) => ({
      id: reason.id,
      text: reason.text,
    }));
    const reasons = { responses: responsesForPdf, topThree };

    onComplete({
      reviewed,
      ranking,
      reasons,
      reasonsReviewed: reviewed,
      reasonsRanking: ranking,
      topBarriers: ranking,
      reasonsResponses: responsesForPdf,
    });
  };

  const reasonQuestion = activeReason
    ? {
        text: activeReason.text,
        options: REASON_OPTIONS.map((label) => ({
          label,
          value: label,
          next: null,
        })),
      }
    : null;

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            What's Holding You Back?
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            In the next section you will step through a series of statements 
            and select whether they are True, Somewhat True or False for you.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            You will be able to add up to 3 additional statements of your own 
            to explain what else you believe is holding you back.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            At the end you will be asked to rank up to 3 statements as your top 
            reasons for what’s stopping you get better at money.
          </p>
          <button
            onClick={() => {
              setResponses({});
              setCustomReasons(INITIAL_CUSTOM_REASONS.map((reason) => ({ ...reason })));
              setRanking([]);
              setCurrentIndex(0);
              setStage("preset");
              setShowIntro(false);
            }}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Continue
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg"
        >
          {stage === "preset" && reasonQuestion && (
            <>
              {/*<h2 className="text-2xl font-bold text-indigo-600 mb-4">
                What's stopping you from being better at money...
              </h2>*/}
              <ProgressBar current={currentIndex + 1} total={totalPreset} />
              <QuestionCard
                question={reasonQuestion}
                onAnswer={(value) => handlePresetAnswer(value)}
              />
            </>
          )}

          {stage === "custom" && (
            <>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Add Your Own Reasons
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Add up to three other reasons that are stopping you get better at money. 
              </p>

              <div className="space-y-4">
                {customReasons.map((reason, index) => (
                  <div key={reason.id}>
                    <input
                      type="text"
                      value={reason.text}
                      onChange={(e) => handleCustomChange(reason.id, e.target.value)}
                      placeholder="Enter your own reason..."
                      className="w-full border-b border-gray-300 focus:border-indigo-500 px-2 py-2 outline-none text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={goToRanking}
                  className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  Continue to Ranking
                </button>
              </div>
            </>
          )}

          {stage === "ranking" && (
            <>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Choose and Rank Your Top 3 Barriers
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Select up to three reasons that most affect you. You can click them again to deselect.
              </p>

              {(() => {
                const affirmative = ["True", "Somewhat True"];
                const candidates = allReasons.filter((reason) =>
                  affirmative.includes(responses[reason.id])
                );

                return (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {candidates.length === 0 && (
                      <div className="text-sm text-gray-500">
                        No reasons marked as Yes or Somewhat.
                      </div>
                    )}
                    {candidates.map((reason) => {
                      const idx = ranking.findIndex(
                        (sel) => sel.id === reason.id
                      );
                      const selected = idx !== -1;
                      return (
                        <button
                          key={reason.id}
                          onClick={() => toggleRanking(reason)}
                          className={`w-full px-4 py-2 rounded-md border flex items-center justify-between ${
                            selected
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-left">{reason.text}</span>
                          {selected && (
                            <span className="ml-4 inline-flex items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold px-2 py-1">
                              #{idx + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}

              <div className="mt-6 text-center">
                <button
                  onClick={handleFinish}
                  disabled={ranking.length === 0}
                  className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50"
                >
                  Finish Reflection
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
