import React, { FC } from "react";
import { RiFacebookFill, RiGithubFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";

import { IFooterProps } from "./types";

import "./styles.scss";

const Footer: FC<IFooterProps> = () => {
  return (
    <footer className="footer">
      <span className="footer__text">Find me in:</span>
      <div className="footer-socials">
        <div className="footer-socials__item">
          <a href="#">
            <RiTwitterFill size={24}/>
          </a>
        </div>
        <div className="footer-socials__item">
          <a href="#">
            <RiFacebookFill size={24}/>
          </a>
        </div>
        <div className="footer-socials__item">
          <a href="#">
            <RiLinkedinFill size={24}/>
          </a>
        </div>
        <div className="footer-socials__item">
          <a href="#">
            <span>@romanenkosergio</span>
            <RiGithubFill size={24}/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
