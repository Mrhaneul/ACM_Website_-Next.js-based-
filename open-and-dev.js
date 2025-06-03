// open-and-dev.js
const { exec } = require("child_process");
const os = require("os");

const url = "http://localhost:3000";

// Use correct command based on OS
const command = os.platform() === "win32" ? `start ${url}` : `open ${url}`;

// Open the browser
exec(command, (err) => {
  if (err) console.error("Failed to open browser:", err);
});

// Start the dev server
exec("npx next dev --turbopack", { stdio: "inherit" });
