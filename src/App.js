import React, { useState } from 'react';
import { Box } from 'grommet';
import Graph from './components/Graph';
import Header from './components/Header';
import './css/App.css';

function App() {
  const [searchVal, setSearchVal] = useState('');

  return (
    <Box>
      <Header setSearchVal={setSearchVal} />
      <Graph nodeRadius={75} searchVal={searchVal} />
    </Box>
  );
}

export default App;
