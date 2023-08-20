import React, { FC } from 'react';

import { ICheckboxProps } from './types';

import './styles.scss';

const Checkbox: FC<ICheckboxProps> = ({
  name,
  value,
  label,
  Icon,
  onChange,
}) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="checkbox__input"
        onChange={e => onChange(e.target.value)}
      />
      <div className="checkbox__checkmark" />
      <div className="checkbox__content">
        {Icon && <Icon className="checkbox__icon" />}
        <span className="checkbox__label">{label}</span>
      </div>
    </label>
  );
};

export default Checkbox;
