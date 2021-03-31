import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/Graph.css';
import axios from 'axios';
import NodeEditor from './NodeEditor';

// Update database with new ingredient image data
const updateNodeImage = async (ingredientName, ingredientImage) => axios.patch(
  `/ingredients/${ingredientName}/image`, { imageData: ingredientImage },
);

// Fetch node image data
const fetchImageData = (ingredientName) => {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await axios.get(`/ingredients/${ingredientName}/image`);
    setData(response.data);
  }

  useEffect(() => { fetchData(); }, [ingredientName]);

  if (!data) {
    return {
      imgUrl: '',
      imgHeightOffset: 0,
      imgWidthOffset: 0,
      imgTopOffset: 0,
      imgLeftOffset: 0,
    };
  }

  return {
    imgUrl: data.imgUrl,
    imgHeightOffset: data.imgHeightOffset,
    imgWidthOffset: data.imgWidthOffset,
    imgTopOffset: data.imgTopOffset,
    imgLeftOffset: data.imgLeftOffset,
  };
};

function Node(props) {
  const edgeWidth = 10;
  const {
    nodeData, nodeRadius, nodeName, newImgUrl,
  } = props;
  const [imageData, setImageData] = useState(fetchImageData(nodeName));
  const imgHeight = 100 + imageData.imgHeightOffset;
  const imgWidth = 100 + imageData.imgWidthOffset;
  const imageElement = imageData ? (
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
  ) : null;
  console.log('node');

  // Node positioning math
  const nodeX = (nodeData.x) - nodeRadius + (edgeWidth / 2);
  const nodeY = nodeData.y - nodeRadius + (edgeWidth / 2);
  const smallNodeX = (nodeData.x + (edgeWidth / 2)) - (nodeRadius * 0.75) - edgeWidth / 2;
  const smallNodeY = nodeData.y - (nodeRadius * 0.75) + edgeWidth / 2;

  const alterImageData = (attribute, delta) => {
    const newImageData = {
      imgUrl: imageData.imgUrl,
      imgHeightOffset: imageData.imgHeightOffset,
      imgWidthOffset: imageData.imgWidthOffset,
      imgTopOffset: imageData.imgTopOffset,
      imgLeftOffset: imageData.imgLeftOffset,
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
      <p className="node-text">
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
  nodeData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    orbit: PropTypes.number,
  }).isRequired,
  nodeRadius: PropTypes.number.isRequired,
  nodeName: PropTypes.string,
  newImgUrl: PropTypes.string.isRequired,
};

Node.defaultProps = {
  nodeName: 'NO INGREDIENT',
};

export default Node;
