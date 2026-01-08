/**
 * Result display component with history comparison and health tips.
 */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DESCRIPTIVE_LABELS } from "@/constants/form-options";
import { isHealthConcern } from "@/constants/prediction-mapping";
import { getTipsForPrediction } from "@/constants/health-tips";
import { saveResult, getLastResult } from "@/services/history-service";
import { exportResultToPDF } from "@/services/pdf-export-service";
import type { ResultDisplayPropsType, HistoryEntryType } from "@/types";

export function ResultDisplay({
  prediction,
  data,
  onReset,
}: ResultDisplayPropsType) {
  const [previousResult, setPreviousResult] = useState<HistoryEntryType | null>(
    null,
  );
  const [isExporting, setIsExporting] = useState(false);
  const hasHealthConcern = isHealthConcern(prediction);
  const tips = getTipsForPrediction(prediction);

  useEffect(() => {
    // IMPORTANT: Get previous result BEFORE saving new one
    const prev = getLastResult();

    // Save current result
    saveResult(prediction, data);

    // Only show previous if it exists and is different from current
    if (prev && prev.prediction !== prediction) {
      setPreviousResult(prev);
    }
  }, [prediction, data]);

  async function handleExportPDF() {
    try {
      setIsExporting(true);
      await exportResultToPDF(prediction, data, tips);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="max-w-2xl w-full animate-fade-in pb-12">
      {/* Result Header */}
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
          Your Results
        </p>
        <h1 className="text-4xl text-white mb-4">
          {hasHealthConcern ? "Action Recommended" : "Looking Good"}
        </h1>
        <p
          className={`text-2xl font-medium ${hasHealthConcern ? "text-amber-400" : "text-emerald-400"}`}
        >
          {prediction}
        </p>

        {/* Comparison with previous */}
        {previousResult && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/50 rounded-full text-sm animate-fade-in">
            <span className="text-neutral-500">Previous:</span>
            <span className="text-neutral-300">
              {previousResult.prediction}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-500 text-xs">
              {new Date(previousResult.timestamp).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Health Tips */}
      <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-slide-up">
        <h3 className="text-lg font-medium text-white mb-4">{tips.title}</h3>
        <ul className="space-y-2">
          {tips.tips.map((tip, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-neutral-300 text-sm"
            >
              <svg
                className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Data Summary */}
      <div className="border border-neutral-800 rounded-lg p-6 mb-8">
        <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">
          Your Responses
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(data).map(([key, value]) => {
            const item = DESCRIPTIVE_LABELS[key];
            const label = typeof item === "object" ? item.label : item;
            const displayValue =
              typeof item === "object" && item.values
                ? item.values[value as number] || value
                : value;
            return (
              <div key={key}>
                <div className="text-xs text-neutral-500 mb-1">{label}</div>
                <div className="text-sm text-white">{String(displayValue)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pb-8">
        <Button
          onClick={onReset}
          variant="outline"
          className="border-neutral-700 hover:border-neutral-600 text-white"
        >
          ← Analyse Again
        </Button>
        <Button
          onClick={handleExportPDF}
          disabled={isExporting}
          variant="ghost"
          className="text-neutral-400 hover:text-white disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <svg
                className="w-4 h-4 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
