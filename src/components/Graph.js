import React, { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import Node from './Node';
import Edge from './Edge';
import '../css/Graph.css';

function Graph() {
  const [mapInfo, setMapInfo] = useState({ scale: 1, translation: { x: 0, y: 0 } });

  return (
    <MapInteractionCSS value={mapInfo} onChange={(value) => setMapInfo(value)}>
      <div className="Graph">
        <Edge />
        <Node mapInfo={mapInfo} />
      </div>
    </MapInteractionCSS>
  );
}

export default Graph;
