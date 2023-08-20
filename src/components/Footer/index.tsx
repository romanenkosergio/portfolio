import React, { FC } from 'react';
import {
  RiFacebookFill,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterFill,
} from 'react-icons/ri';

import { IFooterProps } from './types';

import './styles.scss';

const Footer: FC<IFooterProps> = () => {
  return (
    <footer className="footer">
      <span className="footer__text">Find me in:</span>
      <div className="footer-socials">
        <div className="footer-socials__item">
          <a
            href="https://twitter.com/romanenkosergio"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter Account"
          >
            <RiTwitterFill size={24} />
          </a>
        </div>
        <div className="footer-socials__item">
          <a
            href="https://www.facebook.com/romanenkosergio"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook Account"
          >
            <RiFacebookFill size={24} />
          </a>
        </div>
        <div className="footer-socials__item">
          <a
            href="https://www.linkedin.com/in/romanenkosergio/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Account"
          >
            <RiLinkedinFill size={24} />
          </a>
        </div>
        <div className="footer-socials__item">
          <a
            href="https://github.com/romanenkosergio"
            target="_blank"
            rel="noreferrer"
            aria-label="Github Account"
          >
            <span>@romanenkosergio</span>
            <RiGithubFill size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
