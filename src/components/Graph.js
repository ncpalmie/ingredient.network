import React, { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Button } from 'grommet';
import PropTypes from 'prop-types';
import Node from './Node';
import Edge from './Edge';
import '../css/Graph.css';

const generateRandomNodes = (num) => {
  const newNodes = [];
  const newEdges = [];
  const mainNode = { id: 0, x: 750, y: 440 };
  newNodes.push(mainNode);
  for (let i = 1; i < num; i += 1) {
    newNodes.push({
      id: i,
      x: Math.floor(Math.random() * 1550),
      y: Math.floor(Math.random() * 770),
    });
    newEdges.push({ n1: 0, n2: newNodes.slice(-1)[0].id });
  }
  return [newNodes, newEdges];
};
const graphData = generateRandomNodes(4);

function Graph(props) {
  const { nodeRadius } = props;
  const [mapData, setMapData] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [nodes, setNodes] = useState(graphData[0]);
  const [edges] = useState(graphData[1]);

  const getEdgeData = (id1, id2) => {
    let n1 = null;
    let n2 = null;
    const edgeNodes = nodes.filter((node) => (node.id === id1 || node.id === id2));
    [n1, n2] = edgeNodes;
    const angle = (n1.y >= n2.y ? Math.PI : 0) + -Math.atan((n1.x - n2.x) / (n1.y - n2.y));
    const dist = (Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2));
    return {
      angle,
      dist,
      x: n1.x - ((dist / 2) * Math.sin(angle)),
      y: n1.y - ((dist / 2) - (((dist / 2) * Math.sin(angle)) / Math.tan(angle))),
    };
  };

  const orbitNodes = async (radius) => {
    let angle = -(2 * Math.PI) / (nodes.length - 1);
    setNodes(nodes.map((node) => {
      angle += (2 * Math.PI) / (nodes.length - 1);
      if (node.id !== 0) {
        return {
          id: node.id,
          x: Math.floor(nodes[0].x + (radius * Math.sin(angle))),
          y: Math.floor(nodes[0].y - (radius * Math.cos(angle))),
        };
      }
      return node;
    }));
  };

  return (
    <div>
      <Button label="Orbit Nodes" onClick={() => { orbitNodes(300); }} />
      <MapInteractionCSS value={mapData} onChange={(value) => setMapData(value)}>
        <div className="Graph">
          {edges.map((edge) => (
            <Edge
              key={edge.n1.toString() + edge.n2.toString()}
              edgeData={getEdgeData(edge.n1, edge.n2)}
            />
          ))}
          {nodes.map((node) => (
            <Node key={node.id} nodeRadius={nodeRadius} nodeData={node} />
          ))}
        </div>
      </MapInteractionCSS>
    </div>
  );
}

Graph.propTypes = {
  nodeRadius: PropTypes.number.isRequired,
};

export default Graph;
