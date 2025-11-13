import React from "react";
import SurveyButton from "../components/Button"; // adjust the import path as needed
import { VERSION_LABEL } from "../config/version";

export default function WelcomePage({ onStart }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Mastering Money Assessment</h1>
      <p className="mb-6 text-lg">
        Answer a few quick questions to assess how good you are at money.
      </p>

      <SurveyButton onClick={onStart} className="mt-8">
        Start Assessment
      </SurveyButton>

      <p className="mt-6 text-sm text-white/80">{VERSION_LABEL}</p>
    </div>
  );
}
