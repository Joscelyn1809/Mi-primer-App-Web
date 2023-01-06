const express = require("express");

const router = express.Router();

const controladorCarrito = require("../controladores/controladorCarrito");

router.get("/:id", controladorCarrito.getCarrito);
router.post("/:id", controladorCarrito.agregarAlCarrito);

module.exports = router;
