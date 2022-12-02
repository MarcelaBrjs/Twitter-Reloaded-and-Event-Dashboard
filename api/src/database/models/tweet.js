'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tweet.belongsTo(models.user);
      tweet.hasMany(tweet, {as: 'replies', foreignKey: 'replyToTweetId'});
      tweet.belongsTo(tweet, {as: 'mainTweet', foreignKey: 'replyToTweetId'});
    }
  }
  tweet.init({
    content: DataTypes.STRING,
    replyToTweetId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tweet',
  });
  return tweet;
};