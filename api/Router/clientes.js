const express = require("express");
const passport = require("passport");
const router = express.Router();

const controladorClientes = require("../controladores/controladorClientes");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controladorClientes.getClientes
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controladorClientes.getCliente
);
router.post(
  "/",
  controladorClientes.añadirCliente
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controladorClientes.actualizarCliente
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controladorClientes.eliminarCliente
);

module.exports = router;
