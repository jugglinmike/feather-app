import { SET_FOCUSED_PHASE } from '../actions/focused-phase';

export default function focusedPhase(state, action) {
	switch (action.type) {
		case SET_FOCUSED_PHASE:
			return action.phaseID;
		default:
			return state || 0;
	}
}
