module.exports = async () => {
  const Carrito = require("./models/Carrito");
  const Cliente = require("./models/Cliente");
  const Inventario = require("./models/Inventario");
  const Producto = require("./models/Producto");
  const Venta = require("./models/Venta");
  const VentaItem = require("./models/VentaItem");

  Cliente.hasMany(Carrito, { as: "carrito", foreignKey: "idCliente" });
  Cliente.belongsTo(Cliente, { as: "cliente", foreignKey: "idCliente" });

  Cliente.hasMany(Venta, { as: "ventas", foreignKey: "idCliente" });
  Venta.belongsTo(Cliente, { as: "cliente", foreignKey: "idCliente" });

  Venta.hasMany(VentaItem, { as: "items", foreignKey: "idVenta" });
  VentaItem.belongsTo(Venta, { as: "venta", foreignKey: "idVenta" });

  Producto.hasMany(VentaItem, { as: "ventaItems", foreignKey: "SKU" });
  VentaItem.belongsTo(Producto, { as: "producto", foreignKey: "SKU" });

  Producto.hasOne(Inventario, {
    as: "inventario",
    foreignKey: "SKU",
    sourceKey: "SKU",
  });
  Inventario.belongsTo(Producto, {
    as: "producto",
    foreignKey: "SKU",
    targetKey: "SKU",
  });

  Producto.hasMany(Carrito, {
    as: "carritos",
    foreignKey: "SKU",
    sourceKey: "SKU",
  });
  Carrito.belongsTo(Producto, {
    as: "producto",
    foreignKey: "SKU",
    targetKey: "SKU",
  });
};
