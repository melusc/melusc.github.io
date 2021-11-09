import {h} from 'preact';
import {useEffect} from 'preact/hooks';

import projects_ from '../projects.json';

type ProjectType = (
	| {
			type: 'anchor';
			href: string;
			short_description: string;
			description: string;
	  }
	| {
			type: 'title';
	  }
) & {
	key: string;
	text: string;
};
type ProjectsType = ProjectType[];

const projects = projects_ as ProjectsType;

const Project = ({project}: {project: ProjectType}) => {
	const {text, key} = project;

	const id = `#${key}`;

	if (project.type === 'title') {
		return (
			<div class="project-row title">
				<a href={id} class="id-anchor">
					#
				</a>
				<h1 id={key}>{text}</h1>
			</div>
		);
	}

	const {href, description} = project;

	return (
		<div class="project-row">
			<a href={id} class="id-anchor">
				#
			</a>
			<div class="project" id={key}>
				<a href={href}>{text}</a>
				<div>{description}</div>
				<div />
			</div>
		</div>
	);
};

export const Projects = () => {
	useEffect(() => {
		if (location.hash) {
			try {
				document.querySelector(location.hash)?.scrollIntoView();
			} catch (error: unknown) {
				console.error(error);
			}
		}
	}, []);

	return (
		<div class="projects">
			{projects.map(project => (
				<Project
					key={project.key /* this has to be unique since they're folders */}
					project={project}
				/>
			))}
		</div>
	);
};
