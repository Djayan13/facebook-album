import { userConstants } from '../constants';


export function albums(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_ALBUMS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_ALBUMS_SUCCESS:
      return action.albums;
    case userConstants.GETALL_ALBUMS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}