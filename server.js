const express = require('express');
const userAgent = require('user-agent');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Handle tracking
app.get('/track', (req, res) => {
    const ip = req.ip; // Get the user's IP address
    const userAgentString = req.headers['user-agent']; // Get the user agent string

    // Parse the user agent
    const parsedUserAgent = userAgent.parse(userAgentString);

    // Log to console
    console.log(`IP Address: ${ip}`);
    console.log(`Device: ${parsedUserAgent.device}`);
    console.log(`Operating System: ${parsedUserAgent.os}`);
    console.log(`Browser: ${parsedUserAgent.browser}`);

    // Create a response object
    const response = {
        ip: ip,
        device: parsedUserAgent.device,
        os: parsedUserAgent.os,
        browser: parsedUserAgent.browser
    };

    res.json(response);
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});