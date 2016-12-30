import { incrementCount, decrementCount } from '../actions/count';
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

export default function({count}) {
  let utils = peopleNames.map(gen);

  return (
  <div>
    <button data-click={incrementCount()}> - </button>
    <span> {count} </span>
    <button data-click={decrementCount()}> + </button>
	<table>
		<tr>
			<td></td>
			<td>Monday</td>
			<td>Tuesday</td>
			<td>Wednesday</td>
			<td>Thursday</td>
			<td>Friday</td>
		</tr>
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
	</table>
  </div>
  );
};
