// Regenerates the printable QR code for the SET project-idea form.
// Run with: node scripts/generate-qr.mjs
import QRCode from "qrcode";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const TARGET_URL = "https://acm-website-459ef.web.app/interest/set-ideas";
const OUT_FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "set-ideas-qr.png");

await QRCode.toFile(OUT_FILE, TARGET_URL, {
  width: 1200,
  margin: 2,
  errorCorrectionLevel: "H",
  color: { dark: "#004AADFF", light: "#FFFFFFFF" },
});

console.log(`QR written to ${OUT_FILE}`);
console.log(`encodes: ${TARGET_URL}`);
