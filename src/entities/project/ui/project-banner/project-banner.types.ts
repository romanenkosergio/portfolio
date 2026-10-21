import type { IProjectItem } from "@/entities/project/model";

export interface IProjectBannerProps {
  project: IProjectItem;
  // The text of the kind badge («personal» or «commercial · NDA»).
  badge: string;
  className?: string;
}
