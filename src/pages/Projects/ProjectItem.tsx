import React, { FC } from 'react';

import { Button } from 'components';

import { IProjectItemProps } from './types';
import { TECHNOLOGIES } from 'utils/constants';

const ProjectItem: FC<IProjectItemProps> = ({ project, idx }) => {
  const { color } =
    TECHNOLOGIES.find(p => p.label === project.projectTechnologies) || {};
  return (
    <div className="projects__item projects-item">
      <p className="projects-item__title">
        Project {idx + 1}
        <span>
          {' //'} {project.projectTitle}
        </span>
      </p>
      <div className="projects-item__card">
        <div className="projects-item__image">
          <img src={project.projectImage.url} alt={project.projectTitle} />
        </div>
        <div className="projects-item__card-content">
          <span
            className="projects-item__technologies"
            style={color ? { color, borderColor: color } : {}}
          >
            {project.projectTechnologies}
          </span>
          <p className="projects-item__description">
            {project.projectDescription}
          </p>
          <Button text={'view-project'} className="projects-item__button" />
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
