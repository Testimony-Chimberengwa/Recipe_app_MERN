import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = () => {
  const [recipes, setRecipes] = useState([]); // State to hold recipe data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:3000/display');
      const data = await res.json();
      setRecipes(data); // Set the recipes in state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="Recipe-Container">
      <strong>
        <h2>Recipes</h2>
      </strong>
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes available</p>
      ) : (
        <div className="cards">
          {recipes.map((recipe) => (
            <div className="card" key={recipe._id}>
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Recipe:</strong> {recipe.recipe}</p>
              <p><strong>Author:</strong> {recipe.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
