import type { Sequelize } from "sequelize";
import { orderdetails as _orderdetails } from "./orderdetails";
import type { orderdetailsAttributes, orderdetailsCreationAttributes } from "./orderdetails";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";

export {
  _orderdetails as orderdetails,
  _orders as orders,
  _products as products,
};

export type {
  orderdetailsAttributes,
  orderdetailsCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const orderdetails = _orderdetails.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const products = _products.initModel(sequelize);

  orderdetails.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orderdetails, { as: "orderdetails", foreignKey: "order_id"});
  orderdetails.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(orderdetails, { as: "orderdetails", foreignKey: "product_id"});

  return {
    orderdetails: orderdetails,
    orders: orders,
    products: products,
  };
}
