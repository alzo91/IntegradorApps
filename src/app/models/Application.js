import Sequelize, { Model } from 'sequelize';
import moment from 'moment-timezone';

class Application extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        blocked: Sequelize.BOOLEAN,
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

    // this.hasMany(sequelize.models.Device, { foreignKey: 'app_id' });
  }
}

export default Application;
