import '../styles/help.scss';

const Help: React.FC = () => (
	<div className='help'>
		<div className='help-text'>
			Using Firefox? Use{' '}
			<code>
				:screenshot --dpr &lt;number&gt; --selector &apos;.fake-app&apos;
			</code>{' '}
			in the web console
		</div>
	</div>
);

export default Help;
