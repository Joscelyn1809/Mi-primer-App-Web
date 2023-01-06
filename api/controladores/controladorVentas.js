const Venta = require("../src/models/Venta");
const VentaItem = require("../src/models/VentaItem");
const Carrito = require("../src/models/Carrito");
const Producto = require("../src/models/Producto");
const Inventario = require("../src/models/Inventario");


let crearVenta = async (req, res) => {
  let errHandler = (err) => {
    console.log(err);
    res.send({ exito: false });
  };

  let idCliente = req.params.idCliente;

  //Se buscan todos los elementos del carrito del clientes
  let carritoCliente = await Carrito.findAll({
    where: { idCliente: idCliente },
  });

  //Se verifica que el carrito no esté vacio
  if (carritoCliente.length == 0) {
    errHandler(new Error("Carrito vacio"));
    return;
  }

  let venta = await Venta.create({ idCliente: idCliente });

  let subtotalVenta = 0;

  await Promise.all(
    carritoCliente.map(async (item) => {
      let producto = await Producto.findOne({ where: { SKU: item.SKU } });

      let ventaItem = {
        idVenta: venta.id,
        SKU: producto.SKU,
        cantidadProducto: item.cantidadProducto,
        subtotal: producto.precio * item.cantidadProducto,
      };

      subtotalVenta += ventaItem.subtotal;

      await VentaItem.create(ventaItem)
        .then(() => {
          Inventario.findOne({ where: { SKU: producto.SKU } })
            .then((inventario) => {
              inventario.reserva -= ventaItem.cantidadProducto;
              if (inventario.existencia == 0) {
                inventario.estado = "A";
              }
              inventario.save();
            })
            .catch(errHandler);

          item.destroy();
        })
        .catch(errHandler);
    })
  )
    .then(() => {})
    .catch(errHandler);

  await venta.update({
    subtotal: subtotalVenta,
    impuesto: subtotalVenta * 0.16,
    total: subtotalVenta * 1.16,
  });

  await venta.save();

  VentaItem.findAll({ where: { idVenta: venta.id } })
    .then((items) => {
      if (items.length == 0) throw new Error("Carrito vacio");
      res.send({ exito: true, venta: venta, items: items });
    })
    .catch((err) => {
      console.log(err);
      res.send({ exito: false });
    });
};

module.exports = { crearVenta };
