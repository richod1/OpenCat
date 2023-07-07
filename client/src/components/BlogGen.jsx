import {useState} from 'react'
import { Configuration,OpenAIApi } from 'openai'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';

const BlogGen = () => {
    const [blogTitle,setBlogTitle]=useState("")
    const [blogArticle,setBlogArticle]=useState("")

    const fetchData= async()=>{
        const configuration=new Configuration({
            apiKey:"",
        })
        const openai= new OpenAIApi(configuration)

        try{
            const response=await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `write me an article of 200 words on  ${blogTitle} \n your ${blogArticle} should bullet out major point of the blog article`,
                temperature: 0.3,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            })
            setBlogArticle(response)
            toast("Blog generated successfully")
            console.log("success")


        }catch(err){
            console.log("failed to fetch data")
            toast("failed to fetch data try again!")
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
  <h1>Blog Article Generator</h1>
  <p>Generate your blog article in seconds with AI</p>
  
  <input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} 
  placeholder="input your blog title..." />
  <div>
    <button onClick={fetchData}>Get Article</button>
  </div>
  {blogArticle ? (
    <textarea
      rows={10}
      cols={50}
      value={JSON.stringify(blogArticle.data.choices[0].text, null, 2)}
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

export default BlogGen