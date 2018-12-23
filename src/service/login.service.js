import axios from 'axios';

export const userService = {
  login,
  logout,
  getAlbumData,
  getPhotoData
};

function login(response) {
  if (response) {
    localStorage.setItem('user', JSON.stringify(response));
  }
  return response;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  window.FB.logout();
  return true;
}

function getAlbumData(userID, accessToken) {
  const albumUrl = `https://graph.facebook.com/v3.2/${userID}?fields=albums.limit(10){name,count,cover_photo{picture}}`;

  return axios.get(
    albumUrl,
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  )
    .then(response => {
      return response.data
    }).catch(function (error) {
      console.log(error);
    });
}

function getPhotoData(albumid, accessToken) {
  const albumUrl = `https://graph.facebook.com/v3.2/${albumid}?fields=photos.limit(20){picture,images}`;

  return axios.get(
    albumUrl,
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  )
    .then(response => {
      return response.data
    }).catch(function (error) {
      console.log(error);
    });
}