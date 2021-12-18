import React, {useEffect} from 'react';

import projects_ from '../projects.json';
import '../styles/projects.scss';

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

const Project: React.FC<{
	project: ProjectType;
}> = ({project}) => {
	const {text, key} = project;

	const id = `#${key}`;

	if (project.type === 'title') {
		return (
			<div className="project-row title">
				<a href={id} className="id-anchor">
					#
				</a>
				<h1 id={key}>{text}</h1>
			</div>
		);
	}

	const {href, description} = project;

	return (
		<div className="project-row">
			<a href={id} className="id-anchor">
				#
			</a>
			<div className="project" id={key}>
				<a href={href}>{text}</a>
				<div>{description}</div>
				<div />
			</div>
		</div>
	);
};

export const Projects: React.FC = () => {
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
		<div className="projects">
			{projects.map(project => (
				<Project key={project.key} project={project} />
			))}
		</div>
	);
};
