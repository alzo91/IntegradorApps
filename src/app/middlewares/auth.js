import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConf from '../../config/auth';

class Auth {
  async show(req, res) {
    const authHearder = req.headers.authorization;

    if (!authHearder)
      return res.status(400).json({ error: 'token not provided' });

    const [, token] = authHearder.split(' ');

    try {
      const decode = await promisify(jwt.verify)(token, authConf.secret);

      return res.status(200).json({
        userId: decode.userId,
        userEmail: decode.userEmail,
        userManager: decode.userManager,
      });
    } catch (err) {
      return res.status(400).json({ error: 'token is invalid' });
    }
  }

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
      req.userManager = decode.userManager;

      return next();
    } catch (err) {
      return res.status(400).json({ error: 'token is invalid' });
    }
  }
}
export default new Auth();
