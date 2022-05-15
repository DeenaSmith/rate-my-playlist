const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Playlist, User, Favorite } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts
router.get("/", (req, res) => {
  console.log("==================");
  Playlist.findAll({
    attributes: [
      "id",
      "playlist_url",
      //TODO: Write Sequelize Literal to show all playlists in descending order by favorite count
      [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE playlist.id = favorite.playlist_id)'), 'favorite_count'],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPlaylistData) => res.json(dbPlaylistData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO: get playlist by id
router.get("/:id", (req, res) => {
  Playlist.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "playlist_url",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPlaylistData) => {
      if (!dbPlaylistData) {
        res.status(404).json({ message: "There is no playlist with this id." });
        return;
      }
      res.json(dbPlaylistData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO: post playlist - create new playlist
router.post("/", withAuth, (req, res) => {
  Playlist.create({
    playlist_url: req.body.playlist_url,
    user_id: req.session.user_id,
  })
    .then((dbPlaylistData) => res.json(dbPlaylistData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO: upfavorite playlist
router.put("/upfavorite", withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Playlist.upfavorite(
      { ...req.body, user_id: req.session.user_id },
      { Favorite, User }
  )
      .then((updatedFavoriteData) => res.json(updatedFavoriteData))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});



//TODO: delete playlist
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Playlist.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "There is no playlist with this id." });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
