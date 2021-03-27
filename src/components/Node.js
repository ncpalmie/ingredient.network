import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from 'react-icons/ai';
import '../css/Graph.css';
import axios from 'axios';

const updateNodeImage = (attributeEndpoint, delta) => {
  // CONTINUE SETTING UP IMAGE MANIPULATION ROUTES
};

function Node(props) {
  const edgeWidth = 10;
  const {
    nodeData, nodeRadius, nodeName, nodeImage,
  } = props;

  // Generate image element or null if no image data present
  const imgHeight = 100 + nodeImage.imgHeightOffset;
  const imgWidth = 100 + nodeImage.imgWidthOffset;
  const nodeImageElement = nodeImage
    ? (
      <img
        src={nodeImage.imgUrl}
        alt={nodeName}
        style={{
          height: `${imgHeight.toString()}%`,
          width: `${imgWidth.toString()}%`,
          top: nodeImage.imgTopOffset,
          left: nodeImage.imgLeftOffset,
        }}
      />
    )
    : null;

  // Node positioning math
  const nodeX = (nodeData.x) - nodeRadius + (edgeWidth / 2);
  const nodeY = nodeData.y - nodeRadius + (edgeWidth / 2);
  const smallNodeX = (nodeData.x + (edgeWidth / 2)) - (nodeRadius * 0.75) - edgeWidth / 2;
  const smallNodeY = nodeData.y - (nodeRadius * 0.75) + edgeWidth / 2;

  return (
    <div
      className={nodeData.orbit === 2 ? 'small-node' : 'node'}
      label="node"
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      style={{
        left: nodeData.orbit === 2 ? smallNodeX : nodeX,
        top: nodeData.orbit === 2 ? smallNodeY : nodeY,
      }}
    >
      <div className="node-img-container">
        {nodeImageElement}
      </div>
      <p>
        {nodeName}
        @
        {nodeData.x}
        ,
        {nodeData.y}
      </p>
      <Box>
        <Button
          className="node-debug-button"
          icon={<AiOutlineZoomOut />}
          style={{
            left: nodeData.orbit === 2 ? -45 : -40,
            top: nodeData.orbit === 2 ? 40 : 60,
          }}
        />
        <Button
          className="node-debug-button"
          icon={<AiOutlineZoomIn />}
          style={{
            left: nodeData.orbit === 2 ? -60 : -55,
            top: nodeData.orbit === 2 ? 40 : 60,
          }}
        />
      </Box>
      <Box>
        <Button
          className="node-debug-button"
          icon={<AiOutlinePlusSquare />}
          style={{
            left: nodeData.orbit === 2 ? 112 : 142,
            top: nodeData.orbit === 2 ? 10 : 20,
          }}
        />
        <Button
          className="node-debug-button"
          icon={<AiOutlineMinusSquare />}
          style={{
            left: nodeData.orbit === 2 ? 128 : 158,
            top: nodeData.orbit === 2 ? 10 : 20,
          }}
        />
      </Box>
      <Box>
        <Button
          className="node-debug-button"
          icon={<AiOutlinePlusSquare />}
          style={{
            left: nodeData.orbit === 2 ? 120 : 150,
            top: nodeData.orbit === 2 ? 35 : 40,
          }}
        />
        <Button
          className="node-debug-button"
          icon={<AiOutlineMinusSquare />}
          style={{
            left: nodeData.orbit === 2 ? 120 : 150,
            top: nodeData.orbit === 2 ? 50 : 55,
          }}
        />
      </Box>
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
  nodeName: PropTypes.string,
  nodeImage: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    imgHeightOffset: PropTypes.number.isRequired,
    imgWidthOffset: PropTypes.number.isRequired,
    imgTopOffset: PropTypes.number.isRequired,
    imgLeftOffset: PropTypes.number.isRequired,
  }),
};

Node.defaultProps = {
  nodeImage: null,
  nodeName: 'NO INGREDIENT',
};

export default Node;
