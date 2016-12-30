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

export default function week() {
	let utils = peopleNames.map(gen);

	return <table>
		<thead>
			<tr>
				<th></th>
				<th><a href="/week">&lt; Previous Week</a></th>
				<th></th>
				<th>All Phases</th>
				<th></th>
				<th><a href="/week">Next Week &gt;</a></th>
			</tr>
			<tr>
				<th></th>
				<th>Monday</th>
				<th>Tuesday</th>
				<th>Wednesday</th>
				<th>Thursday</th>
				<th>Friday</th>
			</tr>
		</thead>
		<tbody>
			{
				utils.map(function(person) {
					return <tr>
						<td>{person.name}</td>
						{person.utils.map(function(util) {
							let width = util.end - util.begin;
							return <td
								className={'day ' + util.type.toLowerCase()}
								colSpan={width}>
									{util.name}
								</td>;
						})}
					</tr>;
				})
			}
		</tbody>
	</table>;
}
