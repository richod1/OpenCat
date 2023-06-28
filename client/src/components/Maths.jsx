import {useState} from 'react'
import { Configuration,OpenAIApi } from 'openai'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';

const Maths = () => {
    const [problem,setProblem]=useState('')
    const [solution,setSolution]=useState('')

    const fetchData= async()=>{
        const configuration=new Configuration({
            apiKey:"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",
        })
        const openai=new OpenAIApi(configuration)

        try{

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `You a mathematics professor and have been given a math ${problem} by your student to solve. Please write an algorithm or provide step-by-step instructions to find the solution.`,
                temperature: 0.3,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
              });
              setSolution(response);
              toast.success('problem solveed successfully!');
            } catch (error) {
              console.error('Error fetching data:', error);
              toast.error('Error occurred while fetching data!');
            }
    }
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
  <h1>Solve the maths problem</h1>
  <p>Generate your math solution in seconds with AI</p>
  
  <input value={problem} onChange={(e) => setProblem(e.target.value)} 
  placeholder="input your problem..." />
  <div>
    <button onClick={fetchData}>Solve</button>
  </div>
  {solution ? (
    <textarea
      rows={10}
      cols={50}
      value={JSON.stringify(solution.data.choices[0].text, null, 2)}
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

export default Maths