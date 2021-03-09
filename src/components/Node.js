import React from 'react';
import PropTypes from 'prop-types';
import '../css/Graph.css';

function Node(props) {
  const edgeWidth = 10;
  const { nodeData, nodeRadius, nodeName } = props;

  // Node positioning math
  const nodeX = (nodeData.x) - nodeRadius + (edgeWidth / 2);
  const nodeY = nodeData.y - nodeRadius + (edgeWidth / 2);
  const smallNodeX = (nodeData.x + (edgeWidth / 2)) - (nodeRadius * 0.75) - edgeWidth / 2;
  const smallNodeY = nodeData.y - (nodeRadius * 0.75) + edgeWidth / 2;

  return (
    <div
      className={nodeData.orbit === 2 ? 'SmallNode' : 'Node'}
      label="node"
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      style={{
        left: nodeData.orbit === 2 ? smallNodeX : nodeX,
        top: nodeData.orbit === 2 ? smallNodeY : nodeY,
      }}
    >
      <p>
        Node
        {' '}
        {nodeName}
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
    orbit: PropTypes.number.isRequired,
  }).isRequired,
  nodeRadius: PropTypes.number.isRequired,
  nodeName: PropTypes.string.isRequired,
};

export default Node;
