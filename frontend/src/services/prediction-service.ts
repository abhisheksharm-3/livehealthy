/**
 * Prediction API service.
 */
import { api } from './api';
import type { AnalyseFormType, PredictionResponseType } from '@/types';

export async function submitPrediction(data: AnalyseFormType): Promise<PredictionResponseType> {
    return api.post<PredictionResponseType>('/analyse', { data });
}
