/**
 * Simple loading spinner component.
 */
import type { LoadingSpinnerPropsType } from '@/types';

const SIZE_CLASSES = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerPropsType) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${SIZE_CLASSES[size]} animate-spin rounded-full border-2 border-neutral-300 border-t-emerald-500`}
            />
        </div>
    );
}
