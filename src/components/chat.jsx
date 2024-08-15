import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY_OPEN_IA;

const API_URL = 'https://api.openai.com/v1/images/generations';

function Chat() {
  const [message, setMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const generateImage = async (prompt) => {
    try {
      const response = await axios.post(API_URL, {
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        model: 'dall-e-3'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      const imageUrl = response.data.data[0].url;
      console.log('Generated image:', imageUrl);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
    }
  };

  const handleSendMessage = () => {
    generateImage(message);
  };

  return (
    <div className='chat-container'>
      <section className='chat-section'>
        <div className='chat-header'>
          <h2>Te quedaste sin ideas? Pregúntale a Luis</h2>
        </div>
        <div className='chat-message'>
          {generatedImage && <img src={generatedImage} alt="Generated" />}
        </div>
        <div className='chat-input-container'>
          <textarea
            className='chat-input'
            placeholder="Escribe qué quieres..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={5}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
          <button className='send-button' onClick={handleSendMessage}>Generar</button>
        </div>
      </section>
    </div>
  );
}

export default Chat;