export type Project = (
	| {
			type: 'anchor';
			href: string;
			description: string;
	  }
	| {
			type: 'title';
	  }
) & {
	key: string;
	text: string;
};
