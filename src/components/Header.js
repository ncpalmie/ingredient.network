import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import axios from 'axios';
import '../css/Header.css';

function Header(props) {
  const { setSearchIngredient, setImgUrl } = props;
  const [searchText, setSearchText] = useState('salmon');

  // Grabs matching ingredient data from database
  const getIngredientData = async (ingredientName) => {
    try {
      const ingredientData = await axios.get(`/ingredients/${ingredientName}`);
      if (ingredientData.data) {
        setSearchIngredient(ingredientData.data);
      } else {
        // Replace this with 'No ingredient found, did you mean...' functionality
        setSearchIngredient({
          id: -1, name: 'NO INGREDIENT', strongConnections: [], weakConnections: [],
        });
      }
    } catch (error) {
      // Deal with error gracefully
    }
  };

  // UseEffect to update search term after a period of no user input
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchText) {
        getIngredientData(searchText);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <Box className="header-container">
      <TextInput onChange={(e) => setSearchText(e.target.value)} placeholder="Search for an ingredient..." />
      <TextInput onChange={(e) => setImgUrl(e.target.value)} placeholder="Set an ingredient image URL..." />
    </Box>
  );
}

Header.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
  setImgUrl: PropTypes.func.isRequired,
};

export default Header;
