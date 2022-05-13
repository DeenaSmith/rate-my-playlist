const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Keywords, Favorite } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('====================');
  Post.findAll({
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
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    // add login condition later
    res.render('homepage', {posts});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;