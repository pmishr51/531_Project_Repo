const express = require("express");
const artRoutes = require("./routes/artRoutes");
const artistRoutes = require("./routes/artistRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/art", artRoutes);
app.use("/api/artist", artistRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
