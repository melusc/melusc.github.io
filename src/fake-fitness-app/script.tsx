import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import NotificationBar from './components/notification-bar';
import Navbar from './components/navbar';
import MainAppDateTime from './components/main-app-date-time';
import TimeOverview from './components/time-overview';
import WorkoutDetails from './components/workout-details';
import WorkoutImages from './components/workout-images';
import Help from './components/help';

import * as CONSTS from './scripts/consts';

const Main: React.FC = () => {
	const [size, setSize] = useState({width: 1440, height: 2960});

	const [duration, setDuration] = useState(CONSTS.duration);
	const [distance, setDistance] = useState(CONSTS.distance);

	const handleSizeInput
		= (key: 'width' | 'height'): React.FormEventHandler<HTMLInputElement> =>
		(event_): void => {
			const value = Number(event_.currentTarget.value.trim());

			if (Number.isInteger(value)) {
				setSize({
					...size,
					[key]: value,
				});
			}
		};

	const biggestSize = Math.max(size.height, size.width);

	return (
		<div className="App">
			<div className="inputs">
				<div>
					<label htmlFor="width">Width:</label>
					<input
						id="width"
						type="number"
						placeholder="width"
						value={size.width}
						onInput={handleSizeInput('width')}
					/>
				</div>
				<div>
					<label htmlFor="height">Height:</label>
					<input
						id="height"
						type="number"
						placeholder="height"
						value={size.height}
						onInput={handleSizeInput('height')}
					/>
				</div>
			</div>
			<div
				style={{
					width: `${(size.width / biggestSize) * 100}vmin`,
					height: `${(size.height / biggestSize) * 100}vmin`,
				}}
				className="fake-app"
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
	ReactDOM.render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>,
		root,
	);
}
