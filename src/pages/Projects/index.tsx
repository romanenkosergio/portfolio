import React, { FC, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Accordion, Breadcrumbs } from 'components';
import ProjectItem from 'pages/Projects/ProjectItem';
import ProjectsTechnologies from 'pages/Projects/ProjectsTechnologies';

import { useContentfulStore } from 'store';
import { IContentfulProjectData } from 'store/useContentfulStore';

import './styles.scss';

const Projects: FC = () => {
  const { projects, activeTechnologies } = useContentfulStore(state => state);
  const [choosenTechnologies, setChoosenTechnologies] = useState<string[]>([]);

  const handleTechnologies = (technology: string) => {
    if (choosenTechnologies.includes(technology)) {
      const newTechnologies = choosenTechnologies.filter(
        activeTechnology => activeTechnology !== technology
      );
      setChoosenTechnologies(newTechnologies);
    } else {
      setChoosenTechnologies([...choosenTechnologies, technology]);
    }
  };

  const clearTechnologies = () => setChoosenTechnologies([]);

  const filteredProjects = useMemo(() => {
    return !choosenTechnologies.length
      ? projects
      : projects?.filter(project =>
          choosenTechnologies.includes(project.projectTechnologies)
        );
  }, [projects, choosenTechnologies]);

  return (
    <>
      <Helmet>
        <title>My projects</title>
        <meta
          name="description"
          content="Explore My Projects! Discover a diverse range of web applications built with various cutting-edge technologies. See my coding expertise in action."
        />
      </Helmet>
      <div className="projects">
        <div className="projects-drawer drawer">
          <Accordion title="projects" isOpen>
            <div className="projects-drawer__content">
              <ProjectsTechnologies
                handleTechnologies={handleTechnologies}
                activeTechnologies={activeTechnologies}
              />
            </div>
          </Accordion>
        </div>
        <div className="project__content">
          <Breadcrumbs
            items={choosenTechnologies}
            clearTechnologies={clearTechnologies}
          />
          <div className="projects__container page-content">
            <div className="projects__items">
              {filteredProjects?.map(
                (project: IContentfulProjectData, idx: number) => (
                  <ProjectItem
                    {...{ project, idx }}
                    key={project.projectTitle}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
