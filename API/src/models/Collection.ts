import { Model, DataTypes, Sequelize } from "sequelize";
import { CollectionAttributes, CollectionCreationAttributes } from "../types/collection.types";
import Card from "./Card";

class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
  public collectionID!: number;
  public userID!:number;
  public name!: string;
  public private!: boolean;
  public allowed!: Record<string, number> | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        collectionID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userID: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Name's length must be between 3 and 255",
            },
          },
        },
        private: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        allowed: {
          type: DataTypes.JSON,
          defaultValue: {},
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Collection",
        tableName: "Collections",
        timestamps: true,
        underscored: false,
      }
    );
  }
  static associate(models: any) {
    Collection.belongsToMany(models.Card, {
      through: 'CollectionCard',
      foreignKey: 'collectionID',
      otherKey: 'cardID',
    });
  }
}

export default Collection;
