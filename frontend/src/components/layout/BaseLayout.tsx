/**
 * Base layout wrapper component.
 */
import { ReactNode } from 'react';

export function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
            <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
                {children}
            </div>
        </div>
    );
}
