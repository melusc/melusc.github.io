<script lang="ts">
	import type {Project} from '../project.d';

	export let project: Project;
	$: ({text, key} = project);
	$: id = `#${key}`;
</script>

{#if project.type === 'title'}
	<div class="project-row title">
		<a href={id} class="id-anchor">#</a>
		<h1 id={key}>{text}</h1>
	</div>
{:else}
	<div class="project-row">
		<a href={id} class="id-anchor">#</a>
		<div class="single-project" id={key}>
			<a href={project.href}>{text}</a>
			<div>{project.description}</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use 'sass:color';
	@import '../../../common/theme.scss';

	.title {
		grid-template-columns: 2em auto;
		width: max-content;
		align-self: center;
	}

	.project-row {
		display: grid;

		grid-template-columns: 2em 1fr;

		align-items: center;
		margin-right: 2em;

		&:hover {
			.id-anchor {
				visibility: visible;
			}

			.single-project {
				background-color: color.adjust($card, $lightness: 1%);

				transform: scale(0.98);
			}
		}
	}

	.single-project {
		background-color: $card;

		border-radius: 5px;

		min-height: 25vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 1em 2em;

		transition: transform ease 0.2s;

		// box-shadow: 3px 3px 7px color.adjust($card, $lightness: -5%);

		> a {
			margin-bottom: 1em;
			font-size: 1.2em;
		}
	}

	h1 {
		text-align: center;
	}
	.id-anchor {
		visibility: hidden;
		padding: 1em;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
	}

	@media (max-width: 500px) {
		.single-project {
			min-height: 15vh;
			padding: 1em;
		}

		.project-row {
			&:focus {
				> a {
					visibility: visible;
				}
			}
		}
	}
</style>
