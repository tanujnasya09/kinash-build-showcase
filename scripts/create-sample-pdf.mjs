import fs from 'fs';
import path from 'path';

// Generate a valid, clean PDF 1.4 document
function generatePdf() {
  const content = [
    "%PDF-1.4",
    "1 0 obj",
    "<< /Type /Catalog /Pages 2 0 R >>",
    "endobj",
    "2 0 obj",
    "<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>",
    "endobj",
    // Page 1
    "3 0 obj",
    "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /MediaBox [0 0 595.28 841.89] /Contents 7 0 R >>",
    "endobj",
    // Page 2
    "4 0 obj",
    "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /MediaBox [0 0 595.28 841.89] /Contents 8 0 R >>",
    "endobj",
    // Fonts
    "5 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "endobj",
    "6 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "endobj",
    // Page 1 Content Stream
    "7 0 obj",
    null, // placeholder
    "endobj",
    // Page 2 Content Stream
    "8 0 obj",
    null, // placeholder
    "endobj"
  ];

  const stream1 = `
q
0 0 0 rg
0.875 0.729 0.282 RG
2 w
36 805 m 559 805 l S
BT
/F1 18 Tf
36 780 Td
(APEX LUXURY REAL ESTATE & ARCHITECTURAL CONTRACTING) Tj
ET
BT
/F2 9 Tf
36 765 Td
(CONFIDENTIAL PRIVATE CLIENT PROSPECTUS // DOSSIER REF: APX-2026-VILLA) Tj
ET
BT
/F1 24 Tf
36 700 Td
(ARCHITECTURAL PORTFOLIO SPECIFICATION) Tj
ET
BT
/F2 12 Tf
0 0 0 rg
36 670 Td
(Ultra-Prime Residential & Commercial Estate Portfolio) Tj
36 650 Td
(Location: Dehradun & Himalayan Foothills Prime Corridor) Tj
36 630 Td
(Valuation Range: INR 2.0 Cr - 50.0 Cr | USD $250,000 - $6,000,000) Tj
ET
q
0.96 0.95 0.93 rg
36 400 523 200 re f
0.875 0.729 0.282 RG
1 w
36 400 523 200 re S
Q
BT
/F1 13 Tf
0 0 0 rg
50 575 Td
(CORE ARCHITECTURAL ATTRIBUTES) Tj
/F2 10 Tf
50 550 Td
(- Seismic Zone IV / V Earthquake Resistant Reinforced Concrete Frame) Tj
50 530 Td
(- 4.2 Meter Double-Height Ceilings in Grand Living Pavilions) Tj
50 510 Td
(- Thermally Broken Double-Glazed Low-E Acoustic Windows) Tj
50 490 Td
(- Italian Calacatta Gold Marble Flooring & Solid Teak Architectural Millwork) Tj
50 470 Td
(- 100% DG Power Backup, Sub-Zero & Wolf Kitchens, Private Heated Infinity Pool) Tj
50 445 Td
(- Gated 24/7 Multi-Tier Biometric Security & Smart Home Automation) Tj
ET
BT
/F2 10 Tf
36 340 Td
(CIVIL ENGINEERING & TITLE VERIFICATION) Tj
36 320 Td
(100% Clear Title Guaranteed. Freehold Registration Transfer with Complete Municipal) Tj
36 305 Td
(Sanctions, MDDA Approvals, and Environmental Clearances in Place.) Tj
ET
BT
/F1 11 Tf
36 240 Td
(EXECUTIVE BROKERAGE & ARCHITECTURAL INQUIRIES) Tj
/F2 10 Tf
36 220 Td
(Apex Luxury Estates | Tel: +91 79068 78912 | inquiries@apexluxuryestates.com) Tj
36 205 Td
(Corporate HQ: Apex Tower, Rajpur Road, Dehradun, Uttarakhand, India) Tj
ET
q
0.875 0.729 0.282 RG
1 w
36 50 m 559 50 l S
Q
BT
/F2 8 Tf
36 35 Td
(Page 1 of 2 // Strictly Confidential // Apex Luxury Real Estate & Contracting) Tj
ET
Q
`;

  const stream2 = `
q
0.875 0.729 0.282 RG
2 w
36 805 m 559 805 l S
BT
/F1 18 Tf
36 780 Td
(APEX LUXURY // BLUEPRINT & SITE METRICS) Tj
ET
BT
/F2 9 Tf
36 765 Td
(ARCHITECTURAL DRAWING SPECIFICATIONS // A-101 & L-001) Tj
ET
BT
/F1 14 Tf
36 710 Td
(LEVEL 01 & 02 SPACE CONFIGURATION) Tj
/F2 10 Tf
36 685 Td
(1. Grand Living Pavilion: 28'-6" x 22'-0" [8.69m x 6.70m] - Double Height Void) Tj
36 665 Td
(2. Formal Dining Salon: 18'-0" x 15'-0" [5.48m x 4.57m] - Seats 14) Tj
36 645 Td
(3. Primary Master Suite: 24'-0" x 18'-6" [7.32m x 5.64m] - Walk-in Robe & Spa Ensuite) Tj
36 625 Td
(4. Guest Suites (01-03): Private Balconies & Marble Ensuite Bathrooms) Tj
36 605 Td
(5. Executive Study / Library: Acoustic Teak Millwork & Garden Vistas) Tj
36 585 Td
(6. Heated Infinity Lap Pool: 15.0m x 5.2m with Saltwater Filtration) Tj
36 565 Td
(7. Covered Portico: 3 Full-Size Luxury SUVs with EV Level 2 Fast Charging) Tj
ET
BT
/F1 13 Tf
36 510 Td
(FINANCIAL & ACQUISITION GUIDANCE) Tj
/F2 10 Tf
36 485 Td
(- Acquisition Structure: Outright Registry Transfer / Bespoke Construction Contract) Tj
36 465 Td
(- Recommended Private Wealth Allocation: 25% Equity Down Payment) Tj
36 445 Td
(- Projected Capital Appreciation: 8.5% - 11.2% CAGR over 5-Year Horizon) Tj
36 425 Td
(- Advisory: Comprehensive Tax & NRI Remittance Assistance Provided by Apex Legal) Tj
ET
q
0.96 0.95 0.93 rg
36 240 523 120 re f
0.875 0.729 0.282 RG
1 w
36 240 523 120 re S
Q
BT
/F1 11 Tf
50 335 Td
(AUTHENTICATION & VERIFICATION SEAL) Tj
/F2 9 Tf
50 315 Td
(Verified by: Apex Director of Civil Architecture & Construction) Tj
50 300 Td
(Managing Partner: Tanuj Nasya // Apex Luxury Advisory) Tj
50 280 Td
(Official Seal: [APEX CERTIFIED LUXURY STANDARD - RERA APPROVED]) Tj
50 260 Td
(Date of Dossier Release: October 2026 // Version 2.0 Pro) Tj
ET
q
0.875 0.729 0.282 RG
1 w
36 50 m 559 50 l S
Q
BT
/F2 8 Tf
36 35 Td
(Page 2 of 2 // Strictly Confidential // Apex Luxury Real Estate & Contracting) Tj
ET
Q
`;

  const s1Buffer = Buffer.from(stream1.trim(), 'utf-8');
  const s2Buffer = Buffer.from(stream2.trim(), 'utf-8');

  content[12] = `7 0 obj\n<< /Length ${s1Buffer.length} >>\nstream\n${s1Buffer.toString('utf-8')}\nendstream\nendobj`;
  content[14] = `8 0 obj\n<< /Length ${s2Buffer.length} >>\nstream\n${s2Buffer.toString('utf-8')}\nendstream\nendobj`;

  // Calculate byte offsets
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  
  // Obj 1
  offsets.push(pdf.length);
  pdf += content[1] + "\n" + content[2] + "\n" + content[3] + "\n";
  
  // Obj 2
  offsets.push(pdf.length);
  pdf += content[4] + "\n" + content[5] + "\n" + content[6] + "\n";

  // Obj 3
  offsets.push(pdf.length);
  pdf += content[7] + "\n" + content[8] + "\n" + content[9] + "\n";

  // Obj 4
  offsets.push(pdf.length);
  pdf += content[10] + "\n" + content[11] + "\n" + content[12] + "\n";

  // Obj 5
  offsets.push(pdf.length);
  pdf += content[13] + "\n" + content[14] + "\n" + content[15] + "\n";

  // Obj 6
  offsets.push(pdf.length);
  pdf += content[16] + "\n" + content[17] + "\n" + content[18] + "\n";

  // Obj 7
  offsets.push(pdf.length);
  pdf += content[12] + "\n";

  // Obj 8
  offsets.push(pdf.length);
  pdf += content[14] + "\n";

  const xrefOffset = pdf.length;
  pdf += "xref\n0 9\n0000000000 65535 f \n";
  for (const off of offsets) {
    pdf += off.toString().padStart(10, '0') + " 00000 n \n";
  }
  pdf += "trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF\n";

  const outputPath = path.resolve('public/assets/Apex-Luxury-Property-Prospectus.pdf');
  fs.writeFileSync(outputPath, pdf, 'binary');
  console.log('PDF generated at:', outputPath, 'Size:', fs.statSync(outputPath).size);
}

generatePdf();
