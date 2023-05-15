const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/todo.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let tasks = qs.parse(data);
            fs.readFile('./views/display.html', 'utf8', (err, datahtml) => {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{task1}', tasks.task1);
                datahtml = datahtml.replace('{task2}', tasks.task2);
                datahtml = datahtml.replace('{task3}', tasks.task3);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            });
        });
        req.on('error', () => {
            console.log('error');
        });
    }
});

server.listen(8080, () => {
    console.log('server running at localhost:8080');
});