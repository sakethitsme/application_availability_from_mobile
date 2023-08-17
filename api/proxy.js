const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const targetUrl = req.query.url;

    // Fetch data from the target URL
    const response = await fetch(targetUrl);

    // Get response headers and content
    const headers = {};
    response.headers.forEach((value, name) => {
      headers[name] = value;
    });
    const content = await response.text();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Respond with the fetched content and headers
    res.status(response.status).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};