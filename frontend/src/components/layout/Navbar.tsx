/**
 * Navigation bar component with glassmorphism and fullscreen mobile menu.
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.ANALYSE, label: 'Analyse' },
    { path: ROUTES.STATS, label: 'Statistics' },
    { path: ROUTES.ABOUT, label: 'About' },
];

export function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/50 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
                        <Link to={ROUTES.HOME} className="flex items-center gap-3">
                            <img src="/Images/logo.png" alt="LiveHealthy" className="h-7 w-7" />
                            <span className="font-medium text-white">LiveHealthy</span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.slice(1).map(({ path, label }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${location.pathname === path
                                            ? 'bg-white/10 text-emerald-400'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden md:block">
                            <a
                                href="https://github.com/abhisheksharm-3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                GitHub
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-neutral-400 hover:text-white z-50"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Fullscreen mobile menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-neutral-950 md:hidden">
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        {NAV_LINKS.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-3xl font-medium transition-colors ${location.pathname === path
                                        ? 'text-emerald-400'
                                        : 'text-neutral-300 hover:text-white'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <a
                            href="https://github.com/abhisheksharm-3/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-neutral-500 hover:text-white transition-colors mt-8"
                        >
                            GitHub →
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
