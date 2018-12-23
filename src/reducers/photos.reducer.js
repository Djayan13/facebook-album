import { userConstants } from '../constants';


export function photos(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_PHOTOS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_PHOTOS_SUCCESS:
      return action.photos;
    case userConstants.GETALL_PHOTOS_FAILURE:
      return { 
        error: action.error
      };
      case userConstants.LOADMORE_PHOTOS_REQUEST:
      return {
        loading: true
      };
    case userConstants.LOADMORE_PHOTOS_SUCCESS:
      return {
        photos:action.photos
      };
    case userConstants.LOADMORE_PHOTOS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}