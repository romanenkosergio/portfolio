import React, { FC, useMemo } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { IBreadcrumbsProps } from './types';

import './styles.scss';

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ items, clearTechnologies }) => {
  const values = useMemo(
    () => (typeof items === 'string' ? items : items.join('; ')),
    [items]
  );
  const navigate = useNavigate();
  const handleClick = () => {
    if (typeof items === 'string') return navigate(-1);
    clearTechnologies && clearTechnologies();
  };
  return (
    <div
      className={`breadcrumbs ${!values.length && 'breadcrumbs--no-border'}`}
    >
      <div className="breadcrumbs__items">{values}</div>
      {!!values.length && (
        <RiCloseFill className="breadcrumbs__close" onClick={handleClick} />
      )}
    </div>
  );
};

export default Breadcrumbs;
