import { SET_URL } from '../actions/url.js';

export default function url(state, action) {
  switch (action.type) {
    case 'start':
    case SET_URL:
      return action.url
    default:
      return state || '/';
  }
}
