/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import axios from 'axios';
import '../css/Header.css';

function Header(props) {
  const { setSearchIngredient, setImgUrl } = props;
  let searchText = 'salmon';
  let typingTimeout = 0;
  console.log('header');

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

  // Updates search term after typing delay
  const getSearchText = (e) => {
    searchText = e.target.value;
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      getIngredientData(searchText);
    }, 500)
  };

  return (
    <Box className="header-container">
      <TextInput onChange={(e) => getSearchText(e)} placeholder="Search for an ingredient..." />
      <TextInput onChange={(e) => setImgUrl(e.target.value)} placeholder="Set an ingredient image URL..." />
    </Box>
  );
}

Header.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
  setImgUrl: PropTypes.func.isRequired,
};

export default Header;
