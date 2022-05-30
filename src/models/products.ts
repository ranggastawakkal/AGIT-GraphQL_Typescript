import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { orderdetails, orderdetailsId } from './orderdetails';

export interface productsAttributes {
  id: number;
  name: string;
  stock: number;
  price: number;
  created: Date;
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  id!: number;
  name!: string;
  stock!: number;
  price!: number;
  created!: Date;

  // products hasMany orderdetails via product_id
  orderdetails!: orderdetails[];
  getOrderdetails!: Sequelize.HasManyGetAssociationsMixin<orderdetails>;
  setOrderdetails!: Sequelize.HasManySetAssociationsMixin<orderdetails, orderdetailsId>;
  addOrderdetail!: Sequelize.HasManyAddAssociationMixin<orderdetails, orderdetailsId>;
  addOrderdetails!: Sequelize.HasManyAddAssociationsMixin<orderdetails, orderdetailsId>;
  createOrderdetail!: Sequelize.HasManyCreateAssociationMixin<orderdetails>;
  removeOrderdetail!: Sequelize.HasManyRemoveAssociationMixin<orderdetails, orderdetailsId>;
  removeOrderdetails!: Sequelize.HasManyRemoveAssociationsMixin<orderdetails, orderdetailsId>;
  hasOrderdetail!: Sequelize.HasManyHasAssociationMixin<orderdetails, orderdetailsId>;
  hasOrderdetails!: Sequelize.HasManyHasAssociationsMixin<orderdetails, orderdetailsId>;
  countOrderdetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
