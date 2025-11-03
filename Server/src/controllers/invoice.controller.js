import { sql, poolPromise } from "../database/db.js";
import puppeteer from "puppeteer";

// Helper function to convert number to words (Indian format)
function numberToWords(num) {
  if (num === 0) return "Zero Only";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertLessThanThousand(n) {
    if (n === 0) return "";
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "")
      );
    return (
      units[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "")
    );
  }

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = Math.floor(num % 1000);

  let result = "";
  if (crore > 0) result += convertLessThanThousand(crore) + " Crore ";
  if (lakh > 0) result += convertLessThanThousand(lakh) + " Lakh ";
  if (thousand > 0) result += convertLessThanThousand(thousand) + " Thousand ";
  if (remainder > 0) result += convertLessThanThousand(remainder);

  return result.trim() + " Only";
}

// Helper function to convert database data to PDF format
function convertToPDFFormat(dbData) {
  const header = dbData.header;
  const products = dbData.products;

  // Calculate dispatch days
  const quotationDate = new Date(header.QuotationDate);
  const dispatchDate = new Date(header.ExpectedDispatchDate);
  const dispatchDays = Math.ceil(
    (dispatchDate - quotationDate) / (1000 * 60 * 60 * 24)
  );

  // Format date
  const formattedDate = quotationDate
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  // Calculate amount in words
  const amountInWords = numberToWords(header.GrandTotal);

  return {
    company: {
      name: "MEGA KITCHEN SYSTEM PVT LTD",
      address: "Bhavanagar Highway, Gadhka Road,",
      address2: "RK University, Tramba, Rajkot India 360020",
      mobile: "+919574638619",
      gstn: "24AAMCM2964J1Z4",
      email: "salesmegakitchensystempvtltd@gmail.com",
      website: "https://megakitchensystem.in/",
    },
    quotation: {
      number: header.SystemGeneratedId,
      date: formattedDate,
      dispatchDays: dispatchDays.toString(),
      paymentTerms: header.PaymentTerms,
    },
    billTo: {
      name: header.BillingCompanyName,
      location: `${header.BillingCity}, ${header.BillingState}`,
      contactPerson: header.LeadAssignedTo,
      mobile: header.ContactNumber,
    },
    shipTo: {
      name: header.ShippingCompanyName,
      address: header.ShippingAddress,
      city: `${header.ShippingCity} ${header.ShippingState} ${header.ShippingCountry}`,
    },
    items: products.map((product, index) => ({
      sr: index + 1,
      name: product.ProductName,
      description: product.ProductDescription || "",
      hsnCode: product.HSNCode || "",
      discount: product.Discount || 0,
      qty: product.Quantity,
      rate: product.Rate,
      tax: `${product.Tax}%`,
      basicAmount: product.BasicAmount,
    })),
    bank: {
      name: "ICICI BANK",
      accountName: "MEGA KITCHEN SYSTEM PVT LTD",
      accountNo: "015305503559",
      ifsc: "ICIC0000153",
      swift: "ICICINBBNRI",
      branch: "JAY HIND PRESS BRANCH",
    },
    salesRep: {
      name: header.QuotationBy,
      mobile: "8320029353",
      email: "dhanvi@gmail.com",
    },
    totals: {
      subtotal: header.Total,
      taxFormat: header.TaxFormat,
      sgst: header.SGST || 0,
      cgst: header.CGST || 0,
      igst: header.IGST || 0,
      grandTotal: header.GrandTotal,
      amountInWords: amountInWords,
      notes: header.Notes
    },
  };
}

// Generate HTML for the quotation
function generateQuotationHTML(type, trigger, data) {
  const hasDiscount = data.items.some((item) => item.discount > 0);

  // Generate items HTML
  const itemsHTML = data.items
    .map((item) => {
      const discountAmount =
        item.discount > 0 ? (item.rate * item.qty * item.discount) / 100 : 0;
      const netAmount = item.basicAmount - discountAmount;

      return `
            <tr class="item-row">
                <td class="text-center">${item.sr}</td>
                <td>
                    <strong>${item.name}</strong>
                    ${item.description ? "<br>" + item.description : ""}
                </td>
                <td class="text-center">${item.hsnCode}</td>
                <td class="text-center">${item.qty}</td>
                <td class="text-center">Rs. ${item.rate.toLocaleString(
                  "en-IN"
                )}.00</td>
                ${
                  hasDiscount
                    ? `<td class="text-center">${
                        item.discount > 0
                          ? `Rs. ${discountAmount.toLocaleString("en-IN")} (${
                              item.discount
                            }%)`
                          : "-"
                      }</td>`
                    : ""
                }
                <td class="text-center">${item.tax}</td>
                <td class="text-center">Rs. ${netAmount.toLocaleString(
                  "en-IN"
                )}.00</td>
            </tr>
        `;
    })
    .join("");

  // Generate tax display
  let taxHTML = "";
  if (data.totals.taxFormat === "SGST - CGST") {
    taxHTML = `
            <div class="tax-amount">(+ Add Tax) SGST: Rs. ${data.totals.sgst.toLocaleString(
              "en-IN"
            )}.00</div>
            <div class="tax-amount">(+ Add Tax) CGST: Rs. ${data.totals.cgst.toLocaleString(
              "en-IN"
            )}.00</div>
        `;
  } else if (data.totals.taxFormat === "IGST") {
    taxHTML = `<div class="tax-amount">(+ Add Tax) IGST: Rs. ${data.totals.igst.toLocaleString(
      "en-IN"
    )}.00</div>`;
  }

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            line-height: 1.3;
        }

        .quotation-container {
            width: 100%;
            background-color: white;
            //border: 1px solid #000;
        }

        .header {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border: 1px solid #000;
        }

        .logo-box {
            width: 120px;
        }

        .logo {
            width: 100%;
            height: auto;
        }

        .company-info {
            text-align: right;
            flex: 1;
        }

        .company-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
        }

        .company-details {
            font-size: 8px;
            line-height: 1.2;
        }

        .title-bar {
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 5px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-inline: 1px solid #000;
        }

        .info-cell {
            padding: 5px;
            font-size: 8px;
            border-right: 1px solid #000;
            display: flex;
            align-items: center;     /* vertical alignment */
            justify-content: left; /* horizontal alignment */
            gap: 5px;
        }

        .info-cell:last-child {
            border-right: none;
        }

        .info-label {
            font-weight: bold;
            // margin-bottom: 2px;
        }

        .parties-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border: 1px solid #000;
        }

        .party-cell {
            padding: 5px;
            font-size: 8px;
            border-right: 1px solid #000;
        }

        .party-cell:last-child {
            border-right: none;
        }

        .party-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .party-name {
            font-weight: bold;
        }

        .party-mobile {
            margin-top: 5px;
        }

        .items-section {
            padding: 20px 0px;
            border-bottom: 1px solid #000;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8px;
            height : auto;
        }

        .items-table th {
            background-color: #ffffffff;
            border: 1px solid #000;
            padding: 5px 3px;
            text-align: center;
            font-weight: bold;
            font-size: 8px;
        }

        .items-table td {
            border-left: 1px solid #000;
            border-right: 1px solid #000;
            padding: 5px 3px;
            vertical-align: top;
        }

        .items-table .item-row {
            height: 20px;
            //height: auto;
        }

        .items-table .total-row td {
          border: 1px solid #000; /* Keep all borders for total row */
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .bottom-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr 0.8fr;
            border: 1px solid #000;
        }

        .bottom-cell {
            padding: 6px;
            font-size: 7px;
            border-right: 1px solid #000;
            min-height: 70px;
        }

        .bottom-cell:last-child {
            border-right: none;
        }

        .bottom-title {
            font-weight: bold;
            font-size: 8px;
            margin-bottom: 4px;
        }

        .tax-cell {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .tax-amount {
            font-size: 8px;
            padding: 5px 0;
        }

        .grand-total {
            font-weight: bold;
            font-size: 9px;
            text-align: center;
            padding: 8px 0;
        }

        .amount-words {
            padding: 5px 8px;
            font-size: 8px;
            font-weight: bold;
            border: 1px solid #000;
        }

        .terms-section {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            min-height: 180px;
            border: 1px solid #000;
        }

        .terms-content {
            padding: 8px;
            font-size: 8px;
            line-height: 1.4;
            border-right: 1px solid #000;
        }

        .terms-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .signature-area {
            padding: 8px 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 180px; /* Adjust height as needed */
            //border-top: 1px solid #000;
        }

        .notes-section {
            width: 100%;
            height: 50px;
            padding: 5px 10px;
        }

        .notes-heading {
            font-size: 9px;
            font-weight: bold;
            text-align: left; /* left align heading */
            margin-bottom: 3px;
        }

        .notes-text {
            font-size: 8px;
            text-align: left; /* left align note text */
        }

        .signature-divider {
            width: 100%;
            border-top: 1px solid #000;
            margin: 5px 0;
        }

        .signature-text {
            font-size: 8px;
            font-weight: bold;
            text-align: center;
            margin-top: auto; /* push it to the bottom */
        }



        .footer {
            text-align: center;
            padding: 5px;
            font-size: 8px;
            font-weight: bold;
            border-top: 1px solid #000;
        }
    </style>
</head>
<body>
    <div class="quotation-container">
        <div class="header">
            <div class="logo-box">
                <img src="https://megakitchensystem.in/wp-content/uploads/2019/05/MegaSun_PNG.png" alt="MEGASUN" class="logo">
            </div>
            <div class="company-info">
                <div class="company-name">${data.company.name}</div>
                <div class="company-details">
                    ${data.company.address}<br>
                    ${data.company.address2}<br><br>
                    <strong>Mobile:</strong> ${
                      data.company.mobile
                    } | <strong>GSTN:</strong> ${data.company.gstn}<br>
                    <strong>Email:</strong> ${
                      data.company.email
                    } | <strong>Web:</strong> ${data.company.website}
                </div>
            </div>
        </div>

        <div class="title-bar">${type == "quotation" ? (trigger == "quotation" ? "SALES QUOTATION" : "PERFORMA INVOICE") : "PERFORMA INVOICE"}</div>

        <div class="info-grid">
            <div class="info-cell">
                <div class="info-label">Quotation Number:</div>
                <div>${data.quotation.number}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Date:</div>
                <div>${data.quotation.date}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Expected Dispatch Days:</div>
                <div>${data.quotation.dispatchDays}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Payment Terms:</div>
                <div>${data.quotation.paymentTerms}</div>
            </div>
        </div>

        <div class="parties-grid">
            <div class="party-cell">
                <div class="party-title">Bill To:</div>
                <div class="party-name">${data.billTo.name}</div>
                <div>${data.billTo.location}</div>
                <div class="party-mobile"><strong>Mobile:</strong> ${data.billTo.mobile}</div>
            </div>
            <div class="party-cell">
                <div class="party-title">Ship To:</div>
                <div class="party-name">${data.shipTo.name}</div>
                <div>${data.shipTo.address}</div>
                <div>${data.shipTo.city}</div>
            </div>
        </div>

          <div class="items-section">
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%;">Sr.</th>
                        <th style="width: ${
                          hasDiscount ? "30%" : "35%"
                        };">ITEM NAME</th>
                        <th style="width: 10%;">HSN CODE</th>
                        <th style="width: 8%;">QTY</th>
                        <th style="width: ${
                          hasDiscount ? "12%" : "15%"
                        };">RATE</th>
                        ${
                          hasDiscount
                            ? '<th style="width: 10%;">DISCOUNT</th>'
                            : ""
                        }
                        <th style="width: 8%;">TAX</th>
                        <th style="width: ${
                          hasDiscount ? "17%" : "19%"
                        };">BASIC AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                    <tr class="total-row">
                        <td colspan="${
                          hasDiscount ? "7" : "6"
                        }" class="text-right" style="padding-right: 10px;"><strong>Total</strong></td>
                        <td class="text-center"><strong>Rs. ${data.totals.subtotal.toLocaleString(
                          "en-IN"
                        )}.00</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="bottom-grid">
            <div class="bottom-cell">
                <div class="bottom-title">BANK DETAILS</div>
                <div><strong>Bank Name:</strong> ${data.bank.name}</div>
                <div><strong>A/C Name:</strong> ${data.bank.accountName}</div>
                <div><strong>A/C. NO.:</strong> ${data.bank.accountNo}</div>
                <div><strong>IFSC Code:</strong> ${
                  data.bank.ifsc
                } | <strong>Swift Code:</strong> ${data.bank.swift}</div>
                <div><strong>Branch:</strong> ${data.bank.branch}</div>
            </div>
            <div class="bottom-cell">
                <div class="bottom-title">SALES REPRESENTATIVE</div>
                <div><strong>Name:</strong> ${data.salesRep.name}</div>
                <div><strong>Mobile Number:</strong> ${
                  data.salesRep.mobile
                }</div>
                
            </div>
            <div class="bottom-cell tax-cell">
                ${taxHTML}
                <div class="grand-total">GRAND TOTAL: Rs. ${data.totals.grandTotal.toLocaleString(
                  "en-IN"
                )}.00</div>
            </div>
        </div>

        <div class="amount-words">
            Amount In Words (INR): ${data.totals.amountInWords}
        </div>

        <div class="terms-section">
            <div class="terms-content">
                <div class="terms-title">TERMS & CONDITIONS</div>
                <div>
                    (1) 100% Advance Payment At The Time Of Placing Order.<br><br>
                    (2) Price Ex Our Workshop<br><br>
                    (3) Once The Order Is Placed It Can Not Be Cancelled<br><br>
                    (4) Rates Are Ex Factory And The Gov. Taxes Ruling At The Of Delivery Will Be Charged<br><br>
                    (5) Subject To Rajkot Jurisdiction Only.<br><br>
                    (6) The Good Will Be Dispatched carefully In sound packing But WE Are Not Responsible for Any Damage Or loss in Transit.<br><br>
                    (7) Government Tax, Transport, Loading insurance charged will Be Extra.<br><br>
                    (8) This Price Is Valid For 15 Days.
                </div>
            </div>
            <div class="signature-area">
                <div class="notes-section">
                    <div class="notes-heading">Notes:</div>
                    <div class="notes-text">${data.totals.notes}</div>
                </div>
                <div class="signature-divider"></div>
                <div class="signature-text">(Authorised Signatory)</div>
            </div>

        </div>

        <div class="footer">
            ** This Is A Computer Generated Quotation **
        </div>
    </div>
</body>
</html>`;
}

// Main controller function
export const getQuotationPdf = async (req, res, next) => {
  let browser;

  try {
    const quotationId = req.params.id;
    const type = req.query.type;
    const trigger = req.query.triggerFrom;

    // Fetch data from database
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Id", sql.UniqueIdentifier, quotationId)
      .input("Type", sql.NVarChar, type)
      .execute("sp_GetPDFByID");

    const recordsets = result.recordsets || [];
    //console.log(recordsets);
    const headerRows = recordsets[0] || [];
    const productRows = recordsets[1] || [];
    const header = headerRows[0];
    const products = productRows;

    if (!header) {
      return res
        .status(404)
        .json({ message: "No quotation found for the given id" });
    }

    // Convert data to format needed for HTML
    const quotationData = convertToPDFFormat({ header, products });

    // Generate HTML
    const html = generateQuotationHTML(type, trigger ,quotationData);

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set content
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    // Close browser
    await browser.close();
    browser = null;

    // Set response headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=quotation-${quotationData.quotation.number}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", pdfBuffer.length);

    // Send PDF
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error in fetching quotation details pdf by Id:", err);

    // Ensure browser is closed on error
    if (browser) {
      await browser.close().catch(console.error);
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};
