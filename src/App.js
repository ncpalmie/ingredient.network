import React, { useState } from 'react';
import { Box } from 'grommet';
import Graph from './components/Graph';
import Header from './components/Header';
import './css/App.css';

function App() {
  const [searchIngredient, setSearchIngredient] = useState('');

  return (
    <Box>
      <Header setSearchIngredient={setSearchIngredient} />
      <Graph nodeRadius={75} searchIngredient={searchIngredient} />
    </Box>
  );
}

export default App;
