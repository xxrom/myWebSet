import React, {useState} from 'react';
import {styled} from 'linaria/react';
import {hot} from 'react-hot-loader/root';

import {Header} from './blocks';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <H1>Hello World!2</H1>
      <div>{count}</div>
      <div>{count * 2} </div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Header />
    </div>
  );
};

const H1 = styled.h1`
  color: red;
`;

import {setConfig} from 'react-hot-loader';
setConfig({logLevel: 'debug'});
export default hot(App);
