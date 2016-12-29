import { INCREMENT_COUNT, DECREMENT_COUNT } from '../actions/count';

export default function count(state, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    default:
      return state || 0;
  }
}
