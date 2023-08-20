import { IContentfulProjectData } from 'store/useContentfulStore';

export interface IProjectsTechnologiesProps {
  handleTechnologies: (label: string) => void;
  activeTechnologies: string[];
}

export interface IProjectItemProps {
  project: IContentfulProjectData;
  idx: number;
}
