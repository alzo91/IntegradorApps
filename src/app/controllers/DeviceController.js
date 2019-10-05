import Device from '../models/Device';
import Application from '../models/Application';

class DeviceController {
  async index(req, res) {
    const devices = await Device.findAll({
      include: [{ model: Application, attributes: ['name', 'description'] }],
    });
    return res.status(200).json(devices);
  }

  async show(req, res) {
    const { id } = req.params;
    const device = await Device.findByPk(id);

    if (!device) {
      return res
        .status(400)
        .json({ mesage: `ID ${id} doesn't found in databases!` });
    }

    return res.status(200).json(device);
  }

  async store(req, res) {
    const { app_id, uid } = req.body;

    const disp = await Device.findOne({ where: { uid, app_id } });

    if (disp) {
      disp.update({ counter: +disp.counter + 1 });
      return res.status(200).json(disp);
    }

    const app = await Application.findOne({ where: { id: app_id } }); // ({ id: req.body.appId });

    if (!app) {
      return res
        .status(400)
        .json({ error: `It doesn't exist applications with code ${app_id}` });
    }

    const device = await Device.create(req.body);

    return res.status(200).json(device);
  }

  async update(req, res) {
    const { device_id } = req.params;
    const device = await Device.findOne({ where: { id: device_id } });

    if (!device) {
      return res.status(401).json({ mesage: ' Device not found!' });
    }

    device.update(req.body);
    return res.status(200).json({ mesage: 'Update a specified  device!' });
  }
}

export default new DeviceController();
