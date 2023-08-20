import React, { FC } from 'react';

import { Checkbox } from 'components/Form';

import { IProjectsTechnologiesProps } from './types';
import { TECHNOLOGIES } from 'utils/constants';

const ProjectsTechnologies: FC<IProjectsTechnologiesProps> = ({
  handleTechnologies,
  activeTechnologies,
}) => {
  return (
    <div className="projects-technologies">
      {TECHNOLOGIES.map(
        (technology, index) =>
          activeTechnologies.includes(technology.label) && (
            <Checkbox
              key={technology.label}
              name={'technology'}
              value={technology.label}
              label={technology.label}
              Icon={technology.Icon}
              onChange={handleTechnologies}
            />
          )
      )}
    </div>
  );
};

export default ProjectsTechnologies;
