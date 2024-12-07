const express = require("express");
const artRoutes = require("./routes/artRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());

app.use("/api/art", artRoutes);
app.use("/api/dropdown", dropdownRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
