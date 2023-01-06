const express = require("express");

const router = express.Router();

const controladorSesion = require("../controladores/controladorSesion");

router.post("/", controladorSesion.postLogin);

module.exports = router;
