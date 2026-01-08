/**
 * Footer component with footnote.
 */
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function Footer() {
    return (
        <footer className="border-t border-neutral-800 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/Images/logo.png" alt="LiveHealthy" className="h-6 w-6 opacity-60" />
                        <span className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} LiveHealthy
                        </span>
                    </div>

                    <nav className="flex items-center gap-6">
                        <Link to={ROUTES.ANALYSE} className="text-sm text-neutral-500 hover:text-white transition-colors">
                            Analyse
                        </Link>
                        <Link to={ROUTES.STATS} className="text-sm text-neutral-500 hover:text-white transition-colors">
                            Statistics
                        </Link>
                        <Link to={ROUTES.ABOUT} className="text-sm text-neutral-500 hover:text-white transition-colors">
                            About
                        </Link>
                        <a
                            href="https://github.com/abhisheksharm-3/livehealthy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://abhisheksan.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-white transition-colors"
                        >
                            Portfolio
                        </a>
                    </nav>
                </div>

                {/* Footnote */}
                <div className="mt-8 pt-6 border-t border-neutral-800/50 text-center">
                    <p className="text-xs text-neutral-600">
                        * Response time when backend is warm. Cold starts may take longer.
                    </p>
                </div>
            </div>
        </footer>
    );
}
