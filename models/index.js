// import models
const Playlist = require('./Playlist');
const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Playlist, {
  foreignKey: 'user_id'
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Playlist, {
  through: Favorite,
  as: 'favorited_playlists',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Playlist.belongsToMany(User, {
  through: Favorite,
  as: 'favorited_playlists',
  foreignKey: 'playlist_id',
  onDelete: 'SET NULL'
})

Favorite.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Favorite.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
  onDelete: 'SET NULL'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Playlist.hasMany(Favorite, {
  foreignKey: 'playlist_id'
});

module.exports = {
  Playlist,
  User,
  Favorite
};