const express = require("express");
const app = express();
const rota = require("./routes");

app.use(express.json({ limit: "20mb" }));

app.use(rota);

app.listen("3333");
