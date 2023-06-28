const express=require('express')
const app=express()
const port=4000
const {Configuration,OpenAIApi}=require('openai')
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
const cors=require('cors')



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const configuration=new Configuration({
    apiKey:process.env.API_KEY,
})

const openai=new OpenAIApi(configuration);

app.get('/api',(req,res)=>{
    res.json({
        msg:'app is cooking'
    })
})

app.post('/recipe',async(req,res)=>{
    const prompt = req.body.prompt;
  

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 120,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
})



app.listen(port,(err)=>{
    if(err) throw new Error('server asleep..')
    console.log(`server is up on port ${port}`)
})