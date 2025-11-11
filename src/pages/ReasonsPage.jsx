import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ All preset reasons
const PRESET_REASONS = [
  { id: "r1", text: "I am not that motivated to do anything about it" },
  { id: "r2", text: "I am already good enough with money" },
  { id: "r3", text: "It feels overwhelming or unpleasant" },
  { id: "r4", text: "I am stressed about or ashamed of my current situation" },
  { id: "r5", text: "I don’t want to admit that I have a money problem" },
  { id: "r6", text: "No matter what I do I am screwed anyway, so why do anything" },
  { id: "r7", text: "I don’t want to give up my current lifestyle" },
  { id: "r8", text: "I don’t really think or worry about the future - YOLO" },
  { id: "r9", text: "I cannot control or do not want to control my spending" },
  { id: "r10", text: "I have limited or no financial literacy (e.g. budgeting, compounding, super, credit)" },
  { id: "r11", text: "I don’t wont to have to create or run a budget" },
  { id: "r12", text: "I don’t understand how money works" },
  { id: "r13", text: "I don’t like or can’t use spreadsheets" },
  { id: "r14", text: "I don’t like or don’t have the time to learn about personal finance" },
  { id: "r15", text: "I’m not smart enough to learn financial literacy" },
  { id: "r16", text: "I’m no good at maths" },
  { id: "r17", text: "I don’t know how to get better" },
  { id: "r18", text: "I am no good with money" },
  { id: "r19", text: "I don’t earn enough money to be able to save any" },
  { id: "r20", text: "I am scared or anxious about money" },
  { id: "r21", text: "I have bigger problems (Health, Relationships, Addiction, Gambling, …)" },
  { id: "r22", text: "I use my spending to provide relief from other problems (Retail therapy)" },
  { id: "r23", text: "I am too busy and don’t have time to deal with it" },
  { id: "r24", text: "I don’t trust other people to give me good advice" },
  { id: "r25", text: "I don’t know who to trust or believe" },
  { id: "r26", text: "I have been burnt before" },
  { id: "r27", text: "I cannot afford the cost of getting help" },
];

export default function ReasonsPage({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true);
  const [responses, setResponses] = useState({});
  const [customReasons, setCustomReasons] = useState([]);
  const [step, setStep] = useState("review");
  const [ranking, setRanking] = useState([]);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 5;

  const handleSelect = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleAddCustomReason = () => {
    if (customReasons.length >= 3) return;
    setCustomReasons([...customReasons, { id: `c${customReasons.length + 1}`, text: "" }]);
  };

  const handleCustomChange = (id, text) => {
    setCustomReasons(customReasons.map(r => r.id === id ? { ...r, text } : r));
  };

  const handleContinue = () => {
    if (step === "review") {
      setStep("ranking");
    } else {
      const allReasons = [
        ...PRESET_REASONS,
        ...customReasons.filter((r) => r.text.trim() !== ""),
      ];
      // Existing fields used elsewhere in the UI
      const reviewed = allReasons.map((r) => ({
        id: r.id,
        text: r.text,
        response: responses[r.id] || "Not answered",
      }));

      // PDF-friendly structure expected by ReportDocument
      const responsesForPdf = allReasons.map((r) => ({
        id: r.id,
        text: r.text,
        answer: responses[r.id] || "Not answered",
      }));
      const topThree = ranking.map((r) => ({ id: r.id, text: r.text }));
      const reasons = { responses: responsesForPdf, topThree };

      onComplete({
        reviewed,
        ranking,
        reasons,
        // Aliases for backward compatibility where different names were used
        reasonsReviewed: reviewed,
        reasonsRanking: ranking,
        topBarriers: ranking,
        reasonsResponses: responsesForPdf,
      });
    }
  };

  const toggleRanking = (reason) => {
    if (ranking.find(r => r.id === reason.id)) {
      setRanking(ranking.filter(r => r.id !== reason.id));
    } else if (ranking.length < 3) {
      setRanking([...ranking, reason]);
    }
  };

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
            What’s Holding You Back?
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Before we finish, let’s take a moment to reflect on what might be
            getting in the way of improving your financial wellbeing.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            You’ll see a list of common reasons people find money challenging.
            For each one, let us know if it’s something that stops you,
            somewhat affects you, or doesn’t apply.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            You can also add up to three of your own reasons. After that,
            you’ll choose your top three barriers to focus on.
          </p>
          <button
            onClick={() => { setShowIntro(false); setPage(0); }}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Start Reflection
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg"
        >
          {step === "review" ? (
            <>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Reflect on What’s Stopping You
              </h2>
              {(() => {
                const totalPages = Math.max(1, Math.ceil(PRESET_REASONS.length / PAGE_SIZE));
                const start = page * PAGE_SIZE;
                const current = PRESET_REASONS.slice(start, start + PAGE_SIZE);
                const isLastPage = page >= totalPages - 1;

                return (
                  <>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {current.map((r) => (
                        <div key={r.id} className="flex justify-between items-center border-b pb-2">
                          <p className="text-left text-sm w-2/3">{r.text}</p>
                          <div className="flex space-x-2">
                            {["Yes", "Somewhat", "No"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSelect(r.id, opt)}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                  responses[r.id] === opt
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {isLastPage && (
                        <>
                          {customReasons.map((r) => (
                            <div key={r.id} className="flex justify-between items-center border-b pb-2">
                              <input
                                type="text"
                                value={r.text}
                                onChange={(e) => handleCustomChange(r.id, e.target.value)}
                                placeholder="Enter your own reason..."
                                className="border-b border-gray-300 focus:border-indigo-500 w-2/3 px-2 py-1 outline-none"
                              />
                              <div className="flex space-x-2">
                                {["Yes", "Somewhat", "No"].map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => handleSelect(r.id, opt)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                      responses[r.id] === opt
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}

                          {customReasons.length < 3 && (
                            <button
                              onClick={handleAddCustomReason}
                              className="text-indigo-600 font-semibold mt-3 hover:underline"
                            >
                              + Add Your Own Reason
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Page {page + 1} of {totalPages}
                      </div>
                      <div className="flex items-center space-x-3">
                        {!isLastPage ? (
                          <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200"
                          >
                            Next 5
                          </button>
                        ) : (
                          <button
                            onClick={handleContinue}
                            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
                          >
                            Continue to Ranking
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Choose and Rank Your Top 3 Barriers
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Select up to three reasons that most affect you, then click
                them again to deselect.
              </p>

              {(() => {
                const affirmative = ["Yes", "Somewhat"];
                const candidates = [
                  ...PRESET_REASONS,
                  ...customReasons.filter((r) => r.text.trim() !== ""),
                ].filter((r) => affirmative.includes(responses[r.id]));

                return (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {candidates.length === 0 && (
                      <div className="text-sm text-gray-500">
                        No reasons marked as Yes or Somewhat.
                      </div>
                    )}
                    {candidates.map((r) => {
                      const idx = ranking.findIndex((sel) => sel.id === r.id);
                      const selected = idx !== -1;
                      return (
                        <button
                          key={r.id}
                          onClick={() => toggleRanking(r)}
                          className={`w-full px-4 py-2 rounded-md border flex items-center justify-between ${
                            selected
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-left">{r.text}</span>
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
                  onClick={handleContinue}
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
