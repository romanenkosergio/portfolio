import React, { FC, PropsWithChildren, useCallback, useState } from "react";

import { IAccordionProps } from "./types";

import { ReactComponent as Arrow } from "svg/accordion-icon.svg";

import "./styles.scss";

const Accordion: FC<PropsWithChildren<IAccordionProps>> = ({title, children, isOpen = false}) => {
  const [isOpened, setIsOpened] = useState<boolean>(isOpen);
  const onToggleOpen = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpened(prevState => !prevState);
  }, []);

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={onToggleOpen}>
        <Arrow className={`accordion__icon ${isOpened ? 'accordion__icon--open' : ''}`}/>
        <span className="accordion__title">{title}</span>
      </div>
      <div className={`accordion__content ${!isOpened ? 'accordion__content--collapsed animate-out' : 'animate-in'}`}>
        <div className="accordion__childs">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
