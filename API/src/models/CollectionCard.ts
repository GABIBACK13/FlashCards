import { Model, DataTypes, Sequelize } from 'sequelize';
import Collection from './Collection';
import Card from './Card';

class CollectionCard extends Model {
  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        collectionID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        cardID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        }
      },
      {
        sequelize,
        modelName: 'CollectionCard',
        tableName: 'CollectionCards',
        timestamps: true,
        underscored: false,
      }
    );
  }
  static associate(models: any) {
    CollectionCard.belongsTo(Collection, { foreignKey: 'collectionID' });
    CollectionCard.belongsTo(Card, { foreignKey: 'cardID' });
  }
}

export default CollectionCard;
