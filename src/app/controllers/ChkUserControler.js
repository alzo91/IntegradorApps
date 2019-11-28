import User from '../models/User';

class ChkUserController {
  async index(req, res) {
    const users = await User.findAll({
      where: { verify_access: true, blocked: false, manager: false },
      attributes: [
        'id',
        'name',
        'email',
        'manager',
        'verify_access',
        'creation_dt',
      ],
    });

    if (!users) {
      return res
        .status(401)
        .json({ error: `We dind't find users for check their access` });
    }

    return res.status(200).json(users);
  }
}

export default new ChkUserController();
