const { OpenAIApi } = require('openai');

const simpleQuery = async (req, res) => {
  const { apiKey, prompt } = req.body;

  try {
    console.log('Simple query received:', req.body);

    const openai = new OpenAIApi({ key: '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' });
    const response = await openai.createCompletion({
      engine: 'text-davinci-003',
      prompt,
      max_tokens: 50 // Or any other default configuration for a simple query
    });

    console.log('OpenAI response received:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

const advancedQuery = async (req, res) => {
  const { apiKey, prompt, options } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const openai = new OpenAIApi({ key: apiKey });
    const response = await openai.createCompletion({
      engine: 'text-davinci-003',
      prompt,
      ...options // Spread the options to allow customization of the query
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

module.exports = {
  simpleQuery,
  advancedQuery
};
