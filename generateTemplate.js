const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createPDFTemplate() {
  // Step 1: Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Step 2: Add a page to the document
  const page = pdfDoc.addPage([600, 400]); // Width: 600, Height: 400

  // Step 3: Set up the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(18);

  // Step 4: Draw the template content (with placeholders)
  page.drawText('-----------------------------', { x: 50, y: 350 });
  page.drawText('      STUDENT REPORT TEMPLATE      ', { x: 120, y: 330, size: 20 });
  page.drawText('-----------------------------', { x: 50, y: 310 });

  page.drawText('Name       : ', { x: 50, y: 270 });
  page.drawText('ID         : ', { x: 50, y: 240 });
  page.drawText('Roll No    : ', { x: 50, y: 210 });
  page.drawText('Marks      : ', { x: 50, y: 180 });
  page.drawText('Percentile : ', { x: 50, y: 150 });

  page.drawText('-----------------------------', { x: 50, y: 120 });

  // Step 5: Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Step 6: Save the PDF template to a file
  fs.writeFileSync('template.pdf', pdfBytes);
  console.log('PDF template created successfully!');
}

// Call the function to create the template
createPDFTemplate().catch((err) => console.error('Error creating PDF template:', err));
