/**
 * Prediction result to label mapping.
 */
import type { PredictionKeyType } from '@/types';

export const PREDICTION_MAPPING: Record<PredictionKeyType, string> = {
    2: 'Normal Weight',
    3: 'Overweight Level I',
    4: 'Overweight Level II',
    5: 'Obesity Level I',
    6: 'Insufficient Weight',
    7: 'Obesity Level II',
    8: 'Obesity Level III',
};

export function getPredictionLabel(key: number): string {
    return PREDICTION_MAPPING[key as PredictionKeyType] || 'Unknown';
}

export function isHealthConcern(label: string): boolean {
    return label.includes('Obesity') || label.includes('Overweight');
}
