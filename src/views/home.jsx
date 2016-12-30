import { incrementCount, decrementCount } from '../actions/count';

export default ({count}) => (
  <div>
    <button data-click={incrementCount()}> - </button>
    <span> {count} </span>
    <button data-click={decrementCount()}> + </button>
  </div>
);
