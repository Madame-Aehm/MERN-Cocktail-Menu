import React, { useContext, useState } from 'react'
import '../css/newRecipe.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteImage, recipeImageUpload } from '../utils/imageMangement';
import { AuthContext } from '../context/AuthContext.js'
import getToken from '../utils/getToken';
import PageLoader from '../components/PageLoader';

function NewRecipe() {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: "", quantity: 0, measure: "" }]);
  const [stepsList, setStepsList] = useState([""]);
  const [inputInfo, setInputInfo] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileAttach = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleInputChanges = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value});
  }

  const handleIngredientChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...ingredientsList];
    list[i][name] = value;
    setIngredientsList(list);
  }

  const handleIngredientRemove = (i) => {
    const list = [...ingredientsList];
    list.splice(i, 1);
    setIngredientsList(list);
  }

  const handleAddIngredient = () => {
    setIngredientsList([...ingredientsList, { ingredient: "", quantity: 0, measure: "" }]);
  }

  const handleStepsChange = (e, i) => {
    const { value } = e.target;
    const list = [...stepsList];
    list[i] = value;
    setStepsList(list);
  }

  const handleStepsRemove = (i) => {
    const list = [...stepsList];
    list.splice(i, 1);
    setStepsList(list);
  }

  const handleAddStep = () => {
    setStepsList([...stepsList, ""]);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();
    if (token) {
      const image = await recipeImageUpload(selectedFile);
      const recipeObject = { 
        ...inputInfo, 
        ingredients: ingredientsList, 
        instructions: stepsList, 
        image: image,
        username: user.username,
        posted_by: user._id
      };
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const toSubmit = JSON.stringify(recipeObject);
        const reqOptions = {
          method: "POST",
          headers: myHeaders,
          body: toSubmit,
        }
        const response = await fetch("http://localhost:5000/recipes/new-recipe", reqOptions);
        const result = await response.json();
        if (!result.error) {
          console.log(result);
          resetForm();
          setLoading(false);
          alert("Recipe added to the collection!")
        } else {
          if (image.public_id) {
            deleteImage(image);
          }
          setLoading(false);
          alert("Something went wrong. Please check all fields and try again.")
        }
      } catch (error) {
        console.log(error);
        if (image.public_id) {
          deleteImage(image);
        }
        setLoading(false);
      }
    }
  }

  function resetForm() {
    setIngredientsList([{ ingredient: "", quantity: 0, measure: "" }]);
    setStepsList([""]);
    setInputInfo({})
    setSelectedFile(null);
    const recipeForm = document.getElementById('new-recipe-form');
    recipeForm.reset();
  }

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      <h1 className='page-title'>New Recipe</h1>
      <div style={{textAlign: "center", background: "rgba(148,211,51,0.3)", color: "#1b8f47", padding: "0.5em", borderRadius: "1em", width: "80%"}}>
        <q>I've come up with a new recipeeh!</q> - Ignis Scientia
      </div>

      <Form id='new-recipe-form' className='form-container' onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Drink Name:</Form.Label>
          <Form.Control name='name' placeholder="Enter a name for your drink" spellCheck="false" onChange={handleInputChanges} required/>
        </Form.Group>

        <hr/>

        <Form.Group >
          <Form.Label>Method:</Form.Label>
          <Form.Control name='method' placeholder="Enter the preparation method" onChange={handleInputChanges} required/>
        </Form.Group>

        <hr/>

        <Form.Group controlId="formFile">
          <Form.Label>Upload an image:</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileAttach} />
        </Form.Group>

        <hr/>

        <div>
          <Form.Label>Ingredients:</Form.Label>
          <p style={{marginBottom: "0.3em"}}>
            Enter the ingredients used in your recipe. Include the name of the ingredient, the quantity, 
            and which measurement system you're using (eg. ml, dash, parts, etc.)
          </p>
          {ingredientsList.map((input, i) => {
            return (
              <div key={"ingredientInput" + i} className='box'>
                <label>Ingredient{i + 1}</label>
                <input name='ingredient' value={input.ingredient} placeholder='Ingredient name'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                <input name='quantity' value={input.quantity} type={"number"} placeholder='?'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                <input name='measure' value={input.measure} placeholder='Measure'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                {ingredientsList.length > 1 && <Button variant='danger' style={{alignSelf: "flex-end"}}
                  onClick={() => handleIngredientRemove(i)} >Remove</Button>}
              </div>
            );
          })}
          <Button variant='success' onClick={handleAddIngredient}>Add Ingredient</Button>
        </div>

        <hr/>

        <div>
          <Form.Label>Recipe instructions:</Form.Label>
          <p style={{marginBottom: "0.3em"}}>
            Explain step by step how to prepare your drink.
          </p>
          {stepsList.map((input, i) => {
            return (
              <div key={"stepsInput" + i} className='box'>
                <label>Step{i + 1}</label>
                <textarea name='step' value={input} placeholder='Write instructions here' style={{width: "100%"}}
                  onChange={(e) => handleStepsChange(e, i)} required/>
                {stepsList.length > 1 && <Button variant='danger' style={{alignSelf: "flex-end"}}
                  onClick={() => handleStepsRemove(i)} >Remove</Button>}
              </div>
            );
          })}
          <Button variant='success' onClick={handleAddStep}>Add Step</Button>
        </div>

        <button type='submit'>create object</button>

      </Form>


      

    </div>
  )
}

export default NewRecipe