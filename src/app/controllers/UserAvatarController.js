import User from '../models/User';
import File from '../models/File';

class UserAvatarController {
  async update(req, res) {
    // const { orginalname: name, filename: path, size } = req.file;

    const user = await User.findOne({
      where: { id: req.userId, email: req.userEmail },
    });

    if (!user) {
      return res.status(401).json({ error: `User didn't find!` });
    }

    if (user.blocked) {
      return res.status(401).json({ error: `User was blocked!` });
    }

    if (!req.file) {
      return res.status(401).json({ error: `User was blocked!` });
    }

    const new_file = await File.create({
      name: req.file.originalname,
      path: req.file.filename,
      size: req.file.size,
    });

    user.update({ avatar_id: new_file.id });

    return res.status(200).json([user, new_file]);
  }
}

export default new UserAvatarController();
