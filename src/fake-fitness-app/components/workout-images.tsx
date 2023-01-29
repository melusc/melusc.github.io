import {Photo} from './icons';

import '../styles/workout-images.scss';

const WorkoutImages: React.FC = () => (
	<div className='workout-images'>
		<div className='workout-images-title'>Images</div>
		<Photo className='workout-image-preview' />
	</div>
);

export default WorkoutImages;
