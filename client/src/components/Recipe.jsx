import {useState} from 'react'
import { Configuration,OpenAIApi } from 'openai';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';

const Recipe = () => {
  const [recipe,setRecipe]=useState('')
  const [ingredient,setIngredient]=useState('')
  const [recipeName,setRecipeName]=useState('')
  const fetchData = async () => {
    const configuration = new Configuration({
      apiKey:"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",
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Write a recipe based on these ingredients and instructions:\n\n${recipeName}\n\nIngredients:\n${ingredient}\n\nInstructions:`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      setRecipe(response);
      toast.success('Translation completed successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error occurred while fetching data!');
    }
  };
  
  return (
    <div>
        <div>
      <Link
        to="/"
        style={{
          cursor: 'pointer',
          border: '1px solid #ccc',
          padding: '0.6rem',
          margin: '20px',
          borderRadius: '50px',
          alignItems: 'center',
          fontStyle: 'bolder',
          fontSize: '15px',
          transform: 'all ease-in-out',
          display: 'flex',
        }}
      >
        <BiArrowBack />
      </Link>
      <h1>Recipe Generator</h1>
      <p>Generate your fav recipe in seconds with AI</p>
      <input value={recipeName} placeholder="input your recipe name.."
      onChange={(e)=>setRecipeName(e.target.value)}/>
      <br></br>
      <input value={ingredient} onChange={(e) => setIngredient(e.target.value)} 
      placeholder="input your ingredient..." />
      <div>
        <button onClick={fetchData}>Generate</button>
      </div>
      {recipe ? (
        <textarea
          rows={10}
          cols={50}
          value={JSON.stringify(recipe.data.choices[0].text, null, 2)}
          readOnly
        />
      ) : (
        // <p>Loading...</p>
        <img src="https://thumbs.gfycat.com/CompassionateGleefulLangur-size_restricted.gif" alt="loadgif"/>
      )}
      <ToastContainer />
    </div>
    </div>
  )
}

export default Recipe