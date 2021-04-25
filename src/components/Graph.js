import React, { useState, useEffect } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Button } from 'grommet';
import PropTypes from 'prop-types';
import Node from './Node';
import Edge from './Edge';
import '../css/Graph.css';

function Graph(props) {
  const { nodeRadius, searchIngredient, newImgUrl } = props;
  const [mapData, setMapData] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  let nextId = 0;

  // Generates edges using node locations
  const getEdgeData = (id1, id2) => {
    let n1 = null;
    let n2 = null;
    const edgeNodes = nodes.filter((node) => (node.id === id1 || node.id === id2));
    [n1, n2] = edgeNodes;

    console.log(nodes);

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
        const newNode = node;
        incrementAngle += (2 * Math.PI) / (numInnerNodes);
        if (!outerIncrementAngle) outerIncrementAngle = Math.PI + incrementAngle;
        newNode.x = Math.floor(nodes[0].x + (radius * Math.sin(incrementAngle)));
        newNode.y = Math.floor(nodes[0].y - (radius * Math.cos(incrementAngle)));
        return newNode;
      }
      return node;
    });

    if (numInnerIsEven) outerIncrementAngle += Math.PI / (numInnerNodes);
    newNodes = newNodes.map((node) => {
      if (node.orbit === 2) {
        const newNode = node;
        outerIncrementAngle += (2 * Math.PI) / numInnerNodes;
        newNode.x = Math.floor(nodes[0].x + (radius * 1.55 * Math.sin(outerIncrementAngle)));
        newNode.y = Math.floor(nodes[0].y - (radius * 1.55 * Math.cos(outerIncrementAngle)));
        return newNode;
      }
      return node;
    });

    return newNodes;
  };

  // Generates single node from given ingredient data
  const generateNodeFromIngredient = (ingredientData, orbit) => ({
    name: ingredientData.name,
    id: nextId,
    x: nextId === 0 ? 750 : 0,
    y: nextId === 0 ? 440 : 0,
    orbit,
    nodeImage: {
      imgUrl: ingredientData.imgUrl,
      imgHeightOffset: ingredientData.imgHeightOffset,
      imgWidthOffset: ingredientData.imgWidthOffset,
      imgTopOffset: ingredientData.imgTopOffset,
      imgLeftOffset: ingredientData.imgLeftOffset,
    },
  });

  // Generates nodes based on ingredient connections
  const generateNodes = () => {
    const newNodes = [];
    const newEdges = [];
    const mainNode = generateNodeFromIngredient(searchIngredient, 0);
    newNodes.push(mainNode);
    nextId += 1;

    // Form strong node connections
    searchIngredient.strongConnections.forEach((ingredient) => {
      newNodes.push(generateNodeFromIngredient(ingredient, 1));
      newEdges.push({ n1: 0, n2: nextId });
      nextId += 1;
    });

    // Form weak node connections
    searchIngredient.weakConnections.forEach((ingredient) => {
      newNodes.push(generateNodeFromIngredient(ingredient, 2));
      newEdges.push({ n1: 0, n2: nextId });
      nextId += 1;
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
      <MapInteractionCSS value={mapData} onChange={(value) => setMapData(value)}>
        <div className="graph">
          {edges.map((edge) => (
            <Edge
              key={edge.n1.toString() + edge.n2.toString()}
              edgeData={getEdgeData(edge.n1, edge.n2)}
            />
          ))}
          {orbitNodes(300).map((node) => (
            <Node
              key={node.id}
              nodeRadius={nodeRadius}
              nodeData={node}
              nodeName={node.name}
              nodeImage={node.nodeImage}
              newImgUrl={newImgUrl}
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
    name: PropTypes.string,
    strongConnections: PropTypes.arrayOf(PropTypes.object),
    weakConnections: PropTypes.arrayOf(PropTypes.object),
    imgUrl: PropTypes.string,
    imgHeightOffset: PropTypes.number,
    imgWidthOffset: PropTypes.number,
    imgTopOffset: PropTypes.number,
    imgLeftOffset: PropTypes.number,
  }),
  newImgUrl: PropTypes.string,
};

Graph.defaultProps = {
  searchIngredient: {
    id: -1,
    name: 'NO INGREDIENT',
    strongConnections: [],
    weakConnections: [],
    imgUrl: '',
    imgHeightOffset: 0,
    imgWidthOffset: 0,
    imgTopOffset: 0,
    imgLeftOffset: 0,
  },
  newImgUrl: '',
};

export default Graph;
