/**
 * PDF export service for generating result reports.
 */
import jsPDF from "jspdf";
import type { AnalyseFormType } from "@/types";
import { DESCRIPTIVE_LABELS } from "@/constants/form-options";

/**
 * Generate and download PDF report of results.
 */
export async function exportResultToPDF(
  prediction: string,
  data: AnalyseFormType,
  tips: { title: string; tips: string[] },
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    fontSize: number,
    isBold = false,
    color = [0, 0, 0],
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    if (isBold) {
      pdf.setFont("helvetica", "bold");
    } else {
      pdf.setFont("helvetica", "normal");
    }
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * fontSize * 0.4 + 5;
  };

  // Helper to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Header
  pdf.setFillColor(16, 185, 129); // Emerald color
  pdf.rect(0, 0, pageWidth, 15, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("LiveHealthy - Health Analysis Report", margin, 10);

  yPosition = 25;

  // Date
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    margin,
    yPosition,
  );
  yPosition += 15;

  // Result Section
  checkPageBreak(30);
  addText("YOUR RESULT", 14, true, [16, 185, 129]);
  yPosition += 2;

  // Draw box around prediction
  const boxHeight = 15;
  pdf.setFillColor(240, 253, 244);
  pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, boxHeight, "F");
  pdf.setDrawColor(16, 185, 129);
  pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, boxHeight, "S");

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text(prediction, margin + 5, yPosition + 5);
  yPosition += boxHeight + 10;

  // Health Tips Section
  checkPageBreak(40);
  addText("HEALTH RECOMMENDATIONS", 14, true, [16, 185, 129]);
  yPosition += 2;
  addText(tips.title, 12, true);
  yPosition += 2;

  tips.tips.forEach((tip) => {
    checkPageBreak(10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);

    // Bullet point
    pdf.circle(margin + 2, yPosition - 2, 1, "F");

    const lines = pdf.splitTextToSize(tip, pageWidth - 2 * margin - 10);
    pdf.text(lines, margin + 8, yPosition);
    yPosition += lines.length * 4 + 3;
  });

  yPosition += 10;

  // Your Responses Section
  checkPageBreak(40);
  addText("YOUR RESPONSES", 14, true, [16, 185, 129]);
  yPosition += 5;

  // Table header
  pdf.setFillColor(245, 245, 245);
  pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, "F");
  pdf.setDrawColor(200, 200, 200);
  pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, "S");

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.text("Parameter", margin + 3, yPosition);
  pdf.text("Value", pageWidth / 2 + 10, yPosition);
  yPosition += 10;

  // Data rows
  Object.entries(data).forEach(([key, value]) => {
    checkPageBreak(12);

    const item = DESCRIPTIVE_LABELS[key];
    const label = typeof item === "object" ? item.label : item;
    const displayValue =
      typeof item === "object" && item.values
        ? item.values[value as number] || value
        : value;

    // Row background (alternating)
    const rowIndex = Object.keys(data).indexOf(key);
    if (rowIndex % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, yPosition - 6, pageWidth - 2 * margin, 9, "F");
    }

    // Border
    pdf.setDrawColor(230, 230, 230);
    pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    pdf.text(String(label), margin + 3, yPosition);

    pdf.setFont("helvetica", "bold");
    pdf.text(String(displayValue), pageWidth / 2 + 10, yPosition);

    yPosition += 9;
  });

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    "This report is for informational purposes only and should not replace professional medical advice.",
    margin,
    footerY,
  );
  pdf.text("© LiveHealthy - Health Analysis Platform", margin, footerY + 5);

  // Page numbers
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, footerY + 5);
  }

  // Download
  const fileName = `LiveHealthy_Report_${new Date().toISOString().split("T")[0]}.pdf`;
  pdf.save(fileName);
}
