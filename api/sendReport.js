import { Resend } from "resend";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { email, results, responses } = req.body;

  if (!email || !results) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    const doc = new PDFDocument({ margin: 40 });
    doc.fontSize(20).fillColor("#1E3A8A").text("Financial Wellbeing Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).fillColor("black").text(`Overall Score: ${results.overallPercent}%`);
    doc.text(`Rating: ${results.rating || "N/A"}`);

    doc.moveDown();
    doc.fontSize(16).fillColor("#1E3A8A").text("Theme Summary:", { underline: true });
    doc.moveDown(0.5);
    results.themes?.forEach((t) => {
      doc.fontSize(12).fillColor("black").text(`${t.themeName}: ${t.percent}%`);
    });

    // 🧾 Gather PDF data
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.end();
    const pdfBuffer = await new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Reports <reports@yourdomain.com>",
      to: email,
      subject: "Your Financial Wellbeing Report",
      text: "Attached is your personalized report.",
      attachments: [
        {
          filename: "FinancialWellbeingReport.pdf",
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    console.log("Report sent successfully to", email);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending report:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
