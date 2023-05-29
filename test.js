const GeniusGPT = require('./index');

// Initialize GeniusGPT with your options
const genius = new GeniusGPT({
  apiKey: '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',
  model: 'text-davinci-002',
  temperature: 0.7,
  maxTokens: 30,
});

// Call the textGeneration method to generate text
genius.textGeneration('What model are you?')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
