type Status = 'pending' | 'success' | 'error';

type Cache<T> = {
	get(): T;
	abort(): void;
};

class RecursiveCache<T> {
	value: T | undefined = undefined;
	#children = new Map<unknown, RecursiveCache<T>>();

	get(args: readonly unknown[]): T | undefined {
		if (args.length === 0) {
			return this.value;
		}

		const [first, ...rest] = args;

		return this.#children.get(first)?.get(rest);
	}

	set(args: readonly unknown[], value: T): void {
		if (args.length === 0) {
			this.value = value;
			return;
		}

		const [first, ...rest] = args;
		if (!this.#children.has(first)) {
			this.#children.set(first, new RecursiveCache<T>());
		}

		this.#children.get(first)!.set(rest, value);
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const makeStore = <R, Args extends readonly unknown[] = []>(
	cb: (...args: [...Args, {signal: AbortSignal}]) => Promise<R>,
): {
	get: (...args: Args) => R;
	abort: (...args: Args) => void;
	prefetch: (...args: Args) => void;
} => {
	const cache = new RecursiveCache<Cache<R>>();

	const makeInstance = (args: Args): Cache<R> => {
		let status: Status = 'pending';
		let result: R;
		let error: unknown;
		const controller = new AbortController();

		const promise = cb(...args, {
			signal: controller.signal,
		}).then(
			r => {
				result = r;
				status = 'success';
			},
			error_ => {
				error = error_;
				status = 'error';
			},
		);

		return {
			abort(): void {
				controller.abort();
			},
			get(): R {
				if (status === 'success') {
					return result!;
				}

				if (status === 'pending') {
					// eslint-disable-next-line @typescript-eslint/no-throw-literal
					throw promise;
				}

				if (status === 'error') {
					throw error;
				}

				throw new Error('unreachable');
			},
		};
	};

	const result = {
		get(...args: Args): R {
			result.prefetch(...args);

			return cache.get(args)!.get();
		},
		abort(...args: Args): void {
			cache.get(args)?.abort();
		},
		prefetch(...args: Args): void {
			let cached = cache.get(args);
			if (!cached) {
				cached = makeInstance(args);
				cache.set(args, cached);
			}
		},
	};

	return result;
};
