const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote, Keywords } = require('../../models');

// get all posts
router.get('/', (req, res) => {
  console.log('==================');
  Post.findAll([
    attributes: [
      'id',
      'playlist_url',
      'keyword_name'
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

module.exports = router;