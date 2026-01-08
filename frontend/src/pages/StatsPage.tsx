/**
 * Stats page component with global health data.
 */
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
    GLOBAL_HEALTH_STATS,
    OBESITY_PREVALENCE,
    KEY_FINDINGS,
} from '@/constants/global-health-stats';

function StatsSkeleton() {
    return (
        <div className="space-y-16">
            {/* Key Findings skeleton */}
            <section>
                <div className="skeleton w-48 h-6 mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-5 border border-neutral-800 rounded-xl text-center">
                            <div className="skeleton w-16 h-8 mx-auto mb-2" />
                            <div className="skeleton w-20 h-4 mx-auto mb-1" />
                            <div className="skeleton w-24 h-3 mx-auto" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Health Stats skeleton */}
            <section>
                <div className="skeleton w-40 h-6 mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border border-neutral-800 rounded-lg p-5 flex items-center justify-between">
                            <div className="flex items-start gap-6">
                                <div className="skeleton w-6 h-5" />
                                <div>
                                    <div className="skeleton w-36 h-5 mb-2" />
                                    <div className="skeleton w-56 h-4" />
                                </div>
                            </div>
                            <div className="skeleton w-20 h-8" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Obesity Prevalence skeleton */}
            <section>
                <div className="skeleton w-52 h-6 mb-6" />
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-5 border border-neutral-800 rounded-xl">
                            <div className="skeleton w-24 h-6 mb-1" />
                            <div className="skeleton w-20 h-4 mb-1" />
                            <div className="skeleton w-16 h-3" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function StatsPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 animate-fade-in">
                        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                            Data Insights
                        </p>
                        <h1 className="text-4xl text-white mb-4">
                            Global Health Statistics
                        </h1>
                        <p className="text-neutral-400 max-w-xl">
                            Understanding global health trends helps contextualize your wellness journey.
                            Data from WHO, IDF, and World Obesity Federation.
                        </p>
                    </div>

                    {isLoading ? (
                        <StatsSkeleton />
                    ) : (
                        <div className="space-y-16 animate-fade-in">
                            {/* Key Findings */}
                            <section>
                                <h2 className="text-lg text-white mb-6">Key Findings (2024-2025)</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {KEY_FINDINGS.map((finding) => (
                                        <div key={finding.title} className="p-5 border border-neutral-800 rounded-xl text-center">
                                            <div className="text-2xl font-light text-emerald-400 mb-2">{finding.stat}</div>
                                            <div className="text-sm text-white mb-1">{finding.title}</div>
                                            <div className="text-xs text-neutral-500">{finding.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Global Health Stats */}
                            <section>
                                <h2 className="text-lg text-white mb-6">Health Indicators</h2>
                                <div className="space-y-4">
                                    {GLOBAL_HEALTH_STATS.map((stat, idx) => (
                                        <div
                                            key={stat.label}
                                            className="border border-neutral-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
                                        >
                                            <div className="flex items-start gap-6">
                                                <span className="text-emerald-500 text-sm font-mono mt-1">0{idx + 1}</span>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-white font-medium">{stat.label}</h3>
                                                        <span className={`w-2 h-2 rounded-full ${stat.status === 'critical' ? 'bg-red-500' :
                                                                stat.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                                                            }`} />
                                                    </div>
                                                    <p className="text-neutral-500 text-sm">{stat.note}</p>
                                                    {stat.source && (
                                                        <p className="text-neutral-600 text-xs mt-1">Source: {stat.source}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right pl-10 sm:pl-0">
                                                <span className="text-2xl text-white font-light">{stat.value}</span>
                                                <span className="text-neutral-500 text-sm ml-1">{stat.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Obesity Prevalence */}
                            <section>
                                <h2 className="text-lg text-white mb-6">Obesity & Overweight Prevalence</h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {OBESITY_PREVALENCE.map((stat) => (
                                        <div key={stat.label} className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                                            <div className="text-xl font-light text-white mb-1">{stat.value}</div>
                                            <div className="text-sm text-neutral-400">{stat.label}</div>
                                            <div className="text-xs text-neutral-600 mt-1">{stat.description}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-neutral-600 text-xs mt-4">
                                    Source: World Obesity Atlas 2024, WHO
                                </p>
                            </section>

                            {/* Context Note */}
                            <section className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                <h3 className="text-white font-medium mb-2">Why This Matters</h3>
                                <p className="text-neutral-400 text-sm">
                                    Non-communicable diseases now account for 64% of the global disease burden.
                                    Obesity has tripled since 1975, with 79% of affected adults living in low and
                                    middle-income countries. Early detection and lifestyle changes can significantly
                                    reduce these risks.
                                </p>
                            </section>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
