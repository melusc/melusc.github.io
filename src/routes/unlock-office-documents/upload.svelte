<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import XlsxIcon from './icons/xlsx.svelte';
	import DocxIcon from './icons/docx.svelte';
	import UploadIcon from './icons/upload.svelte';

	let name = $state<string>();
	let type = $state<'xlsx' | 'docx'>();
	let input = $state<HTMLInputElement>();
	let form = $state<HTMLFormElement>();
	let isDraggingOver = $state(false);
	let isInvalidFileDrag = $state(false);

	const dispatch = createEventDispatcher<{
		input: {
			file: File;
			name: string;
		};
	}>();

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const IconComponent = $derived(
		type === undefined ? UploadIcon : (type === 'docx' ? DocxIcon : XlsxIcon),
	);

	const types = {
		xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	};
	function isValidFile(file: {type: string}): boolean {
		return file.type === types.xlsx || file.type === types.docx;
	}

	function dispatchFile(file: File): void {
		name = file.name;
		type = file.type === types.docx ? 'docx' : 'xlsx';
		dispatch('input', {file, name});
	}

	function handleInput(event: Event): void {
		event.preventDefault();

		const file = input!.files?.[0];

		if (file && isValidFile(file)) {
			dispatchFile(file);
		} else {
			name = undefined;
			form!.reset();
		}
	}

	function handleDrop(event: DragEvent): void {
		event.preventDefault();

		const file = event.dataTransfer?.files[0];
		if (file && isValidFile(file)) {
			dispatchFile(file);
		}

		isDraggingOver = false;
		isInvalidFileDrag = false;
	}

	function handleDragOver(event: DragEvent): void {
		event.preventDefault();

		if (event.dataTransfer!.types.includes('Files')) {
			isDraggingOver = true;
			const file = event.dataTransfer?.items[0];
			if (file && isValidFile(file)) {
				isInvalidFileDrag = false;
				event.dataTransfer.dropEffect = 'copy';
			} else {
				isInvalidFileDrag = true;
				event.dataTransfer!.dropEffect = 'none';
			}
		}
	}

	function handleDragLeave(event: Event): void {
		event.preventDefault();

		isDraggingOver = false;
		isInvalidFileDrag = false;
	}

	function handleClick(): void {
		input!.click();
	}
	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			input!.click();
		}
	}
</script>

<div
	class="upload-form"
	class:invalid-drag={isInvalidFileDrag}
	class:dragging-over={isDraggingOver}
	onclick={handleClick}
	onkeydown={handleKeydown}
	ondrop={handleDrop}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	role="button"
	tabindex="0"
>
	<form bind:this={form}>
		<input
			type="file"
			accept=".docx,.xlsx"
			style:display="none"
			bind:this={input}
			oninput={handleInput}
		/>
	</form>

	<div class="icon">
		<IconComponent />
	</div>

	<div class="upload-info">
		{#if name}
			{name}
		{:else if isDraggingOver}
			Drop file here
		{:else}
			Upload a file (.docx, .xlsx)
		{/if}
	</div>
</div>

<style>
	.upload-form {
		cursor: pointer;

		width: 80vw;
		height: 80vw;

		display: grid;
		place-items: center;

		grid-template-rows: 3fr 3fr 1fr 2fr;

		border-radius: 10px;
		border: var(--border) 7px dashed;
	}

	.upload-info {
		font-size: 1.2em;
	}

	.icon {
		width: 25%;
		grid-row: 2;
	}

	.dragging-over {
		border-color: var(--blue);
	}

	.invalid-drag {
		cursor: not-allowed;
	}

	@media (min-width: 800px) {
		.upload-form {
			width: 50vw;
			height: 50vw;
		}
	}

	@media (min-width: 1200px) {
		.upload-form {
			width: 40vw;
			height: 40vw;
		}
	}

	@media (min-width: 1400px) {
		.upload-form {
			width: 30vw;
			height: 30vw;
		}
	}
</style>
