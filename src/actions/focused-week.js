import { fetchMissing as fetchMissingPhases } from './phases';

export const SET_FOCUSED_WEEK = 'SET_FOCUSED_WEEK';

export function set(date) {
	return (dispatch) => {
		return dispatch(fetchMissingPhases(date))
			.then(() => {
				return dispatch({
					type: SET_FOCUSED_WEEK,
					date
				});
			});
		};
}
