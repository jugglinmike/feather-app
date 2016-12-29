import { incrementCount, decrementCount } from '../actions/count';

export default ({count}) => (
  <div>
    <p>This app weighs about 8.5kb</p>
    <button data-click={incrementCount()}> - </button>
    <span> {count} </span>
    <button data-click={decrementCount()}> + </button>
  </div>
)
