import moment from 'moment';

// TODO: Place these in a dedicated (and tested) "phase selectors" module
function isActiveBetween(phase, before, after) {
	let { first_day: firstDay, last_day: lastDay } = phase;
	return moment(before).isBetween(firstDay, lastDay) ||
		moment(after).isBetween(firstDay, lastDay);
}

function activePhases(phases, before, after) {
	return Object.keys(phases).map((id) => {
		let phase = phases[id];
		if (isActiveBetween(phase, before, after)) {
			return phase;
		}
	}).filter(elem => !!elem);
}

export default function phases(state) {
	let focusedWeek = moment(state.focusedWeek);
	let weekMoments = [-2, -1, 0, 1, 2]
		.map((count) => focusedWeek.clone().add(count, 'weeks'));
	let dayHeadings = weekMoments.map((weekMoment) => {
		return <th>{weekMoment.format('M/D')}</th>
	});
	const prevWeekUrl = `/date/${focusedWeek.clone().subtract(1, 'weeks').format('YYYY-MM-DD')}/`;
	const nextWeekUrl = `/date/${focusedWeek.clone().add(1, 'weeks').format('YYYY-MM-DD')}/`;
	const body = activePhases(state.phases, weekMoments[0], weekMoments[4]).map((phase, idx) => {
		let weekCells = weekMoments.map((weekMoment) => {
			let reviewLink = '';

			if (isActiveBetween(phase, weekMoment, weekMoment.clone().add(1, 'weeks'))) {
				reviewLink = <a href={`/date/${weekMoment.format('YYYY-MM-DD')}/phase/${phase.id}`}>
					Review
				</a>;
			}

			return <td>{ reviewLink }</td>;
		});
		return <tr>
			<td className='phase-label'>
				<span className='project-name'>{phase.projectName}</span>
				<span className='phase-name'>{phase.name}</span>
			</td>
			{ weekCells }
		</tr>;
	});

	return <table>
		<thead>
			<tr>
				<th></th>
				<th><a href={prevWeekUrl}>&lt; Previous Week</a></th>
				<th></th>
				<th></th>
				<th></th>
				<th><a href={nextWeekUrl}>Next Week &gt;</a></th>
			</tr>
			<tr className='labels'>
				<th></th>
				{ dayHeadings }
			</tr>
		</thead>
		<tbody>{ body }</tbody>
	</table>;
};
