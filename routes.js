const fs = require('fs');

const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Dummy Node Server</title></head>');
        res.write('<body><form action="/dummy-request" method="POST"><input type="text" name="message"><button type="submit">Click to send a request to server</button></form></body>');
        res.write('</html>');
        return res.end;
    }

    if(url === '/dummy-request' && method === 'POST') {
        const body = [];
        req.on('data', (chuck) => {
            body.push(chuck);
        });
        req.on('end', () => {
            const parsedResponse = Buffer.concat(body).toString();
            const dummyText = parsedResponse.split('=')[1];
            fs.writeFile('dummy-text.txt', dummyText, (error => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }));
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Dummy page</title></head>');
    res.write('<body><h1>Hello from Node Server</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = routesHandler;