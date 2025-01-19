import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

function BtnTemp({ className, to, text, onClick }) {
  function onClickHendler(evt) {
    if (onClick) {
      evt.preventDefault();
      onClick();
    }
  }
  return (
    <Link
      to={onClick ? '' : to}
      onClick={onClickHendler}
      className={twMerge(
        cx(
          'font-aeroport font-medium font-500 text-[20px] text-black rounded-[24px] w-[186px] h-[47px] inline-flex items-center justify-center text-center bg-gray'
        ),
        className
      )}
    >
      {text}
    </Link>
  );
}

export default BtnTemp;
