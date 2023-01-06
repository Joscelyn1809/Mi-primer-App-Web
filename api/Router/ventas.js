const express = require("express");

const router = express.Router();

const controladorVentas = require("../controladores/controladorVentas");

router.post("/:idCliente", controladorVentas.crearVenta);

module.exports = router;
