import React, { createContext, useEffect, useState } from 'react';
import getToken from '../utils/getToken';
import { deleteImage } from '../utils/imageMangement';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipesList, setRecipesList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllRecipes = async () => {
    const response = await fetch("http://localhost:5000/recipes/")
    const data = await response.json()
    setRecipesList(data);
    setLoading(false);
  }

  const deleteRecipe = async (id) => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      const toSubmit = JSON.stringify({ _id: id });
      const reqOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: toSubmit
      }
      try {
        const response = await fetch("http://localhost:5000/recipes/delete-recipe", reqOptions);
        const result = response.json();
        return result;
      } catch (error) {
        return ({ error: error });
      }
    }
  }

  const handleDeleteRecipe = async (drink) => {
    if (window.confirm("You're sure you want to delete this recipe? This is cannot be undone.")) {
      try {
        const deleted = await deleteRecipe(drink._id);
        console.log(deleted.msg);
        setRecipesList(recipesList.filter((recipe) => recipe._id !== drink._id));
        try {
          const deletedImage = await deleteImage(drink.image);
          console.log(deletedImage);
        } catch (error) {
          console.log("Recipe deleted, but problem deleting image: ", error);
        }
      } catch (error) {
        alert("Something went wrong: " + error);
      }
    }
  }

  useEffect(() => {
    fetchAllRecipes();
  }, [])


  return (
    <RecipesContext.Provider value={{ recipesList, setRecipesList, deleteRecipe, handleDeleteRecipe, loading }}>
      { props.children }
    </RecipesContext.Provider>
  )
}