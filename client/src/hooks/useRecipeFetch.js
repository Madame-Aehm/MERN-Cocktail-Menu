import { useEffect, useState } from 'react'

function useRecipeFetch(id) {
  const [recipe, setRecipe] = useState({
    comments: [],
    createdAt: "",
    image: {
      url: "",
      public_id: null
    },
    ingredients: [],
    instructions: [],
    method: "",
    name: "",
    posted_by: {_id: ""},
    updated_at: "",
    _id: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const getRecipe = async() => {
    if (id) {
      try {
        const response = await fetch("http://localhost:5000/recipes/recipe/" + id);
        const result = await response.json();
        console.log(result);
        setRecipe(result);
        setComments(result.comments);
        setLoading(false);
      } catch(error) {
        setError(error)
        console.log(error);
        setLoading(false);
      }
    }

  }

  useEffect(() => {
      getRecipe();
  }, [id]);

  return ({ recipe, comments, setComments, loading, setLoading, error })
}

export default useRecipeFetch