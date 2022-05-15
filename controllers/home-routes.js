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
      //TODO: Write Sequelize Literal to show all playlists in descending order by favorite count
      [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE playlist.id = favorite.playlist_id)'), 'favorite_count'],
      [sequelize.literal('(SELECT playlist_url(*) FROM playlist ORDER BY favorite_count DESC'), 'playlist_order']
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
      res.render('homepage', {
        playlists,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//TODO: login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



module.exports = router;