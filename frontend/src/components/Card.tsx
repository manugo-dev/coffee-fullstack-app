import React from 'react';

type Props = {
  title: string;
  description: string;
};

export const Card = ({ title, description }: Props) => {
  return (
    <div className='border border-black'>
      <h1 className='text-5xl text-primary'>{title}</h1>
      <p className='mt-2 text-sm text-grey'>{description}</p>
    </div>
  );
};
