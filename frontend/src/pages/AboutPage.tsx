/**
 * About page component with detailed methodology.
 */
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const ML_MODELS = [
    { name: 'Random Forest', accuracy: '99%', desc: 'Ensemble of decision trees for robust classification' },
    { name: 'Gradient Boosting', accuracy: '99%', desc: 'Sequential error correction for high accuracy' },
    { name: 'Decision Tree', accuracy: '98%', desc: 'Interpretable tree-based classification' },
    { name: 'SVM', accuracy: '97%', desc: 'Optimal hyperplane separation' },
];

const DATASET_FEATURES = [
    { name: 'Gender', type: 'Categorical' },
    { name: 'Age', type: 'Continuous' },
    { name: 'Height', type: 'Continuous' },
    { name: 'Weight', type: 'Continuous' },
    { name: 'Family History', type: 'Binary' },
    { name: 'High Caloric Food (FAVC)', type: 'Binary' },
    { name: 'Vegetable Intake (FCVC)', type: 'Integer' },
    { name: 'Meals per Day (NCP)', type: 'Continuous' },
    { name: 'Snacking (CAEC)', type: 'Categorical' },
    { name: 'Smoking', type: 'Binary' },
    { name: 'Water Intake (CH2O)', type: 'Continuous' },
    { name: 'Calorie Monitoring (SCC)', type: 'Binary' },
    { name: 'Physical Activity (FAF)', type: 'Continuous' },
    { name: 'Screen Time (TUE)', type: 'Integer' },
    { name: 'Alcohol (CALC)', type: 'Categorical' },
    { name: 'Transportation (MTRANS)', type: 'Categorical' },
];

const OBESITY_LEVELS = [
    'Insufficient Weight',
    'Normal Weight',
    'Overweight Level I',
    'Overweight Level II',
    'Obesity Type I',
    'Obesity Type II',
    'Obesity Type III',
];

export function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 animate-fade-in">
                        <p className="text-sm uppercase tracking-widest text-emerald-500 mb-4">
                            About
                        </p>
                        <h1 className="text-4xl text-white mb-6">
                            Predicting Obesity Levels Through ML
                        </h1>
                        <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
                            Obesity arises from genetic predispositions, environmental factors, and lifestyle choices.
                            Our project harnesses machine learning to classify obesity levels based on eating habits
                            and physical activity patterns.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Accuracy */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-6 border border-neutral-800 rounded-xl text-center">
                                <div className="text-3xl font-light text-emerald-400 mb-2">99%</div>
                                <div className="text-sm text-neutral-500">Best Accuracy</div>
                            </div>
                            <div className="p-6 border border-neutral-800 rounded-xl text-center">
                                <div className="text-3xl font-light text-white mb-2">2111</div>
                                <div className="text-sm text-neutral-500">Records</div>
                            </div>
                            <div className="p-6 border border-neutral-800 rounded-xl text-center">
                                <div className="text-3xl font-light text-white mb-2">16</div>
                                <div className="text-sm text-neutral-500">Features</div>
                            </div>
                            <div className="p-6 border border-neutral-800 rounded-xl text-center">
                                <div className="text-3xl font-light text-white mb-2">7</div>
                                <div className="text-sm text-neutral-500">Classes</div>
                            </div>
                        </section>

                        {/* Dataset */}
                        <section>
                            <h2 className="text-xl text-white mb-4">About the Dataset</h2>
                            <p className="text-neutral-400 leading-relaxed mb-4">
                                The dataset estimates obesity levels in individuals from Mexico, Peru, and Colombia
                                based on eating habits and physical condition. It contains 17 attributes and 2111 records,
                                labeled with 7 obesity levels from Insufficient Weight to Obesity Type III.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                                    77% Synthetic (SMOTE)
                                </span>
                                <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                                    23% Real Survey Data
                                </span>
                            </div>
                            <a
                                href="https://www.semanticscholar.org/paper/Estimation-of-Obesity-Levels-with-a-Trained-Neural-Ya%C4%9F%C4%B1n-G%C3%BCl%C3%BC/2c1eab51db154493d225c8b86ba885bbaf147a2c"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                            >
                                View Research Paper →
                            </a>
                        </section>

                        {/* Obesity Levels */}
                        <section>
                            <h2 className="text-xl text-white mb-4">Classification Labels</h2>
                            <div className="flex flex-wrap gap-2">
                                {OBESITY_LEVELS.map((level) => (
                                    <span
                                        key={level}
                                        className="px-3 py-2 border border-neutral-700 rounded-lg text-sm text-neutral-300"
                                    >
                                        {level}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Features */}
                        <section>
                            <h2 className="text-xl text-white mb-4">Dataset Features</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {DATASET_FEATURES.map((feature) => (
                                    <div key={feature.name} className="p-3 bg-neutral-900/50 rounded-lg">
                                        <div className="text-sm text-white">{feature.name}</div>
                                        <div className="text-xs text-neutral-500">{feature.type}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ML Models */}
                        <section>
                            <h2 className="text-xl text-white mb-6">Machine Learning Models</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {ML_MODELS.map((model, idx) => (
                                    <div key={model.name} className="p-5 border border-neutral-800 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-emerald-500 text-sm font-mono">0{idx + 1}</span>
                                                <h3 className="text-white font-medium">{model.name}</h3>
                                            </div>
                                            <span className="text-emerald-400 text-sm font-medium">{model.accuracy}</span>
                                        </div>
                                        <p className="text-neutral-500 text-sm">{model.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Privacy */}
                        <section>
                            <h2 className="text-xl text-white mb-4">Your Privacy</h2>
                            <p className="text-neutral-400 leading-relaxed">
                                Your health data is sent securely to our server only for prediction. We don't store,
                                track, or share any personal information. Zero data retention.
                            </p>
                        </section>

                        {/* Open Source */}
                        <section className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <h2 className="text-lg text-white mb-3">Open Source</h2>
                            <p className="text-neutral-400 text-sm mb-4">
                                Built by{' '}
                                <a
                                    href="https://abhisheksan.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300"
                                >
                                    Abhishek Sharma
                                </a>
                                {' '}as part of the Data Mining and Analysis coursework at CCET.
                            </p>
                            <a
                                href="https://github.com/abhisheksharm-3/livehealthy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                            >
                                View on GitHub →
                            </a>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
