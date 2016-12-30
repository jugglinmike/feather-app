import moment from 'moment';

const phaseData = [
  { projectName: 'Other', name: 'Non-Administrative Staff' },
  { projectName: 'Other', name: 'All Coop Review' },
  { projectName: 'Skillsoft: Artisan project', name: 'Phase 1' },
  { projectName: 'Greenpeace Design Deal', name: 'Phase One' },
  { projectName: 'Bocoup.com', name: 'Phase 1' },
  { projectName: 'JavaScript on Things (Lyza\'s book)', name: 'Phase 1' },
  { projectName: 'In-Q-tel Virtual Valley MOU', name: 'MOU - VV 2nd Extension' },
  { projectName: 'HBP 2nd Re-engagement', name: 'HBP 2nd Re-engagement' },
  { projectName: 'Other', name: 'Admin Staff Only' },
  { projectName: 'T3 Live Continued Access', name: 'Second Three Months' },
  { projectName: 'AI Timeline', name: 'Phase 1 of 1' },
  { projectName: 'HBP Higher Ed Redesign 3rd re-engagement', name: '3 of 3' },
  { projectName: 'Boston College Continued Access', name: 'Second Three Months' },
  { projectName: 'Boston College Continued Access', name: 'Second six months' },
  { projectName: 'Automated Development Environment', name: 'Phase One' }
];

export default function phases(state) {
	let focusedWeek = moment(state.focusedWeek);
	let weekMoments = [-2, -1, 0, 1, 2]
		.map((count) => focusedWeek.clone().add(count, 'weeks'));
	let dayHeadings = weekMoments.map((weekMoment) => {
		return <th>{weekMoment.format('M/D')}</th>
	});
	const prevWeekUrl = `/date/${focusedWeek.clone().subtract(1, 'weeks').format('YYYY-MM-DD')}/`;
	const nextWeekUrl = `/date/${focusedWeek.clone().add(1, 'weeks').format('YYYY-MM-DD')}/`;
	const body = phaseData.map((phase, idx) => {
		let weekCells = weekMoments.map((weekMoment) => {
			return <td>
				<a href={`/date/${weekMoment.format('YYYY-MM-DD')}/phase/${idx}`}>Review</a>
			</td>;
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
