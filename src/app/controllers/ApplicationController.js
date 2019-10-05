import Application from '../models/Application';

class ApplicationController {
  /** methodo para listar todos os objetos daentidade */
  async index(req, res) {
    // const applications = await Application.findAll({ order: [['id', 'DESC']] });
    const applications = await Application.findAll({ order: [['id']] });
    return res.status(200).json(applications);
  }

  /** methodo para inserir na entidade */
  async show(req, res) {
    const application = await Application.findByPk(req.params.AppId);
    return res.status(200).json(application);
  }

  /** methodo para inserir um objeto na entidade */
  async store(req, res) {
    const { name, description } = req.body;

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

    app = await Application.create({ name, description });

    return res.status(200).json(app);
  }

  async update(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    if (!id || !description) {
      return res
        .statu(401)
        .json({ error: 'You should inform the field < id and description>!' });
    }
    const app = await Application.findByPk(id);

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

    if (!id) {
      return res
        .statu(401)
        .json({ error: 'You should inform the field how parameters!' });
    }

    const app = await Application.findByPk(id);

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
