import Application from '../models/Application';
import User from '../models/User';

class ApplicationController {
  /** methodo para listar todos os objetos daentidade */
  async index(req, res) {
    // const applications = await Application.findAll({ order: [['id', 'DESC']] });
    if (!req.userManager) {
      return res
        .status(409)
        .json({ mesge: `You haven't permission for insert aplications` });
    }

    const applications = await Application.findAll({
      where: {
        user_id: req.userId,
      },
      order: [['id']],
      include: [{ model: User, attributes: ['name', 'email'] }],
      attributes: ['id', 'creation_dt', 'name', 'description', 'update_dt'],
    });

    return res.status(200).json(applications);
  }

  /** methodo para inserir na entidade */
  async show(req, res) {
    if (!req.userManager) {
      return res
        .status(409)
        .json({ mesge: `You haven't permission for insert aplications` });
    }

    // const application = await Application.findByPk(req.params.AppId);
    const application = await Application.findOne({
      where: {
        user_id: req.userId,
        id: req.params.AppId,
      },
      // include: [{ model: File, attributes: ['name', 'path', 'url'] }],
      include: [{ model: User, attributes: ['name', 'email'] }],
      attributes: ['id', 'creation_dt', 'name', 'description', 'update_dt'],
    });

    if (!application) {
      return res.status(409).json({ error: 'This app does not owner for you' });
    }
    return res.status(200).json(application);
  }

  /** methodo para inserir um objeto na entidade */
  async store(req, res) {
    const { name, description } = req.body;

    if (!req.userManager) {
      return res
        .status(409)
        .json({ mesge: `You haven't permission for insert aplications` });
    }

    if (!name || !description) {
      return res.status(401).json({
        error:
          'Please, you should to inform the fields < name && description>!',
      });
    }

    let app = await Application.findOne({ where: { name } });

    if (app) {
      return res.status(401).json({
        error: `Sorry but this name < ${name} > already exist!`,
      });
    }

    app = await Application.create({ name, description, user_id: req.userId });

    return res.status(200).json(app);
  }

  async update(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    if (!req.userManager) {
      return res
        .status(409)
        .json({ mesge: `You haven't permission for insert aplications` });
    }

    if (!id || !description) {
      return res
        .statu(401)
        .json({ error: 'You should inform the field < id and description>!' });
    }
    const app = await Application.findOne({
      where: { id, user_id: req.userId },
    });

    if (!app) {
      return res.status(401).json({
        error: 'Sorry but we did not found that Application to update!',
      });
    }
    await app.update({ description });

    // Application.update({ description }, { where: { id } });

    return res
      .status(200)
      .json({ message: `Application ${app.name} was updated with success!` });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!req.userManager) {
      return res
        .status(409)
        .json({ mesge: `You haven't permission for insert aplications` });
    }

    if (!id) {
      return res
        .statu(401)
        .json({ error: 'You should inform the field how parameters!' });
    }

    const app = await Application.findOne({
      where: { id, user_id: req.userId },
    });

    if (!app) {
      return res.status(401).json({
        error: 'Sorry but we did not found that Application to update!',
      });
    }
    const { name } = app;
    await app.destroy();

    return res
      .status(200)
      .json({ message: `Application ${name} was destroied with success!` });
  }
}

export default new ApplicationController();
