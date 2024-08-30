const express = require('express');
const userAgent = require('user-agent');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/track', (req, res) => {
    const ip = req.ip; // Get the user's IP address
    const userAgentString = req.headers['user-agent']; // Get the user agent string

    // Parse the user agent
    const parsedUserAgent = userAgent.parse(userAgentString);

    // Log the IP and device information to the console
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});