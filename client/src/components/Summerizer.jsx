import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Summerizer = () => {
  const [passage, setPassage] = useState('');
  const [summary, setSummary] = useState('');

  const fetchData = async () => {
    const configuration = new Configuration({
      apiKey: "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", 
    });

    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Please provide a brief summary of the given\n${passage}. Identify the main points, key arguments, and important supporting details. Focus on capturing the essence of the passage while maintaining clarity and conciseness. Your ${summary} should be approximately 3-5 sentences long.`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        // stop: ["\n"],
      });

      setSummary(response);
      toast.success('Passage summarized successfully');
    } catch (err) {
      console.log('Failed to summarize');
      toast.error('Unable to fetch data');
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
        <h1>Passage Summarizer</h1>
        <p>Get your passage summarized in seconds with AI</p>

        <input
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          placeholder="Input your passage..."
        />
        <div>
          <button onClick={fetchData}>Summarize</button>
        </div>
        {summary ? (
          <textarea
            rows={10}
            cols={50}
            value={JSON.stringify(summary.data.choices[0].text, null, 2)}
            readOnly
          />
        ) : (
          <img
            src="https://thumbs.gfycat.com/CompassionateGleefulLangur-size_restricted.gif"
            alt="loading gif"
          />
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Summerizer;
