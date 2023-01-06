let Cliente = require("../src/models/Cliente");

let getClientes = (req, res) => {
  Cliente.findAll()
    .then((clientes) => {
      res.send({
        exito: true,
        clientes: clientes,
      });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let getCliente = (req, res) => {
  Cliente.findOne({ where: { id: req.params.id } })
    .then((cliente) => {
      if (cliente == null) {
        res.send({ exito: false });
      } else {
        res.send({
          exito: true,
          cliente: cliente,
        });
      }
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let añadirCliente = async (req, res) => {
  let body = req.body;

  const exists = await Cliente.findOne({
    where: { email: body.email },
  }).catch((err) => console.log(err));

  if (exists) {
    return res.send({ exito: false });
  }

  Cliente.create(body)
    .then((cliente) => {
      res.send({
        exito: true,
        cliente: cliente,
      });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let actualizarCliente = (req, res) => {
  let errHandler = (err) => {
    console.log(err);
    res.send({
      exito: false,
    });
  };

  let idCliente = req.params.id;
  let bodyData = req.body;

  Cliente.update(bodyData, { where: { id: idCliente } })
    .then(() => {
      Cliente.findOne({ where: { id: idCliente } })
        .then((cliente) => {
          if (cliente == null) throw new Error("Cliente inexistente");

          res.send({
            exito: true,
            cliente: cliente,
          });
        })
        .catch(errHandler);
    })
    .catch(errHandler);
};

let eliminarCliente = (req, res) => {
  let idCliente = req.params.id;

  Cliente.destroy({ where: { id: idCliente } })
    .then((x) => {
      if (x == 0) throw new Error("Cliente inexistente");
      res.send({ exito: true });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};


module.exports = {
  getClientes,
  getCliente,
  añadirCliente,
  actualizarCliente,
  eliminarCliente,
};
