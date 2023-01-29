import App from './App.svelte';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app = new App({
	target: document.querySelector('#app')!,
});

export default app;
