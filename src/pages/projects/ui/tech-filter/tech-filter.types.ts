import type { RefObject } from "react";

import type { Tech } from "@/entities/project/config";

import type { IFilterSlot } from "../projects-explorer/projects-explorer.types";

export interface ITechFilterProps {
  title: string;
  label: string;
  filters: readonly IFilterSlot[];
  checked: readonly Tech[];
  onToggle: (tech: Tech) => void;
  // The first checkbox: focus moves there when the clear button unmounts.
  firstRef: RefObject<HTMLInputElement | null>;
}
