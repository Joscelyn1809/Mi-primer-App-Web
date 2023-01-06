const Cliente = require("../src/models/Cliente");
const Inventario = require("../src/models/Inventario");
const Producto = require("../src/models/Producto");
const Venta = require("../src/models/Venta");
const VentaItem = require("../src/models/VentaItem");

let reporteVentasFecha = (req, res) => {
  let fecha1 = {
    dia: req.query.dia1,
    mes: req.query.mes1,
    año: req.query.año1,
  };
  let fecha2 = {
    dia: req.query.dia2,
    mes: req.query.mes2,
    año: req.query.año2,
  };
};

let reporteVentasCliente = async (req, res) => {
  let idCliente = req.params.id;
  let respuesta = { exito: true, ventas: [] };

  let errHandler = (err) => {
    res.send({ exito: false });
    console.log(err);
  };

  Venta.findAll({
    include: [
      {
        model: VentaItem,
        as: "items",
      },
    ],
    where: { idCliente: idCliente },
  })
    .then((ventas) => {
      respuesta.ventas = ventas;
      res.send(respuesta);
    })
    .catch(errHandler);
};

let reporteProductos = async (req, res) => {
  let errHandler = (err) => {
    console.log(err);
    res.send({ exito: false });
  };

  let respuesta = { enExistencia: [], agotado: [], pedido: [] };

  //Funcion para agregar productos a un array dependiendo de su estatus
  let agregarProductosPorEstado = async (array, estatus) => {
    await Inventario.findAll({ where: { estado: estatus } })
      .then((inventarios) => {
        inventarios.forEach(async (inventario) => {
          await Producto.findOne({ where: { SKU: inventario.SKU } })
            .then((producto) =>
              array.push({ producto: producto, inventario: inventario })
            )
            .catch(errHandler);
        });
      })
      .catch(errHandler);
  };

  await agregarProductosPorEstado(respuesta.enExistencia, "En existencia");
  await agregarProductosPorEstado(respuesta.agotado, "Agotado");
  await agregarProductosPorEstado(respuesta.pedido, "Pedido");

  res.send({
    exito: true,
    respuesta,
  });
};

module.exports = {
  reporteVentasFecha,
  reporteVentasCliente,
  reporteProductos,
};
