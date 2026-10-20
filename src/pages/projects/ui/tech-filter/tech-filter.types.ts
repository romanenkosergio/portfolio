import type { Tech } from "@/entities/project";

export interface ITechFilterProps {
  title: string;
  label: string;
  techs: readonly Tech[];
  checked: readonly Tech[];
  onToggle: (tech: Tech) => void;
}
