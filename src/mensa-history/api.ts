import {makeStore} from '../public/shared/suspense-store';

export type MenuResult = {
	title: string;
	menu: string[][][];
	version: number;
};

export const getMenus = makeStore<MenuResult, [string]>(
	async (url, {signal}): Promise<MenuResult> => {
		const response = await fetch(url, {
			headers: {
				Accept: 'application/vnd.github.raw',
			},
			signal,
		});
		if (!response.ok) {
			throw new Error(`Error ${response.status}`);
		}

		return response.json() as Promise<MenuResult>;
	},
);

export type MenuMeta = Array<{
	url: string;
	path: string;
}>;

export const getMenuFiles = makeStore(async ({signal}): Promise<MenuMeta> => {
	const response = await fetch(
		'https://api.github.com/repos/melusc/mensa-history/git/trees/data',
		{
			headers: {
				Accept: 'application/vnd.github+json',
			},
			signal,
		},
	);
	if (!response.ok) {
		throw new Error(`Error ${response.status} ${response.statusText}`);
	}

	const json = (await response.json()) as {
		tree: MenuMeta;
	};

	return json.tree.filter(({path}) => path.endsWith('.json'));
});
