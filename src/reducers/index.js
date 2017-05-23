
import {combineReducers} from 'redux';

import contractors from './contractors';
import equipment from './equipment';


export default combineReducers({
  contractors,
  equipment
})

