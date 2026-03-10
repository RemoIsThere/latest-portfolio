const fs = require("fs");
try {
  fs.cpSync(
    "d:\\Programming\\CodeCanvas\\frontend",
    "d:\\Programming\\Portfolio\\playground-src",
    { recursive: true },
  );
  fs.cpSync(
    "d:\\Programming\\CodeCanvas\\backend",
    "d:\\Programming\\Portfolio\\playground-server",
    { recursive: true },
  );
  console.log("Copy successful");
} catch (e) {
  console.error("Error copying:", e);
}
