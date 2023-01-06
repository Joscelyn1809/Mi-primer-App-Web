const Inventario = require("../src/models/Inventario");

let getInventario = (req, res) => {
  Inventario.findAll()
    .then((inventario) => {
      res.send({ exito: true, inventario: inventario });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let getInventarioSKU = (req, res) => {
  let sku = req.params.SKU;

  let errHandler = (err) => {
    res.send({ exito: false });
    console.log(err);
  };

  Inventario.findOne({ where: { SKU: sku } })
    .then((inventario) => {
      if (inventario == null) {
        res.send({ exito: false });
      } else {
        res.send({
          exito: true,
          inventario: inventario,
        });
      }
    })
    .catch(errHandler);
};

let crearInventario = (req, res) => {
  let body = req.body;

  Inventario.create(body)
    .then((inventario) => {
      res.send({
        exito: true,
        inventario: inventario,
      });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let actualizarInventario = (req, res) => {
  let body = req.body;
  let idInventario = req.params.id;

  let errHandler = (err) => {
    console.log(err);
    res.send({
      exito: false,
    });
  };

  Inventario.update(body, { where: { id: idInventario } })
    .then(() => {
      Inventario.findOne({ where: { id: idInventario } })
        .then((inventario) => {
          if (inventario == null) throw new Error("Inventario inexistente");

          res.send({
            exito: true,
            inventario,
          });
        })
        .catch(errHandler);
    })
    .catch(errHandler);
};

let eliminarInventario = (req, res) => {
  let idInventario = req.params.id;

  Inventario.destroy({ where: { id: idInventario } })
    .then(() => {
      res.send({ exito: true });
    })
    .catch((err) => {
      res.send({ exito: false });
    });
};

module.exports = {
  getInventario,
  getInventarioSKU,
  crearInventario,
  actualizarInventario,
  eliminarInventario,
};
