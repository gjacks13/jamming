let accessToken = "";
let expirationTime = 1;
const clientId = "79357daa00cd438484f142e88460e618";
const redirectUri = "http://localhost:3000/";
//https://accounts.spotify.com/authorize

const Spotify = {
  getAccessToken: function() {
    if (accessToken) {
      return accessToken;
    } else {
      let authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
      let accessTokenRegex = /access_token=([^&]*)/;
      let expirationRegex = /expires_in=([^&]*)/;
      
      accessToken = window.location.href.match(accessTokenRegex)[0];
      expirationTime = window.location.href.match(expirationRegex)[0];

      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');

      // redirect to the authorization page
      window.location(authorizeURL);
    }
  },

  search(searchTerm) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(jsonResponse => {
            let tracks = [];
            if (jsonResponse.tracks.items.length > 0) {
              tracks = jsonResponse.tracks.items.map(jsonTrack => {
                let track = {};
                track.id = jsonTrack.id;
                track.name = jsonTrack.name;
                track.artist = jsonTrack.artists[0].name;
                track.album = jsonTrack.album.name;
                track.uri = jsonTrack.uri; 
                return track;
              });
            }
            resolve(tracks);
          });
        }
        reject(new Error("Failed to get tracklist."));
      });
    });
  },

  savePlaylist(playListName, uriList) {
    if (playListName && uriList) {
      let accessToken = this.getAccessToken;
      let headers = {'Authorization': `Bearer ${accessToken}`};
      let userId = "";
      let playListId = "";

      fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        if (response.ok) {
          response.json().then(jsonResponse => {
            userId = jsonResponse.id;

            fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'post',
              headers: headers
            }).then(function(response) {
              if (response.ok) {
                response.json().then(jsonResponse => {
                  playListId = jsonResponse.id;
                  let headersWContent = headers;
                  headersWContent['Content-Type'] = "application.json";

                  fetch(`https://api.spotify.com//v1/users/${userId}/playlists/${playListId}/tracks`, {
                    method: 'post',
                    headers: headersWContent,
                    body: JSON.stringify(uriList)
                  }).then(function(response) {
                    if (response.ok) {
                      response.json().then(jsonResponse => {
                        playListId = jsonResponse.id;
                      });
                    }
                    throw new Error("Failed to create playlist.");
                  });
                });
              }
              throw new Error("Failed to create playlist.");
            });
          });
        }
        throw new Error("Failed to retrieve username.");
      });
    } else {
      return;
    }
  }

  
};

export default Spotify;