import axios from 'axios';
import config from '../config'

export const userService = {
  login,
  logout,
  getAlbumData,
  getPhotoData,
  loadMorePhotoData
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
  //fetches albums based on config setting
  const albumUrl = `${config.baseApi}/${userID}?fields=albums.limit(${config.photoCount}){name,count,cover_photo{picture}}`;

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
  //fetches photos from specific album based on config setting
  const albumUrl = `${config.baseApi}/${albumid}?fields=photos.limit(${config.photoCount}){picture,images}`;

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

function loadMorePhotoData(nextPage, accessToken) {
  return axios.get(
    nextPage,
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