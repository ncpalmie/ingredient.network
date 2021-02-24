import React from 'react';
import PropTypes from 'prop-types';
import useMousePos from './useMousePos';
import '../css/Graph.css';

function Node(props) {
  const { x } = useMousePos();
  const { mapInfo } = props;

  return (
    <div
      className="Node"
      label="node"
      onClick={() => {}}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <p>
        Mouse at
        {' '}
        {x}
        Graph at
        {' '}
        {mapInfo.translation.x}
      </p>
    </div>
  );
}

Node.propTypes = {
  mapInfo: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    translation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Node;
