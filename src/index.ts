import { Sequelize, UUIDV4 } from "sequelize";
import { initModels, products, orders, orderdetails, productsCreationAttributes, ordersCreationAttributes, orderdetailsCreationAttributes } from "./models/init-models";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from 'uuid';

const typeDefs = readFileSync("./src/schema.graphql").toString("utf-8");

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string, {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
});

initModels(sequelize);

const resolvers = {
    Query: {
        products: async () => await products.findAll(),
        orders: async () => await orders.findAll(),
    },
    Mutation: {
        getDetailProduct: async (_parent: any, args: any) => {
            return await products.findByPk(args.id);
        },
        createProduct: async (_parent: any, args: any) => {
            const newProduct: productsCreationAttributes = {
                name: args.name,
                stock: args.stock,
                price: args.price,
                created: new Date(),
            };
            return await products.create(newProduct);
        },
        updateProduct: async (_parent: any, args: any) => {
            const updateProduct = await products.findByPk(args.id);
            updateProduct?.set("name", args.name);
            updateProduct?.set("stock", args.stock);
            updateProduct?.set("price", args.price);
            return updateProduct?.save();
        },
        deleteProduct: async (_parent: any, args: any) => {
            await products.destroy({
                where: { id: args.id },
            });

            return await products.findAll();
        },
        getDetailOrder: async (_parent: any, args: any) => {
            return await orders.findByPk(args.id);
        },
        createOrder: async (_parent: any, args: any) => {
            const Product = await products.findByPk(args.produkId);

            const newOrder: ordersCreationAttributes = {
                transcode: uuidv4(),
                created: new Date(),
            };
            await orders.create(newOrder);

            const newOrderDetail: orderdetailsCreationAttributes = {
                product_id: args.productId,
                quantity: args.quantity,
                price: Product!.price,
                order_id: newOrder.id!,
            };
            await orderdetails.create(newOrderDetail)

            return await orders.findByPk(newOrder.id);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});