import React from 'react';
import { Helmet } from 'react-helmet';

import { Header } from './blocks';

const App = () => (
  <div>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Chernyshov</title>

      <link
        href="https://fonts.googleapis.com/css?family=Oswald:100,200,300,400,600,700"
        rel="stylesheet"
        type="text/css"
      />
    </Helmet>

    <Header />
  </div>
);

export default App;
