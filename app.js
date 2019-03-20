const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Dummy Node Server</title></head>');
    res.write('<body><form action="/dummy-request" method="POST"><input type="text" name="message"><button type="submit">Click to send a request to server</button></form></body>');
    res.write('</html>');
    return res.end;
}

res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>Dummy page</title></head>');
res.write('<body><h1>Hello from Node Server</h1></body>');
res.write('</html>');
res.end();
});

server.listen(3000);