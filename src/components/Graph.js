import React, { useState, useEffect } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Button } from 'grommet';
import PropTypes from 'prop-types';
import Node from './Node';
import Edge from './Edge';
import '../css/Graph.css';

// Generates a set of example nodes for testing
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
  const { nodeRadius, searchIngredient } = props;
  const [mapData, setMapData] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [nodes, setNodes] = useState(graphData[0]);
  const [edges, setEdges] = useState(graphData[1]);

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
    const numInnerNodes = nodes.filter((node) => node.orbit === 1).length;
    const numInnerIsEven = (numInnerNodes % 2) === 0;
    let incrementAngle = -(2 * Math.PI) / (numInnerNodes);
    let outerIncrementAngle = null;
    let newNodes = nodes.sort((node1, node2) => node1.id - node2.id);

    newNodes = newNodes.map((node) => {
      if (node.orbit === 1) {
        incrementAngle += (2 * Math.PI) / (numInnerNodes);
        if (!outerIncrementAngle) outerIncrementAngle = Math.PI + incrementAngle;
        return {
          name: node.name,
          id: node.id,
          orbit: node.orbit,
          x: Math.floor(nodes[0].x + (radius * Math.sin(incrementAngle))),
          y: Math.floor(nodes[0].y - (radius * Math.cos(incrementAngle))),
        };
      }
      return node;
    });

    if (numInnerIsEven) outerIncrementAngle += Math.PI / (numInnerNodes);
    newNodes = newNodes.map((node) => {
      if (node.orbit === 2) {
        outerIncrementAngle += (2 * Math.PI) / numInnerNodes;
        return {
          name: node.name,
          id: node.id,
          orbit: node.orbit,
          x: Math.floor(nodes[0].x + (radius * 1.75 * Math.sin(outerIncrementAngle))),
          y: Math.floor(nodes[0].y - (radius * 1.75 * Math.cos(outerIncrementAngle))),
        };
      }
      return node;
    });

    setNodes(newNodes);
  };

  // Generates nodes based on ingredient connections
  const generateNodes = () => {
    let id = 1;
    const newNodes = [];
    const newEdges = [];
    const mainNode = {
      name: searchIngredient.name, id: 0, x: 750, y: 440, orbit: 0,
    };
    newNodes.push(mainNode);

    // Form strong node connections
    searchIngredient.strongConnections.forEach((ingredient) => {
      newNodes.push({
        name: ingredient,
        id,
        orbit: 1,
        x: 0,
        y: 0,
      });
      newEdges.push({ n1: 0, n2: id });
      id += 1;
    });

    // Form weak node connections
    searchIngredient.weakConnections.forEach((ingredient) => {
      newNodes.push({
        name: ingredient,
        id,
        orbit: 2,
        x: 0,
        y: 0,
      });
      newEdges.push({ n1: 0, n2: id });
      id += 1;
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  useEffect(() => {
    if (searchIngredient) {
      generateNodes();
    }
  }, [searchIngredient]);

  return (
    <div>
      <Button label="Orbit Nodes" onClick={() => { orbitNodes(300); }} />
      <MapInteractionCSS value={mapData} onChange={(value) => setMapData(value)}>
        <div className="graph">
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
              nodeName={node.name}
            />
          ))}
        </div>
      </MapInteractionCSS>
    </div>
  );
}

Graph.propTypes = {
  nodeRadius: PropTypes.number.isRequired,
  searchIngredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    strongConnections: PropTypes.arrayOf(PropTypes.string).isRequired,
    weakConnections: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

Graph.defaultProps = {
  searchIngredient: {
    id: -1, name: 'NO INGREDIENT', strongConnections: [], weakConnections: [],
  },
};

export default Graph;
