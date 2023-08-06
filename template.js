const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');

// Function to create and return the template PDF as bytes
async function generateTemplate() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]); // Width: 600, Height: 400

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(18);

  // Draw the template content with placeholders
  page.drawText('-----------------------------', { x: 50, y: 350 });
  page.drawText('      STUDENT REPORT TEMPLATE      ', { x: 120, y: 330, size: 20 });
  page.drawText('-----------------------------', { x: 50, y: 310 });

  page.drawText('Name       : {{name}}', { x: 50, y: 270 });
  page.drawText('ID         : {{id}}', { x: 50, y: 240 });
  page.drawText('Roll No    : {{roll}}', { x: 50, y: 210 });
  page.drawText('Marks      : {{marks}} / {{full_marks}}', { x: 50, y: 180 });
  page.drawText('Percentile : {{percentile}} %', { x: 50, y: 150 });

  page.drawText('-----------------------------', { x: 50, y: 120 });

  // Save the PDF template to bytes and return them
  const pdfBytes = await pdfDoc.save();
  console.log('PDF template generated successfully!');
  return pdfBytes;
}

// Export the function
module.exports = generateTemplate;
