import User from '../models/User';

class UserController {
  /** methodo para listar todos os objetos daentidade */
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'manager', 'blocked', 'creation_dt'],
    });
    if (!users) {
      return res
        .status(401)
        .json({ error: `Não foram encotrados usuários cadastrados!` });
    }
    // console.log(users[0].name);
    return res.status(200).json(users);
  }

  /** methodo para inserir na entidade */
  async show(req, res) {
    // console.log(req.params);
    if (!req.params.id) {
      return res.status(401).json({ error: 'Favor informar ID do Usuário!' });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(401).json({
        error: `Não existe usuário cadastrados com ID ${req.params.id}!`,
      });
    }

    return res.status(200).json(user);
  }

  /** methodo para inserir um objeto na entidade */
  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      return res
        .status(401)
        .json({ error: `Falta campo < name > no corpo da requisição` });
    }

    if (!email) {
      return res
        .status(401)
        .json({ error: `Falta campo < email > no corpo da requisição` });
    }

    if (!password) {
      return res
        .status(401)
        .json({ error: `Falta campo < password > no corpo da requisição` });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(401).json({ error: `Usuário já está cadastrado!` });
    }

    const user = await User.create(req.body);

    return res.status(200).json(user);
  }

  update(req, res) {
    return res.status(200);
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(200).json({ error: 'User does not exist!' });
    }

    await user.update({ blocked: true });

    return res.status(200).json({ mesage: `User ${user.name} was removed!!` });
  }
}

export default new UserController();
