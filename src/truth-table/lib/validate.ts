import {StringWithIndices} from './string-with-indices';

import {validateMatchedBrackets} from './validate-matched-brackets';
import {validateCharacters} from './validate-characters';
import {validateEmptyBrackets} from './validate-empty-brackets';
import {validateOperators} from './validate-operators';

export const validate = (input: StringWithIndices[]) => {
	validateCharacters(input);
	validateOperators(input);
	validateMatchedBrackets(input);
	validateEmptyBrackets(input);
};
