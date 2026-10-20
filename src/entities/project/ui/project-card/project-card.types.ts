import type { IProjectItem } from "@/entities/project/model";

export interface IProjectCardLabels {
  // «Project 3» (numbered by the caller), the «//» between it and the title, «personal», «Stack».
  number: string;
  separator: string;
  personal: string;
  stack: string;
}

export interface IProjectCardProps {
  project: IProjectItem;
  labels: IProjectCardLabels;
}
