import { sequelize } from '../models';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão estabelecida com sucesso!');
  } catch (err) {
    console.error('❌ Não foi possível conectar ao banco de dados:', err);
  } finally {
    await sequelize.close();
  }
})();