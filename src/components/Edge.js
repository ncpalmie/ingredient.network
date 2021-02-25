import React from 'react';
import PropTypes from 'prop-types';
import '../css/Graph.css';

function Edge(props) {
  const { edgeData } = props;

  return (
    <hr
      className="Edge"
      style={{
        left: edgeData.x + 50,
        top: edgeData.y - 80,
        height: edgeData.dist,
        transform: `rotate(${edgeData.angle}rad)`,
      }}
    />
  );
}

Edge.propTypes = {
  edgeData: PropTypes.shape({
    angle: PropTypes.number.isRequired,
    dist: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Edge;
