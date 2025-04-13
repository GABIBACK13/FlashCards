const jwt = require('jsonwebtoken');
require('dotenv').config();
import User from '../models/user';

class TokenController {
  async store (req, res) {
    const {email = '', password = ''} = req.body;
    if (!email || !password) {
      return res.status(400).json({errors: ['credenciais inválidas']});
    }
    const user = await User.findOne({where: { email }});
    
    if (!user) {
      return res.status(400).json({errors: ['Usuário não encontrado']});
    }
    if (!(await user.passwordValidate(password))) {
      return res.status(400).json({errors: ['Senha incorreta']});
    }
    const { id } = user;
    const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_DURATION});
    return res.json({ token, user:{ nome: user.nome, id, email}});
  }
}

export default new TokenController();