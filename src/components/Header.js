import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import axios from 'axios';
import '../css/Header.css';

function Header(props) {
  const { setSearchIngredient } = props;
  const [searchText, setSearchText] = useState();

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
      console.log(error);
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
    </Box>
  );
}

Header.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
};

export default Header;
