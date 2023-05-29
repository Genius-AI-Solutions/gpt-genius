const fetch = require('node-fetch');
const Bottleneck = require('bottleneck');

// Define the GeniusGPT class
class GeniusGPT {
  constructor(options) {
    this.model = options.model;
    this.apiKey = options.apiKey;
    this.temperature = options.temperature || 0.8;
    this.maxTokens = options.maxTokens || 50;
    this.cache = new Map(); // Cache for storing previous responses
    this.rateLimiter = new Bottleneck({ maxConcurrent: 1, minTime: 1000 }); // Rate limiter to avoid API rate limits
  }

  async textGeneration(prompt) {
    const cacheKey = prompt.toLowerCase(); // Use prompt as cache key (case-insensitive)
    if (this.cache.has(cacheKey)) {
      // Return response from cache if available
      return this.cache.get(cacheKey);
    }

    const requestBody = {
      prompt,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    };

    const apiUrl = `https://api.openai.com/v1/engines/${this.model}/completions`;

    try {
      // Use rate limiter to control API requests
      const response = await this.rateLimiter.schedule(() =>
        fetch(apiUrl, requestOptions).then((res) => res.json())
      );

      if (response.choices && response.choices.length > 0) {
        const generatedText = response.choices[0].text.trim();

        // Store response in cache
        this.cache.set(cacheKey, generatedText);

        return generatedText;
      } else {
        throw new Error('Empty response from the API');
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }

  clearCache() {
    // Clear the cache
    this.cache.clear();
  }
}

// Export the GeniusGPT class
module.exports = GeniusGPT;
