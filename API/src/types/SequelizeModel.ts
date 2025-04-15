// src/types/SequelizeModel.ts
import { Model, Sequelize, ModelStatic } from 'sequelize';

export interface SequelizeModel<T extends Model> extends ModelStatic<T> {
  initModel(sequelize: Sequelize): SequelizeModel<T>;
  associate?(models: { [key: string]: SequelizeModel<any> }): void;
}
