
const http = require('http');
const fs = require('fs');
const path = require('path');
const { login } = require('./auth'); // <-- Import login function

const PORT = 3000;

// Test the login function in the console
console.log(login("admin", "1234"));

const server = http.createServer((req, res) => {
  console.log(`Received request for: ${req.url}`);

  // Serve index.html on root request
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  // Optional: Add a login route (if you want later)
  } else if (req.url === '/login-test') {
    const result = login("admin", "1234");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(result);

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
