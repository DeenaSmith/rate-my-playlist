const { Playlist } = require('../models');

const playlistdata = [
  {
    playlist_url: '5rD35lpdePg5cYiOYZIAgq',
    user_id: 1
  },
  {
    playlist_url: '1z4DWmgIBOIpVu5H9eypu7',
    user_id: 1
  },
  {
    playlist_url: '1VJzRuWHHHHIqrdmHk6uRq',
    user_id: 2
  },
  {
    playlist_url: '4jPxCfbuVDrd2ReegVl4qd',
    user_id: 2
  },
  {
    playlist_url: '4n8QuNgKxF72EbvUwtsonE',
    user_id: 3
  },
  {
    playlist_url: '4bOsRzWsJM3RVsYS5Awvzv',
    user_id: 3
  }
];

const seedPlaylists = () => Playlist.bulkCreate(playlistdata);

module.exports = seedPlaylists;