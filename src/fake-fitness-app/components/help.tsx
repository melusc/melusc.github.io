import {h} from 'preact';
import '../styles/help.scss';

const Help = () => (
	<div class="help">
		<div class="help-text">
			Using Firefox? Use{' '}
			<code>
				:screenshot --dpr &lt;number&gt; --selector &apos;.fake-app&apos;
			</code>{' '}
			in the web console
		</div>
	</div>
);

export default Help;
