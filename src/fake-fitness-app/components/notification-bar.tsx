import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';

import Battery from './battery';
import {Bluetooth, Signal, Wifi} from './icons';
import TimeInput from './time-input';

import '../styles/notification-bar.scss';

dayjs.extend(customParseFormat);

const NotificationBar: React.FC = () => (
	<div className='notification-bar'>
		<TimeInput className='clock' />
		<div className='battery-and-icons'>
			<Bluetooth />
			<Wifi />
			<Signal />
			<Battery />
		</div>
	</div>
);

export default NotificationBar;
