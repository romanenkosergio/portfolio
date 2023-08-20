import { TAB_TYPE } from 'pages/About/types';
import { IconType } from 'react-icons/lib';
import { RiGatsbyFill } from 'react-icons/ri';
import {
  BiLogoDjango,
  BiLogoFlask,
  BiLogoJavascript,
  BiLogoPython,
  BiLogoReact,
  BiLogoVuejs,
} from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';

export interface IInfoText {
  [key: string]: string;
}

export interface IAboutMeInfo {
  title: string;
  children?: string[];
  fill?: string;
}

interface ITechnologies {
  label: string;
  Icon?: IconType;
  color?: string;
}

const personalInfo: IAboutMeInfo[] = [
  {
    title: 'bio',
    children: ['about-me', 'my-life'],
    fill: '#E99287', //$accent-1
  },
  {
    title: 'interests',
    children: ['coding', 'mentoring'],
    fill: '#43D9AD', //$accent-2
  },
  {
    title: 'education',
    children: ['high-school', 'university'],
    fill: '#3A49A4', //$accent-5
  },
];

const professionalInfo: IAboutMeInfo[] = [
  {
    title: 'experience',
    children: ['companies', 'lecturing'],
    fill: '#E99287', //$accent-1
  },
  {
    title: 'skills',
  },
];

const hobbiesInfo: IAboutMeInfo[] = [
  {
    title: 'books',
  },
  {
    title: 'games',
  },
  {
    title: 'music',
  },
];

export const ABOUT_ME_INFO = {
  [TAB_TYPE.PERSONAL_INFO]: personalInfo,
  [TAB_TYPE.PROFESSIONAL_INFO]: professionalInfo,
  [TAB_TYPE.HOBBIES]: hobbiesInfo,
};

export const TECHNOLOGIES: ITechnologies[] = [
  {
    label: 'JavaScript',
    Icon: BiLogoJavascript,
    color: '#F0DB4F',
  },
  {
    label: 'React',
    Icon: BiLogoReact,
    color: '#61DBFB',
  },
  {
    label: 'Gatsby',
    Icon: RiGatsbyFill,
    color: '#e68cf7',
  },
  {
    label: 'Next',
    Icon: TbBrandNextjs,
    color: '#FFFFFF',
  },
  {
    label: 'Vue',
    Icon: BiLogoVuejs,
    color: '#41B883',
  },
  {
    label: 'Python',
    Icon: BiLogoPython,
    color: '#4584b6',
  },
  {
    label: 'Flask',
    Icon: BiLogoFlask,
    color: '#F0F0F0',
  },
  {
    label: 'Django',
    Icon: BiLogoDjango,
    color: '#25c488',
  },
];
