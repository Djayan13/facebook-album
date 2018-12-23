import axios from 'axios';
import config from '../config'

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
  //fetches 10 albums 
  const albumUrl = `${config.baseApi}/${userID}?fields=albums.limit(10){name,count,cover_photo{picture}}`;

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
  //fetches 20 photos from specific album
  const albumUrl = `${config.baseApi}/${albumid}?fields=photos.limit(20){picture,images}`;

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