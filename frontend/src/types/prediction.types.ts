/**
 * Prediction-related type definitions.
 */

/** Prediction result key values from the ML model */
export type PredictionKeyType = 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** Form field value mapping for select inputs */
export interface ValueMappingType {
  label: string;
  values: Record<number, string>;
}

/** Descriptive labels configuration for form fields */
export type DescriptiveLabelsType = Record<string, string | ValueMappingType>;

/** API response for prediction request */
export interface PredictionResponseType {
  prediction_result?: number[];
  error?: string;
}
