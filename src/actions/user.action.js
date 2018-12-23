import { userConstants } from '../constants';
import { userService } from '../service';
import { history } from '../store';

export const userActions = {
    login,
    logout,
    getAlbums,
    getPhotos,
    getMorePhotos
};

function login(response) {
    return dispatch => {
        dispatch(request({response}));
        userService.login(response)
            .then(
              response => { 
                    dispatch(success(response));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAlbums(userID, accessToken) {
  return dispatch => {
      dispatch(request());

      userService.getAlbumData(userID, accessToken)
          .then(
              albums => dispatch(success(albums)),
              error => dispatch(failure(error))
          );
  };

  function request() { return { type: userConstants.GETALL_ALBUMS_REQUEST } }
  function success(albums) { return { type: userConstants.GETALL_ALBUMS_SUCCESS, albums } }
  function failure(error) { return { type: userConstants.GETALL_ALBUMS_FAILURE, error } }
}

function getPhotos(albumid, accessToken) {
    return dispatch => {
        dispatch(request());
  
        userService.getPhotoData(albumid, accessToken)
            .then(
                photos => dispatch(success(photos)),
                error => dispatch(failure(error))
            );
    };
  
    function request() { return { type: userConstants.GETALL_PHOTOS_REQUEST } }
    function success(photos) { return { type: userConstants.GETALL_PHOTOS_SUCCESS, photos } }
    function failure(error) { return { type: userConstants.GETALL_PHOTOS_FAILURE, error } }
  }

  function getMorePhotos(nextPage, accessToken) {
    return dispatch => {
        dispatch(request());
  
        userService.loadMorePhotoData(nextPage, accessToken)
            .then(
                photos => dispatch(success(photos)),
                error => dispatch(failure(error))
            );
    };
  
    function request() { return { type: userConstants.LOADMORE_PHOTOS_REQUEST } }
    function success(photos) { return { type: userConstants.LOADMORE_PHOTOS_SUCCESS, photos } }
    function failure(error) { return { type: userConstants.LOADMORE_PHOTOS_FAILURE, error } }
  }