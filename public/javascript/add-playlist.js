async function newFormHandler(event) {
  event.preventDefault();

  const playlistUrlInput = document.querySelector('input[name="playlist-url"]').value;
  const playlistUrlSplit = playlistUrlInput.split('/');
  const playlist_url = playlistUrlSplit[4];
  console.log(playlist_url);

  const response = await fetch(`/api/playlists`, {
    method: 'POST',
    body: JSON.stringify({
      playlist_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-playlist-form').addEventListener('submit', newFormHandler);