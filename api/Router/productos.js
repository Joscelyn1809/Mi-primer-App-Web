const express = require("express");
const router = express.Router();

const controladorProductos = require("../controladores/controladorProductos");

router.get("/", controladorProductos.getProductos);
router.get("/:id", controladorProductos.getProducto);
router.post("/", controladorProductos.añadirProducto);
router.put("/:id", controladorProductos.actualizarProducto);
router.delete("/:id", controladorProductos.eliminarProducto);

module.exports = router;
