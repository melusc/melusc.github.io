import React, {useState, useRef, useEffect, useContext} from 'react';
import {LocaleContext} from './locale';

type AcceptedTypes =
	| string
	| number
	| boolean
	| bigint
	| Date
	| Array<string | number>;

type FakerModule<Keys extends string> = Record<Keys, () => AcceptedTypes>;

type Timeout = ReturnType<typeof setTimeout>;

const toString = (input: AcceptedTypes): string => {
	// eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
	switch (typeof input) {
		case 'string':
			return input;
		case 'bigint':
		case 'number':
		case 'boolean':
			return String(input);
		// no default
	}

	if (input instanceof Date) {
		return input.toISOString();
	}

	if (Array.isArray(input)) {
		return input.join(',');
	}

	throw new Error(`Unexpected input ${typeof input} "${String(input)}"`);
};

const RedoIcon: React.FC = () => (
	<svg fill='currentColor' viewBox='0 0 16 16'>
		<path
			fillRule='evenodd'
			d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
		/>
		<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
	</svg>
);

const ClipboardButton: React.FC<{value: string}> = ({value}) => {
	const [validity, setValidity] = useState<'initial' | 'valid' | 'invalid'>(
		'initial',
	);

	const timeout = useRef<Timeout | undefined>(undefined);

	const setValidity_ = (validity: 'valid' | 'invalid'): void => {
		// Reset animation
		setValidity('initial');

		setTimeout(() => {
			// After react has re-rendered
			// and the css animation has reset
			// Otherwise the previous would finish and never replay
			setValidity(validity);

			if (timeout.current) {
				clearTimeout(timeout.current);
			}

			timeout.current = setTimeout(() => {
				setValidity('initial');
			}, 3000);
		});
	};

	const onClick = async (): Promise<void> => {
		try {
			await navigator.clipboard.writeText(value);
			setValidity_('valid');
		} catch {
			setValidity_('invalid');
		}
	};

	return (
		<button className='method-clipboard' type='button' onClick={onClick}>
			<svg fill='currentColor' viewBox='0 0 16 16'>
				{validity === 'valid' && (
					<path
						className='clipboard-fade'
						fillRule='evenodd'
						d='M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z'
					/>
				)}
				{validity === 'invalid' && (
					<path
						className='clipboard-fade'
						fillRule='evenodd'
						d='M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z'
					/>
				)}
				<path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z' />
				<path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z' />
			</svg>
		</button>
	);
};

const Method: React.FC<{
	title: string;
	method: () => AcceptedTypes;
}> = ({title, method}) => {
	const locale = useContext(LocaleContext);
	const [result, setResult] = useState(() => toString(method()));

	const regenerate = (): void => {
		setResult(() => toString(method()));
	};

	useEffect(() => {
		regenerate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locale]);

	return (
		<div className='method'>
			<div className='method-title'>{title}</div>
			<input readOnly className='method-result' value={result} />
			<ClipboardButton value={result} />
			<button className='method-regenerate' type='button' onClick={regenerate}>
				<RedoIcon />
			</button>
		</div>
	);
};

export const Module = <
	Module extends FakerModule<Keys>,
	Keys extends keyof Module & string,
>({
	module,
	keys,
	title,
}: {
	module: Module;
	keys: Keys[];
	title: string;
}): React.ReactElement => (
	<details className='module'>
		<summary>
			<h2 className='module-title'>{title}</h2>
		</summary>
		{keys.map(key => (
			<Method key={key} title={key} method={module[key]} />
		))}
	</details>
);
