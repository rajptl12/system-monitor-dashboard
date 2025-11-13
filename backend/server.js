// backend/server.js
const express = require("express");
const cors = require("cors");
const si = require("systeminformation");

const app = express();
app.use(cors());

app.get("/api/system", async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();

    res.json({
      cpu: cpu.currentLoad.toFixed(1),
      memory: ((mem.active / mem.total) * 100).toFixed(1),
      disk: disk[0]?.use?.toFixed(1) || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching system data" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
