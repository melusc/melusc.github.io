import {h} from 'preact';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

import {Wifi, Bluetooth, Signal} from './icons';
import Battery from './battery';
import TimeInput from './time-input';

import '../styles/notification-bar.scss';

dayjs.extend(customParseFormat);

const NotificationBar = (): h.JSX.Element => (
	<div class="notification-bar">
		<TimeInput class="clock" />
		<div class="battery-and-icons">
			<Bluetooth />
			<Wifi />
			<Signal />
			<Battery />
		</div>
	</div>
);

export default NotificationBar;
