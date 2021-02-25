import React, { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import PropTypes from 'prop-types';
import Node from './Node';
import Edge from './Edge';
import '../css/Graph.css';

function Graph(props) {
  const { nodeRadius } = props;
  const [mapData, setMapData] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [nodes, setNodes] = useState([{ id: 0, x: 0, y: 0 }, { id: 1, x: 80, y: 80 }]);
  const [edges] = useState([{ n1: 0, n2: 1 }]);

  const getEdgeData = (id1, id2) => {
    let n1 = null;
    let n2 = null;
    const edgeNodes = nodes.filter((node) => (node.id === id1 || node.id === id2));
    if (Math.sqrt(edgeNodes[0].x ** 2 + edgeNodes[0].y ** 2)
    <= Math.sqrt(edgeNodes[1].x ** 2 + edgeNodes[1].y ** 2)) {
      [n1, n2] = edgeNodes;
    } else {
      [n2, n1] = edgeNodes;
    }
    const angle = -Math.atan((n1.x - n2.x) / (n1.y - n2.y));
    const dist = (Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2));
    return {
      angle,
      dist,
      x: n1.x - ((dist / 2) * Math.sin(angle)) + nodeRadius,
      y: n1.y - ((dist / 2) - (((dist / 2) * Math.sin(angle)) / Math.tan(angle))) + nodeRadius,
    };
  };

  const setNodePos = (id, x, y) => {
    const newNodes = nodes.filter((node) => (node.id !== id));
    newNodes.push({ id, x, y });
    setNodes(newNodes);
  };

  return (
    <MapInteractionCSS value={mapData} onChange={(value) => setMapData(value)}>
      <div className="Graph">
        {nodes.map((node) => (
          <Node nodeRadius={nodeRadius} nodeData={node} setNodePos={setNodePos} />
        ))}
        {edges.map((edge) => (
          <Edge edgeData={getEdgeData(edge.n1, edge.n2)} />
        ))}
      </div>
    </MapInteractionCSS>
  );
}

Graph.propTypes = {
  nodeRadius: PropTypes.number.isRequired,
};

export default Graph;
