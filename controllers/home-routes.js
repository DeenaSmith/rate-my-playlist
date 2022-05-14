const router = require('express').Router();
const sequelize = require('../config/connection');
const { Playlist, User, Favorite } = require('../models');

// get all playlists for homepage
router.get('/', (req, res) => {
  console.log('====================');
  Playlist.findAll({
    attributes: [
      'id',
      'playlist_url',
      'keyword_name'
       //TODO: Write Sequelize Literal to show all playlists in descending order by favorite count
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPlaylistData => {
    const playlists = dbPlaylistData.map(playlist => playlist.get({ plain: true }));

    // add login condition later
    res.render('homepage', {playlists});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

 //TODO: login route

module.exports = router;