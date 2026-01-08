/**
 * Result display component with history comparison and health tips.
 */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DESCRIPTIVE_LABELS } from '@/constants/form-options';
import { isHealthConcern } from '@/constants/prediction-mapping';
import { getTipsForPrediction } from '@/constants/health-tips';
import { saveResult, getLastResult } from '@/services/history-service';
import type { ResultDisplayPropsType, HistoryEntryType } from '@/types';

export function ResultDisplay({ prediction, data, onReset }: ResultDisplayPropsType) {
    const [previousResult, setPreviousResult] = useState<HistoryEntryType | null>(null);
    const [copied, setCopied] = useState(false);
    const hasHealthConcern = isHealthConcern(prediction);
    const tips = getTipsForPrediction(prediction);

    useEffect(() => {
        // Get previous result before saving new one
        const prev = getLastResult();
        if (prev && prev.prediction !== prediction) {
            setPreviousResult(prev);
        }
        // Save current result
        saveResult(prediction, data);
    }, [prediction, data]);

    function handleCopyLink() {
        const url = window.location.origin + '/analyse';
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className="max-w-2xl w-full animate-fade-in">
            {/* Result Header */}
            <div className="text-center mb-10">
                <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                    Your Results
                </p>
                <h1 className="text-4xl text-white mb-4">
                    {hasHealthConcern ? 'Action Recommended' : 'Looking Good'}
                </h1>
                <p className={`text-2xl font-medium ${hasHealthConcern ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {prediction}
                </p>

                {/* Comparison with previous */}
                {previousResult && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/50 rounded-full text-sm">
                        <span className="text-neutral-500">Previous:</span>
                        <span className="text-neutral-300">{previousResult.prediction}</span>
                    </div>
                )}
            </div>

            {/* Health Tips */}
            <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-slide-up">
                <h3 className="text-lg font-medium text-white mb-4">{tips.title}</h3>
                <ul className="space-y-2">
                    {tips.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm">
                            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                        const label = typeof item === 'object' ? item.label : item;
                        const displayValue = typeof item === 'object' && item.values
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
            <div className="flex flex-wrap gap-3">
                <Button
                    onClick={onReset}
                    variant="outline"
                    className="border-neutral-700 hover:border-neutral-600 text-white"
                >
                    ← Analyse Again
                </Button>
                <Button
                    onClick={handleCopyLink}
                    variant="ghost"
                    className="text-neutral-400 hover:text-white"
                >
                    {copied ? '✓ Link Copied' : 'Share Link'}
                </Button>
            </div>
        </div>
    );
}
