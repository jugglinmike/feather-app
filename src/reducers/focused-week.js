import moment from 'moment';

import { SET_FOCUSED_WEEK } from '../actions/focused-week';

const defaultDate = moment()
	.day(0).hour(0).minute(0).second(0).millisecond(0).toDate();

export default function focusedWeek(state, action) {
	switch (action.type) {
		case SET_FOCUSED_WEEK:
			return action.date;
		default:
			return state || defaultDate;
	}
}
