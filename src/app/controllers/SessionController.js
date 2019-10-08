import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ error: 'You should to inform filds < email ou password > !' });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: `Email < ${email}> wasn't registered ` });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'The password is incorrect!' });
    }

    const objReturn = {
      token_app: user.generateToken(user.id, user.email, user.manager),
    };

    return res.status(200).json(objReturn);
  }
}

export default new SessionController();
