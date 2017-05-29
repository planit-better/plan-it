
import {combineReducers} from 'redux';

import contractors from './contractors';
import equipment from './equipment';
import guest from './guest';
import menu from './menu';
import task from './task';
import user from './user';
import authenticate from './authenticate';
import event from './event';
import eventStatus from './eventStatus';

export default combineReducers({
  contractors,
  equipment,
  guest,
  menu,
  task,
  user,
  authenticate,
  event,
  eventStatus
});

