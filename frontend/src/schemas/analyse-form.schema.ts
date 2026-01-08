/**
 * Form validation schema for health analysis.
 */
import { z } from 'zod';

export const analyseFormSchema = z.object({
    Age: z.coerce.number().min(0).max(120),
    Gender: z.coerce.number().min(2).max(3),
    Height: z.coerce.number().min(0.5).max(2.5),
    Weight: z.coerce.number().min(10).max(300),
    CALC: z.coerce.number().min(2).max(5),
    FAVC: z.coerce.number().min(2).max(3),
    FCVC: z.coerce.number().min(1).max(3),
    NCP: z.coerce.number().min(1).max(4),
    SCC: z.coerce.number().min(2).max(3),
    SMOKE: z.coerce.number().min(2).max(3),
    CH2O: z.coerce.number().min(0.1).max(10),
    family_history_with_overweight: z.coerce.number().min(2).max(3),
    FAF: z.coerce.number().min(0).max(3),
    TUE: z.coerce.number().min(0).max(24),
    CAEC: z.coerce.number().min(2).max(5),
    MTRANS: z.coerce.number().min(2).max(6),
});
