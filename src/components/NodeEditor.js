import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from 'react-icons/ai';
import '../css/NodeEditor.css';

function NodeEditor(props) {
  const { orbit, alterImageData } = props;

  return (
    <Box>
      <Box>
        <Button
          className={orbit === 2 ? 'small-node-editor-height-inc' : 'node-editor-height-inc'}
          icon={<AiOutlineZoomIn />}
          onClick={() => { alterImageData('imgHeightOffset', 1); }}
          plain
        />
        <Button
          className={orbit === 2 ? 'small-node-editor-height-dec' : 'node-editor-height-dec'}
          icon={<AiOutlineZoomOut />}
          onClick={() => { alterImageData('imgHeightOffset', -1); }}
          plain
        />
      </Box>
      <Box>
        <Button
          className={orbit === 2 ? 'small-node-editor-width-inc' : 'node-editor-width-inc'}
          icon={<AiOutlineZoomIn />}
          onClick={() => { alterImageData('imgWidthOffset', 1); }}
          plain
        />
        <Button
          className={orbit === 2 ? 'small-node-editor-width-dec' : 'node-editor-width-dec'}
          icon={<AiOutlineZoomOut />}
          onClick={() => { alterImageData('imgWidthOffset', -1); }}
          plain
        />
      </Box>
      <Box>
        <Button
          className={orbit === 2 ? 'small-node-editor-top-inc' : 'node-editor-top-inc'}
          icon={<AiOutlinePlusSquare />}
          onClick={() => { alterImageData('imgTopOffset', -1); }}
          plain
        />
        <Button
          className={orbit === 2 ? 'small-node-editor-top-dec' : 'node-editor-top-dec'}
          icon={<AiOutlineMinusSquare />}
          onClick={() => { alterImageData('imgTopOffset', 1); }}
          plain
        />
      </Box>
      <Box>
        <Button
          className={orbit === 2 ? 'small-node-editor-left-inc' : 'node-editor-left-inc'}
          icon={<AiOutlinePlusSquare />}
          onClick={() => { alterImageData('imgLeftOffset', 1); }}
          plain
        />
        <Button
          className={orbit === 2 ? 'small-node-editor-left-dec' : 'node-editor-left-dec'}
          icon={<AiOutlineMinusSquare />}
          onClick={() => { alterImageData('imgLeftOffset', -1); }}
          plain
        />
      </Box>
    </Box>
  );
}

NodeEditor.propTypes = {
  orbit: PropTypes.number,
  alterImageData: PropTypes.func.isRequired,
};

NodeEditor.defaultProps = {
  orbit: 0,
};

export default NodeEditor;
