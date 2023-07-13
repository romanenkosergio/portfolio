import { Dispatch, SetStateAction } from "react";

export interface IGameProps {
  setScore: Dispatch<SetStateAction<number>>;
  score: number;
  setArrowName: Dispatch<SetStateAction<string>>;
  arrowName: string;
}
