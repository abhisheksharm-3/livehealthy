/**
 * Prediction API service.
 */
import { api } from "./api";
import type { AnalyseFormType, PredictionResponseType } from "@/types";

/**
 * Transform frontend form data to backend API format.
 * Converts numeric codes to the string values expected by the backend schema.
 */
function transformDataForBackend(data: AnalyseFormType) {
  return {
    Age: data.Age,
    Gender: data.Gender === 3 ? "Male" : "Female",
    Height: data.Height,
    Weight: data.Weight,

    // Yes/No fields (2 = No, 3 = Yes)
    family_history_with_overweight:
      data.family_history_with_overweight === 3 ? "yes" : "no",
    FAVC: data.FAVC === 3 ? "yes" : "no",
    SCC: data.SCC === 3 ? "yes" : "no",
    SMOKE: data.SMOKE === 3 ? "yes" : "no",

    // Numeric fields (pass through)
    FCVC: data.FCVC,
    NCP: data.NCP,
    CH2O: data.CH2O,
    FAF: data.FAF,
    TUE: data.TUE,

    // CAEC - Snacking (2 = no, 3 = Sometimes, 4 = Frequently, 5 = Always)
    CAEC:
      data.CAEC === 2
        ? "no"
        : data.CAEC === 3
          ? "Sometimes"
          : data.CAEC === 4
            ? "Frequently"
            : "Always",

    // CALC - Alcohol (2 = no, 3 = Sometimes, 4 = Frequently, 5 = Always)
    CALC:
      data.CALC === 2
        ? "no"
        : data.CALC === 3
          ? "Sometimes"
          : data.CALC === 4
            ? "Frequently"
            : "Always",

    // MTRANS - Transportation (2 = Car, 3 = Motorbike, 4 = Bike, 5 = Public, 6 = Walking)
    MTRANS:
      data.MTRANS === 2
        ? "Automobile"
        : data.MTRANS === 3
          ? "Motorbike"
          : data.MTRANS === 4
            ? "Bike"
            : data.MTRANS === 5
              ? "Public_Transportation"
              : "Walking",
  };
}

export async function submitPrediction(
  data: AnalyseFormType,
): Promise<PredictionResponseType> {
  const transformedData = transformDataForBackend(data);

  return api.post<PredictionResponseType>("/analyse", {
    data: transformedData,
  });
}
