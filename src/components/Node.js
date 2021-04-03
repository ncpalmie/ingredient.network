import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Graph.css';
import axios from 'axios';
import NodeEditor from './NodeEditor';

// Update database with new ingredient image data
const updateNodeImage = async (ingredientName, ingredientImage) => axios.patch(
  `/ingredients/${ingredientName}/image`, { imageData: ingredientImage },
);

function Node(props) {
  const edgeWidth = 10;
  const {
    nodeData, nodeRadius, nodeName, nodeImage, newImgUrl,
  } = props;
  const [imageData, setImageData] = useState(nodeImage);

  useEffect(() => {
    setImageData(nodeImage);
  }, [nodeImage]);

  // Generate image element or null if no image data present
  const imgHeight = 100 + imageData.imgHeightOffset;
  const imgWidth = 100 + imageData.imgWidthOffset;
  const imageElement = (
    <img
      src={imageData.imgUrl}
      alt=""
      style={{
        height: `${imgHeight.toString()}%`,
        width: `${imgWidth.toString()}%`,
        top: imageData.imgTopOffset,
        left: imageData.imgLeftOffset,
      }}
    />
  );

  // Node positioning math
  const nodeX = (nodeData.x) - nodeRadius + (edgeWidth / 2);
  const nodeY = nodeData.y - nodeRadius + (edgeWidth / 2);
  const smallNodeX = (nodeData.x + (edgeWidth / 2)) - (nodeRadius * 0.75) - edgeWidth / 2;
  const smallNodeY = nodeData.y - (nodeRadius * 0.75) + edgeWidth / 2;

  const alterImageData = (attribute, delta) => {
    // Tertiary operators prevent null values in DB for numerical values
    const newImageData = {
      imgUrl: imageData.imgUrl ? imageData.imgUrl : '',
      imgHeightOffset: imageData.imgHeightOffset ? imageData.imgHeightOffset : 0,
      imgWidthOffset: imageData.imgWidthOffset ? imageData.imgWidthOffset : 0,
      imgTopOffset: imageData.imgTopOffset ? imageData.imgTopOffset : 0,
      imgLeftOffset: imageData.imgLeftOffset ? imageData.imgLeftOffset : 0,
    };
    if (attribute === 'imgUrl') {
      newImageData[attribute] = newImgUrl;
    } else {
      newImageData[attribute] += delta;
    }
    setImageData(newImageData);
    updateNodeImage(nodeName, newImageData);
  };

  return (
    <div
      key={nodeName}
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
        {imageElement}
      </div>
      <p className={nodeData.orbit === 2 ? 'small-node-text' : 'node-text'}>
        {nodeName}
        @
        {nodeData.x}
        ,
        {nodeData.y}
      </p>
      <NodeEditor orbit={nodeData.orbit} alterImageData={alterImageData} />
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
    orbit: PropTypes.number,
  }).isRequired,
  nodeRadius: PropTypes.number.isRequired,
  nodeName: PropTypes.string,
  nodeImage: PropTypes.shape({
    imgUrl: PropTypes.string,
    imgHeightOffset: PropTypes.number,
    imgWidthOffset: PropTypes.number,
    imgTopOffset: PropTypes.number,
    imgLeftOffset: PropTypes.number,
  }),
  newImgUrl: PropTypes.string.isRequired,
};

Node.defaultProps = {
  nodeImage: {
    imgUrl: '',
    imgHeightOffset: 0,
    imgWidthOffset: 0,
    imgTopOffset: 0,
    imgLeftOffset: 0,
  },
  nodeName: 'NO INGREDIENT',
};

export default Node;
