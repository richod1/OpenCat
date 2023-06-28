import {useState} from 'react'
import { Configuration,OpenAIApi } from 'openai'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';

const QuestionAnswer = () => {
    const [question,setQuestion]=useState("")
    const [answer,setAnswer]=useState("")
    const trickey="that funny..";
    const fetchData= async()=>{
        const configuration=new Configuration({
            apiKey:"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",
        })
        const openai=new OpenAIApi(configuration)

        try{

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `I am a highly intelligent question answering bot. If you ask me a ${question} that is rooted in truth, I will give you the ${answer}. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with ${trickey}.`,
                temperature: 0.3,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
              });
              setAnswer(response);
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
  <h1>Question && Answer</h1>
  <p>Get answer to your questions in seconds with AI</p>
  
  <input value={question} onChange={(e) => setQuestion(e.target.value)} 
  placeholder="input your question..." />
  <div>
    <button onClick={fetchData}>Get Answer</button>
  </div>
  {answer ? (
    <textarea
      rows={10}
      cols={50}
      value={JSON.stringify(answer.data.choices[0].text, null, 2)}
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

export default QuestionAnswer