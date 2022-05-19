async function doSomething(id, value) {
    console.log(value)
    const response = await fetch('/api/playlists/favorite', {
        method: 'PUT',
        body: JSON.stringify({
            playlist_id: value
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

document.querySelector('.favorite-btn').addEventListener('click', doSomething);