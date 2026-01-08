/**
 * Analyse page component with retry functionality.
 */
import { useState, useTransition } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnalyseForm } from '@/components/analyse/AnalyseForm';
import { ResultDisplay } from '@/components/analyse/ResultDisplay';
import { analyseFormSchema } from '@/schemas/analyse-form.schema';
import { submitPrediction } from '@/services/prediction-service';
import { getPredictionLabel } from '@/constants/prediction-mapping';
import type { AnalyseFormType, ResultStateType } from '@/types';

export function AnalysePage() {
    const [isPending, startTransition] = useTransition();
    const [lastSubmittedData, setLastSubmittedData] = useState<AnalyseFormType | null>(null);
    const [result, setResult] = useState<ResultStateType>({
        prediction: null,
        error: null,
        data: null,
    });

    const form = useForm<AnalyseFormType>({
        resolver: zodResolver(analyseFormSchema) as Resolver<AnalyseFormType>,
    });

    function handleSubmit(values: AnalyseFormType) {
        setLastSubmittedData(values);
        performPrediction(values);
    }

    function performPrediction(values: AnalyseFormType) {
        startTransition(async () => {
            try {
                const response = await submitPrediction(values);

                if (response.error) {
                    setResult({ prediction: null, error: response.error, data: null });
                    return;
                }

                if (response.prediction_result && response.prediction_result.length > 0) {
                    const label = getPredictionLabel(response.prediction_result[0]);
                    setResult({ prediction: label, error: null, data: values });
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Prediction failed';
                setResult({ prediction: null, error: message, data: null });
            }
        });
    }

    function handleRetry() {
        if (lastSubmittedData) {
            setResult({ prediction: null, error: null, data: null });
            performPrediction(lastSubmittedData);
        }
    }

    function handleReset() {
        form.reset();
        setLastSubmittedData(null);
        setResult({ prediction: null, error: null, data: null });
    }

    if (result.prediction && result.data) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-24 px-6 flex items-center justify-center">
                    <ResultDisplay
                        prediction={result.prediction}
                        data={result.data}
                        onReset={handleReset}
                    />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 animate-fade-in">
                        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                            Health Analysis
                        </p>
                        <h1 className="text-4xl text-white mb-4">
                            Tell us about yourself
                        </h1>
                        <p className="text-neutral-400">
                            Answer these questions to get your personalized health assessment.
                        </p>
                    </div>

                    {result.error && (
                        <div className="mb-8 p-4 border border-red-500/30 bg-red-500/10 rounded-lg flex items-center justify-between">
                            <span className="text-red-400 text-sm">{result.error}</span>
                            <button
                                onClick={handleRetry}
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isPending ? 'Retrying...' : 'Retry'}
                            </button>
                        </div>
                    )}

                    <AnalyseForm form={form} onSubmit={handleSubmit} isPending={isPending} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
