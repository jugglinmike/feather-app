export const SET_FOCUSED_WEEK = 'SET_FOCUSED_WEEK';

export function set(date) {
	return {
		type: SET_FOCUSED_WEEK,
		date
	};
}
