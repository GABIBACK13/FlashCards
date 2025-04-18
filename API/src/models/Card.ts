import { Model, DataTypes, Sequelize } from "sequelize";
import Collection from "./Collection";
import { CardsAttributes, CardsCreationAttributes } from "../types/card.types";

class Card extends Model<CardsAttributes, CardsCreationAttributes> implements CardsAttributes {
  public cardID!: number;
  public ownerID!: number;
  public public!: boolean;
  public title!: string;
  public question!: string;
  public alternatives!: Record<string, string>;
  public answer!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        public: {
          type: DataTypes.BOOLEAN,
          allowNull:false
        },
        title: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            len: {
              args: [3, 40],
              msg: "Title's length must be between 3 and 40",
            },
          },
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        alternatives: {
          type: DataTypes.JSON,
          allowNull: false,
          validate: {
            maxKeys(value: Record<string, string>) {
              if (Object.keys(value).length > 5) {
                throw new Error("Alternatives must have at most 5 keys");
              }
            },
            minKeys(value: Record<string, string>) {
              if (Object.keys(value).length < 2) {
                throw new Error("Alternatives must have at least 2 keys");
              }
            },
          },
        },
        answer: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Card",
        tableName: "Cards",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: any) {
    Card.belongsToMany(models.Collection, {
      through: "CollectionCard",
      foreignKey: "cardID",
      otherKey: "collectionID",
    });
  }
}

export default Card;
