const axios = require('axios');

class GeniusGPT {
  constructor(apiKey, model = 'text-davinci-003') {
    this.endpoint = 'https://api.openai.com/v1/engines/' + model + '/completions';
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  }

  prompt(text, options = {}) {
    const data = {
      prompt: text,
      max_tokens: options.maxTokens || 50,
      temperature: options.temperature || 1.0
    };

    return axios.post(this.endpoint, data, { headers: this.headers })
      .then(response => response.data.choices[0].text)
      .catch(error => { throw new Error(error); });
  }
}

module.exports = GeniusGPT;
