
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Playlist, User, Favorite } = require('../models');
const withAuth = require('../utils/auth');

// get all playlists for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Playlist.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
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
            res.render('dashboard', { playlists, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;