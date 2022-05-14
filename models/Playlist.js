const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Playlist model
class Playlist extends Model {
  static upfavorite(body, models) {
    return models.Favorite.create({
      user_id: body.user_id,
      playlist_id: body.playlist_id,
    }).then(() => {
      return Playlist.findOne({
        where: {
          id: body.playlist_id,
        },
        attributes: [
          "id",
          "playlist_url",
          "keyword_name",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM favorite WHERE playlist.id = favorite.playlist_id)"
            ),
            "favorite_count",
          ],
        ],
      });
    });
  }
}

// create fields/columns for playlist model
Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    keyword_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "playlist",
  }
);

module.exports = Playlist;
