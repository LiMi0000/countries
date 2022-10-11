import React from 'react';

import { getPosts } from './backend/server';

const App = () => {
  return (
    <>
      <button
        onClick={() => getPosts()}
        style={{ width: 60, height: 30, marginBottom: 10 }}
      >
        USA
      </button>
      <br />
      <button style={{ width: 60, height: 30 }}>DE</button>
    </>
  );
};

export default App;
