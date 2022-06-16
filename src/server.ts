import 'dotenv/config';
import http from 'http';

function run() {
  const host = 'localhost';
  const port = process.env.SERVER_PORT;

  const requestListener = function (_req: any, res: http.ServerResponse) {
    res.writeHead(200);
    res.end('Hello, World!');
  }

  const server = http.createServer(requestListener);
  server.listen(Number(port), host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

run();