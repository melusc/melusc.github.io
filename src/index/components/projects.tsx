import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';

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

const fetchFolders = async (): Promise<ProjectsType> =>
	fetch('/index/projects.json').then(async response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json() as Promise<ProjectsType>;
	});

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
	const [folderNames, setFolderNames] = useState<ProjectsType | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		fetchFolders()
			.then(folders => {
				setFolderNames(folders);
			})
			.catch((error: Error) => {
				setErrorMessage(error.message);
			});
	}, []);

	useEffect(() => {
		if (location.hash) {
			try {
				document.querySelector(location.hash)?.scrollIntoView();
			} catch (error: unknown) {
				console.error(error);
			}
		}
	}, [folderNames]);

	if (typeof errorMessage === 'string') {
		return <div class="error">{errorMessage}</div>;
	}

	return (
		<div class="projects">
			{folderNames?.map(project => (
				<Project
					key={project.key /* this has to be unique since they're folders */}
					project={project}
				/>
			))}
		</div>
	);
};
