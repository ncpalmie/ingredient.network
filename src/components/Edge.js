import React from 'react';
import '../css/Graph.css';

function Edge() {
  const connectionStyling = { left: '60px' };

  return (
    <hr className="Edge" style={connectionStyling} />
  );
}

export default Edge;
