// import models
const Post = require('./Post');
const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Favorite,
  as: 'favorite_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Post.hasMany(Favorite, {
  foreignKey: 'post_id'
});

module.exports = {
  Post,
  User,
  Favorite,
};