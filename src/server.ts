import http from 'http';

import 'dotenv/config';
import getRequest from './getRequest';
import postRequest from './postRequest';
import putRequest from './putRequest';
import deleteRequest from './deleteRequest';

function startServer() {
  const host = 'localhost';
  const port = Number(process.env.SERVER_PORT);

  const requestListener = (request: http.IncomingMessage, response: http.ServerResponse) => {

    response.setHeader('Content-Type', 'application/json')

    if (request.url?.includes('/api/users')) {
      switch (request.method) {
        case 'GET': {
          getRequest(request, response);
          break;
        }
        case 'POST': {
          postRequest(request, response);
          break;
        }
        case 'PUT': {
          putRequest(request, response);
          break;
        }
        case 'DELETE': {
          deleteRequest(request, response);
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