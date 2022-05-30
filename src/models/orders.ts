import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { orderdetails, orderdetailsId } from './orderdetails';

export interface ordersAttributes {
  id: number;
  transcode: string;
  created: Date;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  transcode!: string;
  created!: Date;

  // orders hasMany orderdetails via order_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transcode: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
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
