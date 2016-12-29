/* jshint worker: true */
import diff from 'virtual-dom/diff';
import serializePatch from 'vdom-serialized-patch/serialize';
import fromJson from 'vdom-as-json/fromJson';
import app from './views/app';
import configureStore from './configure-store';

const initialState = {
  count: 0,
  url: '/'
};
const store = configureStore(initialState);
let currentVDom;

// messages from the main thread come
// in here
self.onmessage = ({data}) => {
  if (data.type === 'start') {
    currentVDom = fromJson(data.virtualDom);
  }

  store.dispatch(data);
};

store.subscribe(function() {
  const state = store.getState();

  // our entire app in one line:
  const newVDom = app(state);

  // do the diff
  const patches = diff(currentVDom, newVDom);

  // cache last vdom so we diff against
  // the new one the next time through
  currentVDom = newVDom;

  // send patches and current url back to the main thread
  self.postMessage({url: state.url, payload: serializePatch(patches)});
});
