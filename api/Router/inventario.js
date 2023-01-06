const express = require("express");

const router = express.Router();

const controladorInventario = require("../controladores/controladorInventario");

router.get("/", controladorInventario.getInventario);
router.get("/:SKU", controladorInventario.getInventarioSKU);
router.post("/", controladorInventario.crearInventario);
router.put("/:id", controladorInventario.actualizarInventario);
router.delete("/:id", controladorInventario.eliminarInventario);

module.exports = router;
