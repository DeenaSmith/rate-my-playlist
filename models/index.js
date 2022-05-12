// import models
const Comment = require('./Comment');
const Playlist = require('./Playlist');
const Post = require('./Post');
const Tag = require('./Tag');
const User = require('./User');
const Vote = require('./Vote');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Playlist, {
  foreignKey: 'user_id'
});

Playlist.belongsTo(Post, {
  foreignKey: 'post_id'
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Tag.belongsToMany(Post, {
  through: Playlist,
  foreignKey: 'tag_id',
});

module.exports = {
  Comment,
  Playlist,
  Post,
  Tag,
  User,
  Vote,
};