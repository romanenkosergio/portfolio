import { IconType } from 'react-icons';

export enum TAB_TYPE {
  PROFESSIONAL_INFO = 'professional-info',
  HOBBIES = 'hobbies',
  PERSONAL_INFO = 'personal-info',
}
export interface IDrawerItems {
  Icon: IconType;
  name: TAB_TYPE;
}

export interface IAboutDrawerRightProps {
  activeTab: TAB_TYPE;
  openedTab: string;
  activeInfo: string;
  setOpenedTab: (tab: string) => void;
  setActiveInfo: (tab: string) => void;
}
