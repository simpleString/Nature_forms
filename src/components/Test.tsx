import React, { useState } from 'react';
import { ITest } from '../interfaces';

export const Test = (test: ITest) => {
  const [state, setState] = useState('');

  return (
    <div>
      <h1>{test.title}</h1>
      <p>{test.question}</p>
      <input
        type="text"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};
