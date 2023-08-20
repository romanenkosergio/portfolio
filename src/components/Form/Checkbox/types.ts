import { IconType } from 'react-icons/lib';

export interface ICheckboxProps {
  name: string;
  value: string;
  label: string;
  Icon?: IconType;
  onChange: (label: string) => void;
}
