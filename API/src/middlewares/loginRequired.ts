import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface RequestData extends Request {
  userId: number;
  userEmail: string;
}
interface Data {
  id:number | null,
  email: string | null,
}

export default async (req: RequestData, res: Response, next: NextFunction) => {
  const { authorization } = req.headers ;
  if (!authorization) {
    return res.status(401).json({errors: ['autorização recusada'],})
  }

  const [ text, token ] = String(authorization).split(' ');
  try {
    const data:string | JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET!);
    let {id, email}:Data =  {id:null, email:null};
    (typeof data !== 'string') ? ({id, email} = data): ({id, email} =  {id:0, email:''})

    const user = {userId:1, email:'aag@gmail.com'}/* await User.findOne({where: {id, email,}}) */;

    if(!user) {
      return res.status(401).json({errors: ['Usuario inválido'],})
    }

    req.userId = id as number;
    req.userEmail = email as string;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({errors: ['token inválido'],})
  }
};
