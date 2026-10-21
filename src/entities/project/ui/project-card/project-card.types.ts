import type { IProjectItem } from "@/entities/project/model";

export interface IProjectCardLabels {
  // «Project 3» (numbered by the caller), the «//» between it and the title, «personal», «commercial · NDA», «Stack».
  number: string;
  separator: string;
  personal: string;
  commercial: string;
  stack: string;
  // The view-project button text and its link title («Open {title} website»).
  view: string;
  viewTitle: string;
}

export interface IProjectCardProps {
  project: IProjectItem;
  labels: IProjectCardLabels;
  // The project's place in the list: it picks the cover pattern.
  index: number;
}
