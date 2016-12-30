export const SET_FOCUSED_PHASE = 'SET_FOCUSED_PHASE';

export function set(phaseID) {
	return {
		type: SET_FOCUSED_PHASE,
		phaseID
	};
}
