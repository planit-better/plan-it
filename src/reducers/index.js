
import {combineReducers} from 'redux';

import contractors from './contractors';
import equipment from './equipment';
import guest from './guest';

export default combineReducers({
  contractors,
  equipment,
  guest
})

