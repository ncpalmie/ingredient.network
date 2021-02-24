import React from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import Node from './components/Node';
import './css/App.css';

function App() {
  return (
    <MapInteractionCSS>
      <Node />
    </MapInteractionCSS>
  );
}

export default App;
