import React from 'react';

import {Photo} from './icons';

import '../styles/workout-images.scss';

const WorkoutImages = (): JSX.Element => (
	<div className="workout-images">
		<div className="workout-images-title">Images</div>
		<Photo />
	</div>
);

export default WorkoutImages;
