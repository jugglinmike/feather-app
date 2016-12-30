import moment from 'moment';

import {set as setFocusedWeek} from './actions/focused-week';
import {set as setFocusedPhase} from './actions/focused-phase';

export function fromState(state) {
	let url = '/';
	if (!state.focusedWeek) {
		return url;
	}

	url += 'date/' + moment(state.focusedWeek).format('YYYY-MM-DD') + '/';

	if (!state.focusedPhase) {
		return url;
	}

	return url + 'phase/' + state.focusedPhase + '/';
};

export function toActions(url) {
	let actions = [];
	let match = /^\/date\/([0-9-]+)\/?(?:phase\/([0-9]+)\/?)?$/.exec(url);

	if (match) {
		actions.push(setFocusedWeek(moment(match[1]).toDate()));

		if (match[2]) {
			actions.push(setFocusedPhase(match[2]));
		} else {
			actions.push(setFocusedPhase(null));
		}
	}

	return actions;
};
