import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import '../css/Graph.css';

function Header(props) {
  const { setSearchIngredient } = props;
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchText) {
        setSearchIngredient(searchText);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <Box>
      <TextInput onChange={(e) => setSearchText(e.target.value)} placeholder="Search for an ingredient..." />
    </Box>
  );
}

Header.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
};

export default Header;
