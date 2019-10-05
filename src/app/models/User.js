import Sequelize, { Model } from 'sequelize';

import moment from 'moment-timezone';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConf from '../../config/auth';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        manager: Sequelize.BOOLEAN,
        blocked: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        creation_dt: {
          type: Sequelize.VIRTUAL,
          get() {
            return moment(this.get('created_at'))
              .tz('America/Sao_Paulo')
              .format('YYYY-MM-DD HH:mm');
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken(id, email, manager) {
    const objJwt = { userId: id, userEmail: email, userManager: manager };
    return jwt.sign(objJwt, authConf.secret, {
      expiresIn: authConf.ttl,
    });
  }
}

export default User;

// charset: 'utf8',
// dialectOptions: { collate: 'utf8_general_ci' },
