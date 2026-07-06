import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root      = path.resolve(__dirname, "..");          // project root
const htmlPath  = path.resolve(root, "public/resume.html");
const pdfPath   = path.resolve(root, "public/resume.pdf");

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

// Wait a touch for any web fonts
await new Promise(r => setTimeout(r, 800));

await page.pdf({
  path:   pdfPath,
  format: "A4",
  printBackground: true,
  scale: 0.82,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log("✅  PDF generated →", pdfPath);
