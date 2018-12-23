import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { albums } from './albums.reducer';
import { photos } from './photos.reducer';

const rootReducer = combineReducers({
  authentication,
  albums,
  photos
});

export default rootReducer;