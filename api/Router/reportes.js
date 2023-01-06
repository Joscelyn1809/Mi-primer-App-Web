const express = require("express");

const router = express.Router();

const controladorReportes = require("../controladores/controladorReportes");

router.get("/productos", controladorReportes.reporteProductos);
router.get("/ventas/:id", controladorReportes.reporteVentasCliente);

module.exports = router;
