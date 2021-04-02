import React, { useState } from 'react';
import { Box } from 'grommet';
import Graph from './components/Graph';
import Header from './components/Header';
import './css/App.css';

function App() {
  const [searchIngredient, setSearchIngredient] = useState({
    name: 'Salmon',
    strongConnections: [],
    weakConnections: [],
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Sesame_Soy_Glazed_Skuna_Bay_Salmon_-_2.jpg',
    imgHeightOffset: 0,
    imgWidthOffset: 0,
    imgTopOffset: 0,
    imgLeftOffset: 0,
  });
  const [imgUrl, setImgUrl] = useState();

  return (
    <Box>
      <Header setSearchIngredient={setSearchIngredient} setImgUrl={setImgUrl} />
      <Graph nodeRadius={75} searchIngredient={searchIngredient} newImgUrl={imgUrl} />
    </Box>
  );
}

export default App;
