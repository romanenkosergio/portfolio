import React, { FC } from 'react';

import 'components/Form/styles.scss';

import { IInputProps } from './types';

const Input: FC<IInputProps> = ({ register, type = 'text', error }) => {
  return (
    <>
      <input
        type={type}
        {...register}
        className={`form-input ${error ? 'form-input--error' : ''}`}
      />
      {error && <small className="form-input__error">{error.message}</small>}
    </>
  );
};

export default Input;
