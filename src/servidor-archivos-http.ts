import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';

const port: number = parseInt(process.argv[2], 10);
const filePath: string = process.argv[3];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const readStream = fs.createReadStream(filePath);

  readStream.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
    console.error(err);
  });

  readStream.pipe(res);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
