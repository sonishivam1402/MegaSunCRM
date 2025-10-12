import { sql, poolPromise } from "../database/db.js";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from 'axios';

let logoCache = null; // Cache at module level

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function getLogoBuffer() {
    if (logoCache) {
        return logoCache;
    }

    const logoUrl = 'https://megakitchensystem.in/wp-content/uploads/2019/05/MegaSun_PNG.png';
    const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
    logoCache = Buffer.from(response.data);
    return logoCache;
}

// Helper function to convert database data to PDF format
function convertToPDFFormat(dbData) {
    const header = dbData.header;
    const products = dbData.products;

    // Calculate dispatch days
    const quotationDate = new Date(header.QuotationDate);
    const dispatchDate = new Date(header.ExpectedDispatchDate);
    const dispatchDays = Math.ceil((dispatchDate - quotationDate) / (1000 * 60 * 60 * 24));

    // Format date
    const formattedDate = quotationDate.toLocaleDateString('en-GB').replace(/\//g, '-');

    // Calculate amount in words
    const amountInWords = numberToWords(header.GrandTotal);

    return {
        company: {
            name: "MEGA KITCHEN SYSTEM PVT LTD",
            address: "Bhavanagar Highway, Gadhka Road,",
            address2: "RK University, Tramba, Rajkot India 360020",
            mobile: "+919574638619",
            gstn: "24AAMCM2964J1Z4",
            email: "megakitchensystempvtltd@gmail.com",
            website: "https://megakitchensystem.in/"
        },
        quotation: {
            number: header.SystemGeneratedId,
            date: formattedDate,
            dispatchDays: dispatchDays.toString(),
            paymentTerms: header.PaymentTerms
        },
        billTo: {
            name: header.BillingCompanyName,
            location: `${header.BillingCity}, ${header.BillingState}`,
            contactPerson: header.LeadAssignedTo,
            mobile: header.ContactNumber
        },
        shipTo: {
            name: header.ShippingCompanyName,
            address: header.ShippingAddress,
            city: `${header.ShippingCity} ${header.ShippingState} ${header.ShippingCountry}`
        },
        items: products.map((product, index) => ({
            sr: index + 1,
            name: product.ProductName,
            hsnCode: product.HSNCode || "",
            discount: product.Discount,
            qty: product.Quantity,
            rate: product.Rate,
            tax: `${product.Tax}%`,
            basicAmount: product.BasicAmount
        })),
        bank: {
            name: "ICICI BANK",
            accountName: "MEGA KITCHEN SYSTEM PVT LTD",
            accountNo: "015305503559",
            ifsc: "ICIC0000153",
            swift: "ICICINBBNRI",
            branch: "JAY HIND PRESS BRANCH"
        },
        salesRep: {
            name: header.QuotationBy,
            mobile: "8320029353",
            email: "dhanvi@gmail.com"
        },
        totals: {
            subtotal: header.Total,
            taxFormat: header.TaxFormat,
            sgst: header.SGST,
            cgst: header.CGST,
            igst: header.IGST,
            grandTotal: header.GrandTotal,
            amountInWords: amountInWords
        }
    };
}

// Helper function to convert number to words (Indian format)
function numberToWords(num) {
    if (num === 0) return "Zero Only";

    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convertLessThanThousand(n) {
        if (n === 0) return "";
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
        return units[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "");
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

export const getQuotationPdf = async (req, res, next) => {
    try {
        const quotationId = req.params.id;
        const type = req.query.type;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Id", sql.UniqueIdentifier, quotationId)
            .input("Type", sql.NVarChar, type)
            .execute("sp_GetPDFByID");

        //console.log("result", result.recordsets);
        // Map DB resultsets into expected shape for PDF conversion
        const recordsets = result.recordsets || [];
        const headerRows = recordsets[0] || [];
        const productRows = recordsets[1] || [];
        const header = headerRows[0];
        const products = productRows;

        if (!header) {
            return res.status(404).json({ message: "No quotation found for the given id" });
        }

        const quotationData = convertToPDFFormat({ header, products });

        res.setHeader("Content-Disposition", `attachment; filename=quotation-${quotationData.quotation.number}.pdf`);
        res.setHeader("Content-Type", "application/pdf");

        const doc = new PDFDocument({
            margin: 30,
            size: 'A4'
        });

        doc.pipe(res);

        const pageWidth = doc.page.width - 60;
        const leftMargin = 30;
        const rightMargin = doc.page.width - 30;
        let yPos = 30;

        // Logo area (left side)
        try {
            const imageBuffer = await getLogoBuffer();
            doc.image(imageBuffer, leftMargin, yPos, { width: 100, height: 50 });
        } catch (error) {
            console.log('Error loading logo:', error.message);
            doc.rect(leftMargin, yPos, 100, 50).stroke();
            doc.fontSize(10).font('Helvetica-Bold').text('MEGASUN', leftMargin + 30, yPos + 20);
        }

        // Company name and details (right side)
        doc.fontSize(14).font('Helvetica-Bold')
            .text(quotationData.company.name, leftMargin + 120, yPos, {
                width: pageWidth - 120,
                align: 'right'
            });

        yPos += 18;
        doc.fontSize(8).font('Helvetica')
            .text(quotationData.company.address, leftMargin + 120, yPos, {
                width: pageWidth - 120,
                align: 'right'
            });

        yPos += 10;
        doc.text(quotationData.company.address2, leftMargin + 120, yPos, {
            width: pageWidth - 120,
            align: 'right'
        });

        yPos += 12;
        doc.text(`Mobile: ${quotationData.company.mobile} | GSTN: ${quotationData.company.gstn}`, leftMargin + 120, yPos, {
            width: pageWidth - 120,
            align: 'right'
        });

        yPos += 10;
        doc.text(`Email: ${quotationData.company.email} | Web: ${quotationData.company.website}`, leftMargin + 120, yPos, {
            width: pageWidth - 120,
            align: 'right'
        });

        yPos += 20;

        // Black header for "SALES QUOTATION"
        doc.rect(leftMargin, yPos, pageWidth, 20).fillAndStroke('#000000', '#000000');
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#ffffff')
            .text(type === 'quotation' ? 'SALES QUOTATION' : 'PERFORMA INVOICE', leftMargin, yPos + 5, {
                width: pageWidth,
                align: 'center'
            });

        yPos += 20;
        doc.fillColor('#000000');

        // Quotation Details Box - Four columns in one row
        const detailsHeight = 30;
        doc.rect(leftMargin, yPos, pageWidth, detailsHeight).stroke();

        const col1Width = pageWidth * 0.25;
        const col2Width = pageWidth * 0.25;
        const col3Width = pageWidth * 0.25;
        const col4Width = pageWidth * 0.25;

        // Vertical lines
        doc.moveTo(leftMargin + col1Width, yPos).lineTo(leftMargin + col1Width, yPos + detailsHeight).stroke();
        doc.moveTo(leftMargin + col1Width + col2Width, yPos).lineTo(leftMargin + col1Width + col2Width, yPos + detailsHeight).stroke();
        doc.moveTo(leftMargin + col1Width + col2Width + col3Width, yPos).lineTo(leftMargin + col1Width + col2Width + col3Width, yPos + detailsHeight).stroke();

        doc.fontSize(7).font('Helvetica-Bold')
            .text('Quotation Number:', leftMargin + 3, yPos + 3, { width: col1Width - 6 })
            .text('Date:', leftMargin + col1Width + 3, yPos + 3, { width: col2Width - 6 })
            .text('Expected Dispatch Days:', leftMargin + col1Width + col2Width + 3, yPos + 3, { width: col3Width - 6 })
            .text('Payment Terms:', leftMargin + col1Width + col2Width + col3Width + 3, yPos + 3, { width: col4Width - 6 });

        doc.fontSize(7).font('Helvetica')
            .text(quotationData.quotation.number, leftMargin + 3, yPos + 13, { width: col1Width - 6 })
            .text(quotationData.quotation.date, leftMargin + col1Width + 3, yPos + 13, { width: col2Width - 6 })
            .text(quotationData.quotation.dispatchDays, leftMargin + col1Width + col2Width + 3, yPos + 13, { width: col3Width - 6 })
            .text(quotationData.quotation.paymentTerms, leftMargin + col1Width + col2Width + col3Width + 3, yPos + 13, { width: col4Width - 6 });

        yPos += detailsHeight;

        // Bill To and Ship To Headers (in one row with border)
        const headerHeight = 15;
        doc.rect(leftMargin, yPos, pageWidth, headerHeight).stroke();
        doc.moveTo(leftMargin + pageWidth / 2, yPos).lineTo(leftMargin + pageWidth / 2, yPos + headerHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text('Bill To:', leftMargin + 3, yPos + 4)
            .text('Ship To:', leftMargin + pageWidth / 2 + 3, yPos + 4);

        yPos += headerHeight;

        // Bill To and Ship To Details
        const detailsBoxHeight = 45;
        doc.rect(leftMargin, yPos, pageWidth, detailsBoxHeight).stroke();
        doc.moveTo(leftMargin + pageWidth / 2, yPos).lineTo(leftMargin + pageWidth / 2, yPos + detailsBoxHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text(quotationData.billTo.name, leftMargin + 3, yPos + 3);
        doc.font('Helvetica')
            .text(quotationData.billTo.location, leftMargin + 3, yPos + 13)
            .text(`Contact Person: ${quotationData.billTo.contactPerson}`, leftMargin + 3, yPos + 23)
            .text(`Mobile: ${quotationData.billTo.mobile}`, leftMargin + 3, yPos + 33);

        doc.font('Helvetica-Bold')
            .text(quotationData.shipTo.name, leftMargin + pageWidth / 2 + 3, yPos + 3);
        doc.font('Helvetica')
            .text(quotationData.shipTo.address, leftMargin + pageWidth / 2 + 3, yPos + 13)
            .text(quotationData.shipTo.city, leftMargin + pageWidth / 2 + 3, yPos + 23);

        yPos += detailsBoxHeight;

        // Check if any item has a discount
        const hasDiscount = quotationData.items.some(item => item.discount > 0);

        // Items Table Header
        const tableHeaderHeight = 20;
        doc.rect(leftMargin, yPos, pageWidth, tableHeaderHeight).stroke();

        const srWidth = 25;
        const itemWidth = hasDiscount ? 182.5 : 220; // Reduce item width if discount exists
        const hsnWidth = 60;
        const qtyWidth = 30;
        const rateWidth = 70;
        const discountWidth = hasDiscount ? 70 : 0; // Add discount column width conditionally
        const taxWidth = 30;
        const amountWidth = pageWidth - srWidth - itemWidth - hsnWidth - qtyWidth - rateWidth - discountWidth - taxWidth;

        let xPos = leftMargin;

        // Draw vertical lines for table header
        doc.moveTo(xPos + srWidth, yPos).lineTo(xPos + srWidth, yPos + tableHeaderHeight).stroke();
        xPos += srWidth;
        doc.moveTo(xPos + itemWidth, yPos).lineTo(xPos + itemWidth, yPos + tableHeaderHeight).stroke();
        xPos += itemWidth;
        doc.moveTo(xPos + hsnWidth, yPos).lineTo(xPos + hsnWidth, yPos + tableHeaderHeight).stroke();
        xPos += hsnWidth;
        doc.moveTo(xPos + qtyWidth, yPos).lineTo(xPos + qtyWidth, yPos + tableHeaderHeight).stroke();
        xPos += qtyWidth;
        doc.moveTo(xPos + rateWidth, yPos).lineTo(xPos + rateWidth, yPos + tableHeaderHeight).stroke();
        xPos += rateWidth;

        // Add discount column line if applicable
        if (hasDiscount) {
            doc.moveTo(xPos + discountWidth, yPos).lineTo(xPos + discountWidth, yPos + tableHeaderHeight).stroke();
            xPos += discountWidth;
        }

        doc.moveTo(xPos + taxWidth, yPos).lineTo(xPos + taxWidth, yPos + tableHeaderHeight).stroke();

        // Table headers
        doc.fontSize(8).font('Helvetica-Bold')
            .text('Sr.', leftMargin + 2, yPos + 6, { width: srWidth - 4, align: 'center' })
            .text('ITEM NAME', leftMargin + srWidth + 5, yPos + 6, { width: itemWidth - 4, align: 'left' })
            .text('HSN CODE', leftMargin + srWidth + itemWidth + 2, yPos + 6, { width: hsnWidth - 4, align: 'center' })
            .text('QTY', leftMargin + srWidth + itemWidth + hsnWidth + 2, yPos + 6, { width: qtyWidth - 4, align: 'center' })
            .text('RATE', leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + 2, yPos + 6, { width: rateWidth - 4, align: 'center' });

        // Add discount header if applicable
        if (hasDiscount) {
            doc.text('DISCOUNT', leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + 2, yPos + 6, { width: discountWidth - 4, align: 'center' });
        }

        doc.text('TAX', leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + 2, yPos + 6, { width: taxWidth - 4, align: 'center' })
            .text('BASIC AMOUNT', leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + taxWidth + 2, yPos + 6, { width: amountWidth - 4, align: 'center' });

        yPos += tableHeaderHeight;

        // Items - Large box for all items
        const itemsBoxHeight = 200;
        doc.rect(leftMargin, yPos, pageWidth, itemsBoxHeight).stroke();

        // Draw vertical lines for entire items box
        xPos = leftMargin;
        doc.moveTo(xPos + srWidth, yPos).lineTo(xPos + srWidth, yPos + itemsBoxHeight).stroke();
        xPos += srWidth;
        doc.moveTo(xPos + itemWidth, yPos).lineTo(xPos + itemWidth, yPos + itemsBoxHeight).stroke();
        xPos += itemWidth;
        doc.moveTo(xPos + hsnWidth, yPos).lineTo(xPos + hsnWidth, yPos + itemsBoxHeight).stroke();
        xPos += hsnWidth;
        doc.moveTo(xPos + qtyWidth, yPos).lineTo(xPos + qtyWidth, yPos + itemsBoxHeight).stroke();
        xPos += qtyWidth;
        doc.moveTo(xPos + rateWidth, yPos).lineTo(xPos + rateWidth, yPos + itemsBoxHeight).stroke();
        xPos += rateWidth;

        // Add discount column line if applicable
        if (hasDiscount) {
            doc.moveTo(xPos + discountWidth, yPos).lineTo(xPos + discountWidth, yPos + itemsBoxHeight).stroke();
            xPos += discountWidth;
        }

        doc.moveTo(xPos + taxWidth, yPos).lineTo(xPos + taxWidth, yPos + itemsBoxHeight).stroke();

        // Add items
        let itemYPos = yPos + 5;
        quotationData.items.forEach((item) => {
            doc.fontSize(8).font('Helvetica')
                .text(item.sr, leftMargin + 2, itemYPos, { width: srWidth - 4, align: 'center' })
                .text(item.name, leftMargin + srWidth + 5, itemYPos, { width: itemWidth - 4 })
                .text(item.hsnCode, leftMargin + srWidth + itemWidth + 2, itemYPos, { width: hsnWidth - 4, align: 'center' })
                .text(item.qty, leftMargin + srWidth + itemWidth + hsnWidth + 2, itemYPos, { width: qtyWidth - 4, align: 'center' })
                .text(`Rs. ${item.rate.toLocaleString('en-IN')}.00`, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + 2, itemYPos, { width: rateWidth - 4, align: 'center' });

            // Add discount column data if applicable
            if (hasDiscount) {
                if (item.discount > 0) {
                    const discountAmount = (item.rate * item.qty * item.discount) / 100;
                    doc.fontSize(8)
                    .text(`Rs. ${discountAmount.toLocaleString('en-IN')} (${item.discount}%)`, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + 2, itemYPos, { width: discountWidth - 4, align: 'center' });
                        // .text(`(${item.discount}%)`, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + 2, itemYPos + 8, { width: discountWidth - 4, align: 'center' });
                } else {
                    doc.fontSize(8).text('-', leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + 2, itemYPos, { width: discountWidth - 4, align: 'center' });
                }
            }
            
            // Calculate net amount (applies whether discount exists or not)
            const discountAmount = item.discount > 0 ? (item.rate * item.qty * item.discount) / 100 : 0;
            const netAmount = item.basicAmount - discountAmount;
            
            // Always render TAX and AMOUNT columns (outside the discount condition)
            doc.fontSize(8)
                .text(item.tax, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + 2, itemYPos, { width: taxWidth - 4, align: 'center' })
                .text(`Rs. ${netAmount.toLocaleString('en-IN')}.00`, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + taxWidth + 2, itemYPos, { width: amountWidth - 4, align: 'center' });
            itemYPos += 15;
        });

        yPos += itemsBoxHeight;

        // Total row
        const totalRowHeight = 15;
        doc.rect(leftMargin, yPos, pageWidth, totalRowHeight).stroke();
        doc.moveTo(leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + taxWidth, yPos)
            .lineTo(leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + taxWidth, yPos + totalRowHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text('Total ', leftMargin + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + 10, yPos + 3, { width: taxWidth, align: 'right' })
            .text(`Rs. ${quotationData.totals.subtotal.toLocaleString('en-IN')}.00`, leftMargin + srWidth + itemWidth + hsnWidth + qtyWidth + rateWidth + discountWidth + taxWidth + 2, yPos + 3, { width: amountWidth - 4, align: 'center' });

        yPos += totalRowHeight + 5;

        // Bottom section - 3 sections: Bank Details, Sales Rep, Tax info
        const bottomSectionHeight = 65;
        const sectionWidth = pageWidth / 3; // Divide into 3 equal sections

        // Section 1 - Bank Details
        doc.rect(leftMargin, yPos, sectionWidth, bottomSectionHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text('BANK DETAILS', leftMargin + 3, yPos + 3);

        doc.fontSize(7).font('Helvetica')
            .text(`Bank Name: ${quotationData.bank.name}`, leftMargin + 3, yPos + 13)
            .text(`A/C Name: ${quotationData.bank.accountName}`, leftMargin + 3, yPos + 21)
            .text(`A/C. NO.: ${quotationData.bank.accountNo}`, leftMargin + 3, yPos + 29)
            .text(`IFSC Code: ${quotationData.bank.ifsc}`, leftMargin + 3, yPos + 37)
            .text(`Swift Code: ${quotationData.bank.swift}`, leftMargin + 3, yPos + 45)
            .text(`Branch: ${quotationData.bank.branch}`, leftMargin + 3, yPos + 53);

        // Section 2 - Sales Representative
        const salesRepStart = leftMargin + sectionWidth;
        doc.rect(salesRepStart, yPos, sectionWidth, bottomSectionHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text('SALES REPRESENTATIVE', salesRepStart + 3, yPos + 3);

        doc.fontSize(7).font('Helvetica')
            .text(`Name: ${quotationData.salesRep.name}`, salesRepStart + 3, yPos + 13)
            .text(`Mobile Number: ${quotationData.salesRep.mobile}`, salesRepStart + 3, yPos + 21)
            .text(`Email Address: ${quotationData.salesRep.email}`, salesRepStart + 3, yPos + 29);

        // Section 3 - Tax Info (2 rows)
        const taxInfoStart = leftMargin + (sectionWidth * 2);
        const taxRowHeight = bottomSectionHeight / 2; // Split into 2 equal rows

        // Tax row
        doc.rect(taxInfoStart, yPos, sectionWidth, taxRowHeight).stroke();
        const taxLineHeight = 10; // Adjust this value based on your font size
        let taxCenterY = yPos + 5; // Start position with some padding

        doc.fontSize(7).font('Helvetica');

        if (quotationData.totals.taxFormat === 'SGST - CGST') {
            doc.text(`(+ Add Tax) SGST: Rs. ${quotationData.totals.sgst.toLocaleString('en-IN')}.00`, taxInfoStart + 3, taxCenterY, { width: sectionWidth - 6, align: 'center' });
            taxCenterY += taxLineHeight;

            doc.text(`(+ Add Tax) CGST: Rs. ${quotationData.totals.cgst.toLocaleString('en-IN')}.00`, taxInfoStart + 3, taxCenterY, { width: sectionWidth - 6, align: 'center' });
        } else if (quotationData.totals.taxFormat === 'IGST') {
            doc.text(`(+ Add Tax) IGST: Rs. ${quotationData.totals.igst.toLocaleString('en-IN')}.00`, taxInfoStart + 3, taxCenterY, { width: sectionWidth - 6, align: 'center' });
        }

        // Grand Total row
        const grandTotalYPos = yPos + taxRowHeight;
        doc.rect(taxInfoStart, grandTotalYPos, sectionWidth, taxRowHeight).stroke();
        const grandTotalCenterY = grandTotalYPos + (taxRowHeight / 2) - 4; // Center vertically
        doc.fontSize(9).font('Helvetica-Bold')
            .text(`GRAND TOTAL: Rs. ${quotationData.totals.grandTotal.toLocaleString('en-IN')}.00`, taxInfoStart + 3, grandTotalCenterY, { width: sectionWidth - 6, align: 'center' });

        yPos += bottomSectionHeight + 5;

        // Amount in Words
        doc.rect(leftMargin, yPos, pageWidth, 15).stroke();
        doc.fontSize(7).font('Helvetica')
            .text(`Amount In Words (INR): ${quotationData.totals.amountInWords}`, leftMargin + 3, yPos + 4);

        yPos += 20;

        // Terms & Conditions
        const termsHeight = 130;
        doc.rect(leftMargin, yPos, pageWidth, termsHeight).stroke();

        doc.fontSize(8).font('Helvetica-Bold')
            .text('TERMS & CONDITIONS', leftMargin + 3, yPos + 3);

        const terms = [
            '(1) 100% Advance Payment At The Time Of Placing Order.',
            '(2) Price Ex Our Workshop',
            '(3) Once The Order Is Placed It Can Not Be Cancelled',
            '(4) Rates Are Ex Factory And The Gov. Taxes Ruling At The Of Delivery Will Be Charged',
            '(5) Subject To Rajkot Jurisdiction Only.',
            '(6) The Good Will Be Dispatched carefully In sound packing But WE Are Not Responsible for Any Damage Or loss in Transit.',
            '',
            '(7) Government Tax, Transport, Loading insurance charged will Be Extra.',
            '(8) This Price Is Valid For 15 Days.'
        ];

        let termsY = yPos + 13;
        doc.fontSize(7).font('Helvetica');
        terms.forEach(term => {
            doc.text(term, leftMargin + 3, termsY, { width: pageWidth * 0.6 });
            termsY += 12;
        });

        // Logo in terms section
        if (type === 'quotation') {
            try {
                const imageBuffer = await getLogoBuffer();
                doc.image(imageBuffer, leftMargin + pageWidth * 0.7, yPos + 60, { width: 80, height: 40 });
            } catch (error) {
                // Fallback to text if image not found
                doc.rect(leftMargin + pageWidth * 0.7, yPos + 60, 80, 40).stroke();
                doc.fontSize(10).font('Helvetica-Bold').text('MEGASUN', leftMargin + pageWidth * 0.7 + 20, yPos + 75);
            }
        } else {
            doc.rect(leftMargin + pageWidth * 0.7, yPos + 60, 80, 40).stroke();
            doc.fontSize(10).font('Helvetica-Bold').text('MEGASUN', leftMargin + pageWidth * 0.7 + 20, yPos + 75);
        }

        // Authorized Signatory
        doc.fontSize(8).font('Helvetica')
            .text('(Authorised Signatory)', leftMargin + pageWidth * 0.7, yPos + 110, { width: 80, align: 'center' });

        yPos += termsHeight + 5;

        // Footer
        doc.fontSize(7).font('Helvetica-Bold')
            .text('** This Is A Computer Generated Quotation **', leftMargin, yPos, { width: pageWidth, align: 'center' });

        doc.end();

    } catch (err) {
        console.error("Error in fetching quotation deatils pdf by Id :", err);
        res.status(500).json({ message: "Server error" });
    }
};