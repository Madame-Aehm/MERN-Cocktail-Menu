import React, { useEffect, useState } from 'react'

function Home() {

  const container = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
  const card = {
    border: "solid 2px black",
    backgroundColor: "grey",
    textAlign: "center",
    color: "black"
  }
  const instructionsDiv = {
    textAlign: "left",
    padding: "0 10px"
  }

  const [allCocktails, setAllCocktails] = useState([]); 
  const [methodsList, setMethodsList] = useState([]);

  const fetchTest = async () => {
    const response = await fetch("http://localhost:5000/api/all")
    const data = await response.json()
    setAllCocktails(data.allCocktails);
    setMethodsList(generateMethodOptions(data.allCocktails));
  }

  function generateMethodOptions(list) {
    const methods = list.map((cocktail) => {
      return cocktail.Method;
    })
    const unique = [...new Set(methods)]
    return unique
  }

  useEffect(() => {
    fetchTest()
  }, [])

  return (
    <div style={container}>
      {allCocktails.map((cocktail) => {
        return (
          <div key={cocktail._id} style={card}>
            <h1>{cocktail.Name}</h1>
            <h3>{cocktail.Method}</h3>
            <ul style={instructionsDiv}>
              {cocktail.Ingredients.map((ingredient) => {
                return <li key={ingredient._id}>{ingredient.quantity}{ingredient.measure} {ingredient.ingredient}</li>
              })}
            </ul>
            <div style={instructionsDiv}>
              <hr/>
              {cocktail.Instructions.map((instruction, i) => {
                return <p key={i}>{instruction}</p>
              })}
              <hr/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home