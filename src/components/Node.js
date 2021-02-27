import React from 'react';
import PropTypes from 'prop-types';
import '../css/Graph.css';

function Node(props) {
  const { nodeData, nodeRadius } = props;

  return (
    <div
      className="Node"
      label="node"
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      style={{ left: nodeData.x - nodeRadius, top: nodeData.y - nodeRadius }}
    >
      <p>
        Node
        {' '}
        {nodeData.id}
        @
        {nodeData.x}
        ,
        {nodeData.y}
      </p>
    </div>
  );
}

Node.propTypes = {
  // mapInfo: PropTypes.shape({
  //   scale: PropTypes.number.isRequired,
  //   translation: PropTypes.shape({
  //     x: PropTypes.number.isRequired,
  //     y: PropTypes.number.isRequired,
  //   }),
  // }).isRequired,
  nodeData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  nodeRadius: PropTypes.number.isRequired,
};

export default Node;
