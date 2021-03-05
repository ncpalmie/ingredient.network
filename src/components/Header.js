import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import '../css/Graph.css';

function Header(props) {
  const { setSearchVal } = props;

  return (
    <Box>
      <TextInput onChange={(e) => setSearchVal(e.target.value)} placeholder="Search for an ingredient..." />
    </Box>
  );
}

Header.propTypes = {
  setSearchVal: PropTypes.func.isRequired,
};

export default Header;
