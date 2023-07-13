import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

import { ROUTES } from "utils/enums";

import './styles.scss';

const Header: FC = () => {

  const routeClassName = (isActive: boolean) => {
    return `header-nav__link${isActive ? ' header-nav__link--active' : ''}`;
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span>serhii-romanenko</span>
        </div>
        <nav className="header__nav header-nav">
          <NavLink to={ROUTES.HOME} className={({isActive}) => routeClassName(isActive)}>_hello</NavLink>
          <NavLink to={ROUTES.ABOUT} className={({isActive}) => routeClassName(isActive)}>_about-me</NavLink>
          <NavLink to={ROUTES.PROJECTS} className={({isActive}) => routeClassName(isActive)}>_projects</NavLink>
          <NavLink to={ROUTES.CONTACT} className={({isActive}) => routeClassName(isActive)}>_contact-me</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
