import { Model, DataTypes, Sequelize } from "sequelize";
import Collection from "../src/models/Collection";

class UserCollection extends Model {
  public id!: number;
  public userID!: number;
  public collectionID!: number;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        collectionID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "UserCollection",
        tableName: "UserCollections",
        timestamps: true,
        underscored: false,
        indexes: [
          {
            unique: true,
            fields: ["userID", "collectionID"],
          },
        ],
      }
    );
  }
  static associate(models: any) {
    UserCollection.belongsTo(models.Collection, { foreignKey: "collectionID" });
  }
}

export default UserCollection;
