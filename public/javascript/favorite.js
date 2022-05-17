async function favoriteClickHandler(event) {
    event.preventDefault();
    var getAllArticles = document.querySelectorAll('.article-playlists')
    for (var i = 0; i < getAllArticles.length; i++) {
    var id = document.getElementsByTagName('article')[i].id;
    }

    console.log(id);
    const response = await fetch('/api/playlists/favorite', {
        method: 'PUT',
        body: JSON.stringify({
            playlist_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

const getFavorite = document.querySelectorAll('.favorite');

getFavorite.forEach(favorite => favorite.addEventListener('click', favoriteClickHandler))
// document.querySelector('.favorite-btn').addEventListener('click', favoriteClickHandler);