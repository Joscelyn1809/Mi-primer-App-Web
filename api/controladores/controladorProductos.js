const Inventario = require("../src/models/Inventario");
const Producto = require("../src/models/Producto");

let getProductos = (req, res) => {
  Producto.findAll({
    include: [
      {
        model: Inventario,
        as: "inventario",
      },
    ],
  })
    .then((productos) => {
      res.send({ exito: true, productos: productos });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let getProducto = (req, res) => {
  let idProducto = req.params.id;

  let errHandler = (err) => {
    res.send({ exito: false });
    console.log(err);
  };

  Producto.findOne({
    include: [
      {
        model: Inventario,
        as: "inventario",
      },
    ],
    where: { id: idProducto },
  })
    .then((producto) => {
      if (producto == null) {
        res.status(404).send({ exito: false });
      } else {
        res.send({
          exito: true,
          producto: producto,
        });
      }
    })
    .catch(errHandler);
};

let crearProducto = async (req, res) => {
  let body = req.body;

  Producto.create(body)
    .then((producto) => {
      res.send({
        exito: true,
        producto: producto,
      });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

let actualizarProducto = (req, res) => {
  let errHandler = (err) => {
    console.log(err);
    res.send({ exito: false });
  };

  let idProducto = req.params.id;
  let bodyData = req.body;

  Producto.update(bodyData, { where: { id: idProducto } })
    .then(() => {
      Producto.findOne({ where: { id: idProducto } })
        .then((producto) => {
          if (producto == null) throw new Error("Producto inexistente");
          res.send({
            exito: true,
            producto: producto,
          });
        })
        .catch(errHandler);
    })
    .catch(errHandler);
};

let eliminarProducto = (req, res) => {
  let idProducto = req.params.id;

  Producto.destroy({ where: { id: idProducto } })
    .then(() => {
      res.send({ exito: true });
    })
    .catch((err) => {
      res.send({ exito: false });
      console.log(err);
    });
};

module.exports = {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
