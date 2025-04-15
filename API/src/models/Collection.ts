import { Model, DataTypes, Sequelize, Optional, ModelStatic } from "sequelize";
// Interface para os atributos do modelo
interface CollectionAttributes {
  collectionID: number;
  name: string;
  private: boolean;
  allowed: Record<string, number> | null;
  created_at: Date;
  updated_at: Date;
}

// Campos Opcionais
interface CollectionCreationAttributes
  extends Optional<CollectionAttributes, "collectionID" | "created_at" | "updated_at" | "allowed"> {}

class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
  public collectionID!: number;
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
}

export default Collection;
