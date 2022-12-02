'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      login.belongsTo(models.user);
    }
  }
  login.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'login',
  });
  return login;
};