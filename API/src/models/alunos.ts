import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { SequelizeModel } from "./types/SequelizeModel";

// Interface para os atributos do modelo
interface AlunoAttributes {
  id?: number;
  nome: string;
  turma: string;
  email: string;
  idade: number;
  media: number;
  created_at?: Date;
  updated_at?: Date;
}

// Interface para criação (campos opcionais como id e timestamps)
interface AlunoCreationAttributes extends Optional<AlunoAttributes, "id" | "created_at" | "updated_at"> {}
/* 
class Aluno extends Model<AlunoAttributes, AlunoCreationAttributes> implements AlunoAttributes {
  public id!: number;
  public nome!: string;
  public turma!: string;
  public email!: string;
  public idade!: number;
  public media!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): typeof Aluno {
    return super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome precisa ter entre 3 a 255 caracteres",
            },
          },
        },
        turma: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            isEmail: {
              msg: "email Inválido",
            },
          },
          unique: true,
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 12,
            max: 120,
          },
        },
        media: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
            max: 10,
          },
        },
      },
      {
        sequelize,
        modelName: "Aluno",
        tableName: "alunos",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models: any) {
    this.hasMany(models.File, { foreignKey: "aluno_id" });
  }
}

export default Aluno;
 */