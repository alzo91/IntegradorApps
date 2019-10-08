import Sequelize, { Model } from 'sequelize';
import moment from 'moment-timezone';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        size: Sequelize.INTEGER,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}files/${this.get('path')}`;
          },
        },
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

    // this.hasOne(sequelize.models.User, { foreignKey: 'avatar_id' });
    // this.belongsTo(sequelize.models.User, { foreignKey: 'avatar_id' });
    // this.belongsToMany(sequelize.models.Application, { foreignKey: 'app_id' });
  }
}

export default File;
