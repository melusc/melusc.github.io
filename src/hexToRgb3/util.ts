const isOfType = <T>( key: unknown, list: ReadonlyArray<T> ): key is T => list.includes( key as T );

export { isOfType };
