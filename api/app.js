const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const passport = require("passport");

require("dotenv").config();
require("./passport");

const bodyParser = require("body-parser");
const app = express();
const puerto = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use;

https
  .createServer(
    {
      cert: fs.readFileSync("certificate.crt"),
      key: fs.readFileSync("private.key"),
      passphrase: "password",
    },
    app
  )
  .listen(puerto, () => {
    console.log("Servidor corriendo en puerto", puerto);
    console.log(process.env.JWT_SECRET);
  });

require("./src/database/connection");
require("./src/bootstrap");

const productosRouter = require("./Router/productos");
const clientesRouter = require("./Router/clientes");
const ventasRouter = require("./Router/ventas");
const inventarioRouter = require("./Router/inventario");
const carritoRouter = require("./Router/carrito");
const reportesRouter = require("./Router/reportes");
const authRouter = require("./Router/auth");

app.use("/clientes", clientesRouter);
app.use("/auth", authRouter);
app.use(
  "/productos",
  passport.authenticate("jwt", { session: false }),
  productosRouter
);
app.use(
  "./ventas",
  passport.authenticate("jwt", { session: false }),
  ventasRouter
);
app.use(
  "./carrito",
  passport.authenticate("jwt", { session: false }),
  carritoRouter
);
app.use(
  "./inventario",
  passport.authenticate("jwt", { session: false }),
  inventarioRouter
);
app.use(
  "./reportes",
  passport.authenticate("jwt", { session: false }),
  reportes.router
);

app.get("/", function (req, res) {
  res.send("GET");
});

app.post("/", function (req, res) {
  res.send("POST");
});
