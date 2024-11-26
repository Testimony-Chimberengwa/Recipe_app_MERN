

import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import './App.css';
import Header from './Header';
import Card from './Card';

function App() {
  const [name, setName] = useState('');
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [author, setAuthor] = useState('');
  const [recipes, setRecipes] = useState([]); // State to hold recipes

  // Function to handle adding a new recipe
  const add = async () => {
    const recipeData = {
      name,
      ingredients,
      recipe,
      author,
    };

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        // After successfully adding a recipe, fetch all recipes again
        fetchRecipes();
        alert('Recipe added successfully');
        clearForm();
      } else {
        alert('Failed to add recipe');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch all recipes from the database
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/display');
      const data = await response.json();
      setRecipes(data); // Set the fetched recipes to the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to clear the input fields
  const clearForm = () => {
    setName('');
    setIngredients('');
    setRecipe('');
    setAuthor('');
  };

  // Use effect to fetch recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <Header />
      <div className='Container'>
        <input
          type="text"
          placeholder='Enter Recipe Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder='Enter Ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder='Enter recipe description'
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
        />
        <input
          type="text"
          placeholder='Enter your name'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={add}>Add to Database</button>
      </div>
      
      {/* Pass the recipes to the Card component as props */}
      <Card recipes={recipes} />
      
      <Footer />
    </>
  );
}

export default App;
