const Carrito = require("../src/models/Carrito");
const Cliente = require("../src/models/Cliente");
const Producto = require("../src/models/Producto");
const Inventario = require("../src/models/Venta");

let getCarrito = (req, res) => {
  let idCliente = req.params.id;

  Carrito.findAll({
    include: [
      {
        model: Producto,
        as: "producto",
      },
    ],
    where: { idCliente: idCliente },
  }).then((carritoCliente) => {
    //en caso de un error
    if (carritoCliente == null) {
      res.status(404).send({ exito: false });
    } else {
      //regresa el carrito encontrado con el id correspondiente al cliente
      Cliente.findOne({ where: { id: idCliente } })
        .then((cliente) => {
          res.send({
            exito: true,
            cliente: cliente,
            carrito: carritoCliente,
          });
        })
        //en caso de un error
        .catch((err) => {
          res.send({ exito: false });
          console.log(err);
        });
    }
  });
};

let agregarAlCarrito = async (req, res) => {
  let errHandler = (err) => {
    res.send({ exito: false });
    console.log(err);
    return;
  };

  let idCliente = req.params.id;

  //Busca un producto con el SKU correspondiente
  Producto.findOne({ where: { SKU: req.body.SKU } })
    .then((producto) => {
      if (producto == null) {
        throw new Error("Este producto no existe");
      }
      if (producto.existencia == "A") {
        throw new Error("Producto agotado");
      }

      //Crea la nueva entrada al carrito
      let nueva_entrada = {
        SKU: producto.SKU,
        cantProducto: req.body.cantProducto,
        precio: producto.precio,
        subtotal: producto.precio * req.body.cantProducto,
        impuesto: producto.precio * req.body.cantProducto * 0.16,
        total: producto.precio * req.body.cantProducto * 1.16,
        idCliente: idCliente,
      };

      //Actualización del inventario
      Inventario.increment(
        {
          cantReserva: nueva_entrada.cantProducto,
          cantExistencia: -nueva_entrada.cantProducto,
        },
        { where: { SKU: producto.SKU } }
      );

      Carrito.crear(nueva_entrada)
        .then((carrito) => {
          res.send({
            exito: true,
            carrito: carrito,
          });
        })
        .catch(errHandler);
    })
    .catch(errHandler);
};

module.exports = { getCarrito, agregarAlCarrito };
