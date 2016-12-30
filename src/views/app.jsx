import moment from 'moment';

import phases from './phases';
import week from './week'

export default (state) => {
  let page

  if (!state.focusedWeek || !state.focusedPhase) {
    page = phases(state)
  } else {
    page = week(state)
  }

  return (
    <main>
      <h1>Weekly Review</h1>
      {page}
    </main>
  )
}
