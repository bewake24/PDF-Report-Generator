const fs = require("fs");
const XLSX = require("xlsx");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

// Step 1: Load the Excel file
const workbook = XLSX.readFile("students.xlsx");
const sheetName = workbook.SheetNames[0]; // Get the first sheet
const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Step 2: Function to modify an existing PDF with student data
async function generatePDF(student) {
  const { Name, Roll, Marks, Percentile } = student;
  const ID = student.Id;
  const Full_Marks = student["Full Marks"];

  // Load the existing PDF template
  const existingPdfBytes = fs.readFileSync("template.pdf");
  const pdfDoc = await PDFDocument.load(existingPdfBytes); // Load the existing PDF

  // Add a new page or access an existing one if needed
  const [page] = pdfDoc.getPages(); // Get the first page

  // Set up the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(18);

  // Draw student data on the existing PDF template
  page.drawText(`${Name}`, { x: 150, y: 270 });
  page.drawText(`${ID}`, { x: 150, y: 240 });
  page.drawText(`${Roll}`, { x: 150, y: 210 });
  page.drawText(`${Marks} / ${Full_Marks}`, { x: 150, y: 180 });
  page.drawText(`${Percentile}%`, { x: 150, y: 150 });

  // Serialize the modified PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the modified PDF with the student’s name as the filename
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

