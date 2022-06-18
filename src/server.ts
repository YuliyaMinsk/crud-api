import 'dotenv/config';
import http from 'http';

function startServer() {
  const host = 'localhost';
  const port = Number(process.env.SERVER_PORT);

  const requestListener = function (request: http.IncomingMessage, response: http.ServerResponse) {

    response.setHeader('Content-Type', 'application/json')

    if (request.url?.includes('/api/users')) {
      switch (request.method) {
        case 'GET': {
          break;
        }
        case 'POST': {
          break;
        }
        case 'PUT': {
          break;
        }
        case 'DELETE': {
          break;
        }
        default: {
          response.writeHead(501);
          response.end('The server does not support the request method');
        }
      }
    } else {
      response.writeHead(404);
      response.end('The route do not found');
    }
  }

  const server = http.createServer(requestListener);

  server.listen(port, host, () => {
    console.log(`Server is running on 🚀 http://${host}:${port}`);
  });
}

startServer();