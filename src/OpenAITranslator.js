import axios from 'axios';

const openAIKey = ''; // Replace with your API key

const translateText = async (text, retryCount = 0) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Translate this English text to Ukrainian: "${text}"`,
          max_tokens: 60,
        },
        {
          headers: {
            'Authorization': `Bearer ${openAIKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return translateText(text, retryCount + 1);
      } else {
        console.error('Error translating text:', error);
        return '';
      }
    }
  };

export default translateText;
