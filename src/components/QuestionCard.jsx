import React from "react";

export default function QuestionCard({ question, onAnswer }) {
  if (!question) return null;

  return (
    <div className="text-center">
      {/* Question text */}
      <h3 className="text-2xl font-semibold mb-8 text-gray-900">
        {question.text}
      </h3>

      {/* Answer buttons */}
      <div className="flex flex-col gap-4 items-center">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt.value, opt.next)}
            className="w-full max-w-sm bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

