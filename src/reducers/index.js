import { combineReducers } from 'redux';
import count from './count';
import focusedWeek from './focused-week';
import focusedPhase from './focused-phase';
import phases from './phases';

export default combineReducers({ count, focusedWeek, focusedPhase, phases });
