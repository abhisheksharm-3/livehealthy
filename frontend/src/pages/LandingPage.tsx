/**
 * Landing page component.
 */
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const OBESITY_LEVELS = [
    'Insufficient Weight',
    'Normal Weight',
    'Overweight I & II',
    'Obesity I, II & III',
];

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24">
                {/* Hero */}
                <section className="min-h-[85vh] flex items-center px-6 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-sm text-emerald-400 font-medium">ML-Powered Prediction</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
                                    Predict your
                                    <br />
                                    <span className="text-emerald-400">obesity level</span>
                                    <br />
                                    instantly
                                </h1>

                                <p className="text-lg text-neutral-400 max-w-md mb-10 leading-relaxed">
                                    Our Random Forest model analyzes 16 health factors to classify your obesity
                                    level with 99% accuracy. Trained on real survey data from Mexico, Peru & Colombia.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link
                                        to={ROUTES.ANALYSE}
                                        className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-900 font-semibold rounded-lg transition-all flex items-center gap-2"
                                    >
                                        Start Analysis
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        to={ROUTES.ABOUT}
                                        className="px-8 py-4 border border-neutral-700 hover:border-neutral-500 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Learn More
                                    </Link>
                                </div>

                                {/* Trust indicators */}
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-neutral-400">Zero Data Stored</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-neutral-400">&lt;3s Results*</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-neutral-400">99% Accuracy</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats card */}
                            <div className="hidden lg:block">
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center p-6 bg-neutral-800/50 rounded-xl">
                                            <div className="text-4xl font-light text-white mb-2">16</div>
                                            <div className="text-sm text-neutral-500">Health Features</div>
                                        </div>
                                        <div className="text-center p-6 bg-neutral-800/50 rounded-xl">
                                            <div className="text-4xl font-light text-emerald-400 mb-2">99%</div>
                                            <div className="text-sm text-neutral-500">Accuracy</div>
                                        </div>
                                        <div className="text-center p-6 bg-neutral-800/50 rounded-xl">
                                            <div className="text-4xl font-light text-white mb-2">7</div>
                                            <div className="text-sm text-neutral-500">Obesity Levels</div>
                                        </div>
                                        <div className="text-center p-6 bg-neutral-800/50 rounded-xl">
                                            <div className="text-4xl font-light text-white mb-2">2111</div>
                                            <div className="text-sm text-neutral-500">Training Samples</div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-neutral-800">
                                        <div className="flex flex-wrap gap-2">
                                            {OBESITY_LEVELS.map((level) => (
                                                <span key={level} className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">
                                                    {level}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-32 px-6 border-t border-neutral-800">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                            How It Works
                        </p>
                        <h2 className="text-3xl text-white mb-16 max-w-lg">
                            Predict obesity levels from eating habits & physical activity
                        </h2>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="group">
                                <div className="text-emerald-500 text-4xl font-light mb-4 group-hover:text-emerald-400 transition-colors">01</div>
                                <h3 className="text-xl text-white mb-3">Input Your Data</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Answer 16 questions about your demographics, diet, and physical activity patterns.
                                </p>
                            </div>

                            <div className="group">
                                <div className="text-emerald-500 text-4xl font-light mb-4 group-hover:text-emerald-400 transition-colors">02</div>
                                <h3 className="text-xl text-white mb-3">ML Classification</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Our Random Forest model trained on 2111 samples classifies your obesity level.
                                </p>
                            </div>

                            <div className="group">
                                <div className="text-emerald-500 text-4xl font-light mb-4 group-hover:text-emerald-400 transition-colors">03</div>
                                <h3 className="text-xl text-white mb-3">Get Insights</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Receive personalized health tips based on your classification in under 3 seconds*.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dataset info */}
                <section className="py-24 px-6 bg-neutral-900/30">
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                            Research Backed
                        </p>
                        <h2 className="text-2xl text-white mb-6">
                            Trained on Real Health Survey Data
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
                            Our model is trained on a dataset of 2111 records from Mexico, Peru, and Colombia —
                            23% collected directly from users, 77% augmented using SMOTE to balance classes.
                        </p>
                        <Link
                            to={ROUTES.ABOUT}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            Learn more about our methodology →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
