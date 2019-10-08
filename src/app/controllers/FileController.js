import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res
        .status(401)
        .json({ error: `The request didn't recive your image!` });
    }

    const { filename: path, originalname: name, size } = req.file;

    const file = await File.create({ name, path, size });

    return res.status(200).json(file);
  }

  show(req, res) {
    return res.status(200).json({ ok: true });
  }
}

export default new FileController();
