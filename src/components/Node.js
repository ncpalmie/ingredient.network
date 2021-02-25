import React from 'react';
import PropTypes from 'prop-types';
import useMousePos from './useMousePos';
import '../css/Graph.css';

function Node(props) {
  const { nodeData, setNodePos, nodeRadius } = props;
  const { mx, my } = useMousePos();

  return (
    <div
      className="Node"
      label="node"
      onClick={() => { setNodePos(nodeData.id, mx, my); }}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      style={{ left: nodeData.x, top: nodeData.y + nodeRadius * 0 }}
    >
      <p>
        Node
        {' '}
        {nodeData.id}
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
  setNodePos: PropTypes.func.isRequired,
  nodeRadius: PropTypes.number.isRequired,
};

export default Node;
