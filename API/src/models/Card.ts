import { Model, DataTypes, Sequelize, Optional } from "sequelize";
// Interface para os atributos do modelo
interface CardsAttributes {
  cardID: number;
  title: string;
  question: string;
  alternatives: Record<string, string>;
  answer: number;
  created_at: Date;
  updated_at: Date;
}

// Campos Opcionais
interface CardsCreationAttributes extends Optional<CardsAttributes, "cardID" | "created_at" | "updated_at"> {}


class Cards extends Model<CardsAttributes, CardsCreationAttributes> implements CardsAttributes {
  public cardID!: number;
  public title!: string;
  public question!: string;
  public alternatives!: Record<string, string>;
  public answer!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
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
          allowNull:false
        },
        alternatives: {
          type:DataTypes.JSON,
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
            }
          }
        },
        answer: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
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
  
}

export default Cards;