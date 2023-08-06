const fs = require("fs");
const XLSX = require("xlsx");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

// Step 1: Load the Excel file
const workbook = XLSX.readFile("students.xlsx");
const sheetName = workbook.SheetNames[0]; // Get the first sheet
const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Step 2: Function to generate a PDF for a student using the template
async function generatePDF(student) {
  const { Name, Roll, Marks, Percentile } = student;
  const ID = student.Id;
  const Full_Marks = student["Full Marks"];

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the PDF
  const page = pdfDoc.addPage([600, 400]);

  // Set up the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(18);

  // Draw the template content (with placeholders)
  page.drawText("-----------------------------", { x: 200, y: 330 });
  page.drawText('Student Report', { x: 200, y: 350, size: 25, color: rgb(0, 0, 0) });
  page.drawText(`Name       : ${Name}`, { x: 50, y: 300 });
  page.drawText(`ID         : ${ID}`, { x: 50, y: 270 });
  page.drawText(`Roll No    : ${Roll}`, { x: 50, y: 240 });
  page.drawText(`Marks      : ${Marks} / ${Full_Marks}`, { x: 50, y: 210 });
  page.drawText(`Percentile : ${Percentile}%`, { x: 50, y: 180 });
  page.drawText("-----------------------------", { x: 50, y: 120 });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the PDF with the student’s name as the filename
  const filePath = `./reports/${Name}_Report.pdf`;
  fs.writeFileSync(filePath, pdfBytes);
  console.log(`Report generated for ${Name}`);
}

// Step 3: Generate PDFs for all students in the Excel sheet
async function generateAllReports() {
  // Create a 'reports' directory if it doesn't exist
  if (!fs.existsSync("./reports")) {
    fs.mkdirSync("./reports");
  }

  // Generate a PDF for each student
  for (const student of sheetData) {
    await generatePDF(student);
  }
}

// Call the function to generate all reports
generateAllReports().catch((err) =>
  console.error("Error generating reports:", err)
);
