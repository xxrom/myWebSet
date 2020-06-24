import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {
  const [count, setCount] = useState(0);

  return <div>
    <h1>
      Hello World! 2333
    </h1>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>add</button>

  </div>;

}

export default hot(App);