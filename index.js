const fetch = require('node-fetch');
const Bottleneck = require('bottleneck');

// Define the GeniusGPT class
class GeniusGPT {
  constructor(options) {
    this.model = options.model;
    this.apiKey = options.apiKey;
    this.temperature = options.temperature || 0.8;
    this.maxTokens = options.maxTokens || 50;
    this.cacheEnabled = options.cacheEnabled !== undefined ? options.cacheEnabled : true;
    this.rateLimitingEnabled = options.rateLimitingEnabled !== undefined ? options.rateLimitingEnabled : true;
    this.errorHandlingEnabled = options.errorHandlingEnabled !== undefined ? options.errorHandlingEnabled : true;
    this.topPSamplingEnabled = options.topPSamplingEnabled !== undefined ? options.topPSamplingEnabled : false;
    this.cache = new Map(); // Cache for storing previous responses
    this.rateLimiter = new Bottleneck({ maxConcurrent: 1, minTime: 1000 }); // Rate limiter to avoid API rate limits
  }

  async textGeneration(prompt) {
    const cacheKey = prompt.toLowerCase(); // Use prompt as cache key (case-insensitive)
    if (this.cacheEnabled && this.cache.has(cacheKey)) {
      // Return response from cache if available and caching is enabled
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
      let response;

      if (this.rateLimitingEnabled) {
        // Use rate limiter to control API requests if rate limiting is enabled
        response = await this.rateLimiter.schedule(() => fetch(apiUrl, requestOptions).then((res) => res.json()));
      } else {
        response = await fetch(apiUrl, requestOptions).then((res) => res.json());
      }

      if (response.choices && response.choices.length > 0) {
        const generatedText = response.choices[0].text.trim();

        if (this.cacheEnabled) {
          // Store response in cache if caching is enabled
          this.cache.set(cacheKey, generatedText);
        }

        return generatedText;
      } else {
        throw new Error('Empty response from the API');
      }
    } catch (error) {
      if (this.errorHandlingEnabled) {
        // Throw error if error handling is enabled
        throw new Error(`An error occurred: ${error.message}`);
      } else {
        // Return empty string if error handling is disabled
        return '';
      }
    }
  }

  clearCache() {
    // Clear the cache
    this.cache.clear();
  }
}

// Export the GeniusGPT class
module.exports = GeniusGPT;
