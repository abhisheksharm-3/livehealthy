import { Button } from "@nextui-org/react";

interface ResultDisplayProps {
  predictionLabel: string | null;
  requestData: Record<string, any>;
  descriptiveLabels: Record<
    string,
    { label?: string; values?: Record<number, string> } | string
  >;
  setShowResult: (show: boolean) => void;
  form: { reset: () => void };
}

const DisplayResult: React.FC<ResultDisplayProps> = ({
  predictionLabel,
  requestData,
  descriptiveLabels,
  setShowResult,
  form,
}) => {
  return (
    <div className="w-screen flex flex-col items-center justify-between overflow-scroll pb-10 lg:pb-0 scrollbar-hide">
      <div className="container flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Ready or not, here's what we've crunched out for you!
        </h1>

        {predictionLabel && (
          <h2
            className={`text-2xl font-semibold text-center mb-4 ${
              predictionLabel.includes("Obesity") ||
              predictionLabel.includes("Overweight")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {predictionLabel.includes("Obesity") ||
            predictionLabel.includes("Overweight")
              ? "Warning Bells! 🚨 Time to rethink some habits."
              : "You're in the Clear! 🌟 Keep up the Great Work!"}
          </h2>
        )}

        <p className="mb-6">
          {predictionLabel
            ? `Looks like you’re steering towards: ${predictionLabel} – ${
                predictionLabel.includes("Obesity") ||
                predictionLabel.includes("Overweight")
                  ? "Time for a course correction?"
                  : "Keep up the Great Work!"
              }`
            : "Loading your results... Please wait."}
        </p>

        <div className="shadow-lg rounded-lg p-6 max-w-3xl w-full">
          <h3 className="text-lg font-semibold mb-4">
            Quick rewind: Here's the data you shared with us:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {Object.entries(requestData).map(([key, value]) => {
              const item = descriptiveLabels[key];
              const label = typeof item === "object" ? item.label : item;
              const valueDescription =
                typeof item === "object" &&
                item.values &&
                typeof value === "number"
                  ? item.values[value]
                  : value;
              return (
                <li key={key} className="rounded p-2">
                  <strong>{label || key}:</strong> {String(valueDescription)}
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Button
              onClick={() => {
                setShowResult(false);
                form.reset(); // Assuming resetForm is a function that resets the form
              }}
              color="warning"
            >d
              Roll the Dice Again on Your Health Analysis!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayResult;
