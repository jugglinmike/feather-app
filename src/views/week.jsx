import moment from 'moment';

import peopleNames from '../bocoupers.json';

let projectTypes = ['Perch', 'Consulting', 'Administrative'];
let projectNames = [
	'Greenpeace Design Deal', 'bocoup.com', 'Skillsoft: Artisan project',
	'ProQuest Text & Data Mining', 'HBP', 'BC Dev Environment'
];

function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function gen(name) {
	let utils = [];
	let total = 5;
	let available = 5;
	let currentLength;

	while (available > 0) {
		currentLength = Math.floor(Math.random() * available) + 1;
		utils.push({
			name: pick(projectNames),
			type: pick(projectTypes),
			begin: total - available,
			end: total - available + currentLength
		});
		available -= currentLength;
	}

	return { name: name, utils: utils };
}

export default function week(state) {
	let focusedWeek = moment(state.focusedWeek);
	let utils = peopleNames.map(gen);
	const prevWeekUrl = `/date/${focusedWeek.clone().subtract(1, 'weeks').format('YYYY-MM-DD')}/phase/1`;
	const nextWeekUrl = `/date/${focusedWeek.clone().add(1, 'weeks').format('YYYY-MM-DD')}/phase/1`;
	const allPhaseUrl = `/date/${focusedWeek.format('YYYY-MM-DD')}/`;
	const body = utils.map(function(person) {
			return <tr>
				<th>{person.name}</th>
				{person.utils.map(function(util) {
					let cells = [];
					let width = util.end - util.begin;
					while (cells.length < width) {
						cells.push(
							<td className={'day ' + util.type.toLowerCase()}>
								{util.name}
							</td>
						);
					}
					return cells;
				})}
			</tr>;
		});

	return <table>
		<thead>
			<tr>
				<th></th>
				<th><a href={prevWeekUrl}>&lt; Previous Week</a></th>
				<th></th>
				<th><a href={allPhaseUrl}>All Phases</a></th>
				<th></th>
				<th><a href={nextWeekUrl}>Next Week &gt;</a></th>
			</tr>
			<tr className="labels">
				<th></th>
				<th>Monday</th>
				<th>Tuesday</th>
				<th>Wednesday</th>
				<th>Thursday</th>
				<th>Friday</th>
			</tr>
		</thead>
		<tbody>{ body }</tbody>
	</table>;
}
