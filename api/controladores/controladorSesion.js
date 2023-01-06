const express = require("express");
const Cliente = require("../src/models/Cliente");
const jwt = require("jsonwebtoken");

PASSPORT_KEY = "QWEOIUASDLKJMNBZXC012938";

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const cliente = await Cliente.findOne({ where: { email } }).catch((err) =>
    console.log(err)
  );

  if (!cliente) return res.send({ exito: false });

  if (cliente.password != password) return res.send({ exito: false });

  const jwtToken = jwt.sign(
    { id: cliente.id, email: cliente.email },
    PASSPORT_KEY
  );

  res.send({ exito: true, token: jwtToken, cliente: cliente });
};

module.exports = { postLogin };
