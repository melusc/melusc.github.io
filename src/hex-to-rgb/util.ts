const isOfType = <T>(key: unknown, list: readonly T[]): key is T =>
	list.includes(key as T);

export {isOfType};
