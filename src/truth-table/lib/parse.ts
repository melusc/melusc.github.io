import {replaceMappings, logicalOperators} from './mappings';
import {groupBrackets} from './group-brackets';

export type Variables = Set<string>;
export type AST =
	| {
			operation: string;
			values: [string | AST, string | AST];
	  }
	| {
			operation: 'plain';
			values: [string | AST];
	  };
export type Parsed = {
	variables: Variables;
	ast: AST;
	translated: string;
};

export const parse = (raw: string) => {
	const translated = replaceMappings(raw);
	// Spaces are not required at this point
	const noSpaces = translated.replace(/\s+/g, '');
	const variables = new Set<string>();
};
