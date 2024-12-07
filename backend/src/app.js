const express = require("express");
const artRoutes = require("./routes/artRoutes");
const cors = require("cors");
const dropdownRoutes = require("./routes/dropdownRoutes");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 6001;

app.use(express.json());

app.use("/api/art", artRoutes);
app.use("/api/dropdown", dropdownRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
