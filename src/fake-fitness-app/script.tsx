import {h, render} from 'preact';
import {useState} from 'preact/hooks';

import NotificationBar from './components/notification-bar';
import Navbar from './components/navbar';
import MainAppDateTime from './components/main-app-date-time';
import TimeOverview from './components/time-overview';
import WorkoutDetails from './components/workout-details';
import WorkoutImages from './components/workout-images';
import Help from './components/help';

import * as CONSTS from './scripts/consts';

const Main = () => {
	const [sizes, updateSize] = useState({width: 1440, height: 2960});

	const [duration, setDuration] = useState(CONSTS.duration);
	const [distance, setDistance] = useState(CONSTS.distance);

	const handleSizeInput
		= (key: 'width' | 'height'): h.JSX.GenericEventHandler<HTMLInputElement> =>
		event_ => {
			const value = Number(event_.currentTarget.value.trim());

			if (Number.isInteger(value)) {
				updateSize({
					...sizes,
					[key]: value,
				});
			}
		};

	const biggestSize = Math.max(sizes.height, sizes.width);

	return (
		<div class="App">
			<div class="inputs">
				<div>
					<label htmlFor="width">Width:</label>
					<input
						id="width"
						type="number"
						placeholder="width"
						value={sizes.width}
						onInput={handleSizeInput('width')}
					/>
				</div>
				<div>
					<label htmlFor="height">Height:</label>
					<input
						id="height"
						type="number"
						placeholder="height"
						value={sizes.height}
						onInput={handleSizeInput('height')}
					/>
				</div>
			</div>
			<div
				style={{
					width: `${(sizes.width / biggestSize) * 100}vmin`,
					height: `${(sizes.height / biggestSize) * 100}vmin`,
				}}
				class="fake-app"
			>
				<NotificationBar />
				<Navbar />
				<MainAppDateTime duration={duration} />
				<TimeOverview setDuration={setDuration} setDistance={setDistance} />
				<WorkoutDetails duration={duration} distance={distance} />
				<WorkoutImages />
			</div>
			<Help />
		</div>
	);
};

const root = document.querySelector('#root');

if (root) {
	render(<Main />, root);
}
