const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Playlist , User, Favorite } = require('../../models');
// get all posts
router.get('/', (req, res) => {
  console.log('==================');
  Post.findAll([
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
  ])
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//TODO: get playlist by id

//TODO: post playlist - create new playlist

//TODO: upfavorite playlist

//TODO: delete playlist




module.exports = router;