import React, {useState} from 'react';
import {styled} from 'linaria/react';

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

export default App;

// issue: https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md
self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};
