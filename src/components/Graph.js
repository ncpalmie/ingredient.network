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
  const mainNode = {
    id: 0, x: 750, y: 440, orbit: 0,
  };

  newNodes.push(mainNode);
  for (let orbit = 1; orbit < 3; orbit += 1) {
    for (let id = 1; id < num / 2; id += 1) {
      newNodes.push({
        id: orbit === 1 ? id : id + Math.ceil(num / 2 - 1),
        orbit,
        x: Math.floor(Math.random() * 1550),
        y: Math.floor(Math.random() * 770),
      });
      newEdges.push({ n1: 0, n2: newNodes.slice(-1)[0].id });
    }
  }

  return [newNodes, newEdges];
};
const graphData = generateRandomNodes(22);

function Graph(props) {
  const { nodeRadius } = props;
  const [mapData, setMapData] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [nodes, setNodes] = useState(graphData[0]);
  const [edges] = useState(graphData[1]);

  // Generates edges using node locations
  const getEdgeData = (id1, id2) => {
    let n1 = null;
    let n2 = null;
    const edgeNodes = nodes.filter((node) => (node.id === id1 || node.id === id2));
    [n1, n2] = edgeNodes;

    const angle = (n1.y >= n2.y ? Math.PI : 0) + -Math.atan((n1.x - n2.x) / (n1.y - n2.y));
    const dist = (Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2));
    const x = n1.x - ((dist / 2) * Math.sin(angle));
    const y = Math.tan(angle) === 0 ? n1.y
      : n1.y - ((dist / 2) - (((dist / 2) * Math.sin(angle)) / Math.tan(angle)));

    return {
      angle, dist, x, y, smallEdge: n2.orbit === 2,
    };
  };

  // Takes a list of nodes and orbits them at the given radius around the main node (orbit=0)
  const orbitNodes = (radius) => {
    let innerAngle = -(4 * Math.PI) / (nodes.length - 1);
    let outerAngle = -(2 * Math.PI) / (nodes.length - 1);
    setNodes(nodes.sort((node1, node2) => node1.id - node2.id));
    setNodes(nodes.map((node) => {
      if (node.orbit === 1) {
        innerAngle += (4 * Math.PI) / (nodes.length - 1);
        return {
          id: node.id,
          orbit: node.orbit,
          x: Math.floor(nodes[0].x + (radius * Math.sin(innerAngle))),
          y: Math.floor(nodes[0].y - (radius * Math.cos(innerAngle))),
        };
      }
      if (node.orbit === 2) {
        outerAngle += (4 * Math.PI) / (nodes.length - 1);
        return {
          id: node.id,
          orbit: node.orbit,
          x: Math.floor(nodes[0].x + (radius * 1.75 * Math.sin(outerAngle))),
          y: Math.floor(nodes[0].y - (radius * 1.75 * Math.cos(outerAngle))),
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
            <Node
              key={node.id}
              nodeRadius={nodeRadius}
              nodeData={node}
            />
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
