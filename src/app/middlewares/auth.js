import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConf from '../../config/auth';

class Auth {
  async index(req, res, next) {
    const authHearder = req.headers.authorization;
    // console.log(authHearder);
    if (!authHearder)
      return res.status(400).json({ error: 'token not provided' });

    const [, token] = authHearder.split(' ');
    // id
    try {
      const decode = await promisify(jwt.verify)(token, authConf.secret);
      req.userId = decode.userId;
      req.userEmail = decode.userEmail;
      req.userManager = decode.manager;

      return next();
    } catch (err) {
      return res.status(400).json({ error: 'token is invalid' });
    }
  }
}
export default new Auth();
