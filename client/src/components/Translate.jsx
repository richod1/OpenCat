import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Translate = () => {
    const api=import.meta.env.API_KEY;
  const [response, setResponse] = useState(null);
  const [phrase, setPhrase] = useState('');

  const fetchData = async () => {
    const configuration = new Configuration({
      apiKey:"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",
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Translate this into 1. French, 2. Spanish and 3. Japanese:\n\n${phrase}?\n\n1.`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      setResponse(response);
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
      <h1>Translator</h1>
      <p>Translate english phrase to multiple language in seconds with AI</p>
      <input value={phrase} onChange={(e) => setPhrase(e.target.value)} />
      <div>
        <button onClick={fetchData}>Translate</button>
      </div>
      {response ? (
        <textarea
          rows={10}
          cols={50}
          value={JSON.stringify(response.data.choices[0].text, null, 2)}
          readOnly
        />
      ) : (
        // <p>Loading...</p>
        <img src="https://thumbs.gfycat.com/CompassionateGleefulLangur-size_restricted.gif" alt="loadgif"/>
      )}
      <ToastContainer />
    </div>
    </div>
  );
};

export default Translate;
