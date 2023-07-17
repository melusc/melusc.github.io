type EventHandler<Detail> = (event: CustomEvent<Detail>) => void;

export class TypedEventTarget<EventMap extends Record<string, unknown>> {
	// Doing this instead of `extends EventTarget` and `super.blabla()`
	// because that way it can only have the methods it needs
	// and overriding the original methods doesn't work
	// because the original and new methods are not compatible
	#eventTarget = new EventTarget();

	on<Event extends keyof EventMap & string>(
		name: Event,
		callback: EventHandler<EventMap[Event]>,
	): void {
		// @ts-expect-error CustomEvent has .detail and only CustomEvents are dispatched here
		// Typescript doesn't know that, it thinks Events can be dispatched, too
		this.#eventTarget.addEventListener(name, callback);
	}

	off<Event extends keyof EventMap & string>(
		name: Event,
		callback: EventHandler<EventMap[Event]>,
	): void {
		// @ts-expect-error Same as above
		this.#eventTarget.removeEventListener(name, callback);
	}

	protected emit<Event extends keyof EventMap & string>(
		name: Event,
		detail: EventMap[Event],
	): boolean {
		return this.#eventTarget.dispatchEvent(new CustomEvent(name, {detail}));
	}
}
