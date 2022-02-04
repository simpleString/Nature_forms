import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';

export const Theory = (data: IPost) => {
  return (
    <div>
      Current id is {data.id} <br />
      <h1>{data.title}</h1>
      <h2>{data.content}</h2>
      <Link to=""></Link>
    </div>
  );
};
