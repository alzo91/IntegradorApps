import Sequelize, { Model } from 'sequelize';
import moment from 'moment-timezone';

class Device extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: Sequelize.STRING,
        name: Sequelize.STRING,
        operational_system: Sequelize.STRING,
        build_version: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        namespace: Sequelize.STRING,
        limit_measure: Sequelize.INTEGER,
        blocked: Sequelize.BOOLEAN,
        counter: Sequelize.BIGINT,
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
    this.belongsTo(sequelize.models.Application, { foreignKey: 'app_id' });
    // this.belongsToMany(sequelize.models.Application, { foreignKey: 'app_id' });
  }
}

export default Device;
