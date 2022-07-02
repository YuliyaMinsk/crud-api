import http from 'http';

import 'dotenv/config';
import getRequest from './requests/getRequest';
import postRequest from './requests/postRequest';
import putRequest from './requests/putRequest';
import deleteRequest from './requests/deleteRequest';
import User from './user';

function startServer() {
  const host = 'localhost';
  const port = Number(process.env.SERVER_PORT);

  const userDB: User[] = []; // in-memory database

  const requestListener = (request: http.IncomingMessage, response: http.ServerResponse) => {
    try {
      response.setHeader('Content-Type', 'application/json');

      if (request.url?.includes('/api/users')) {
        switch (request.method) {
          case 'GET': {
            getRequest(request, response, userDB);
            break;
          }
          case 'POST': {
            postRequest(request, response, userDB);
            break;
          }
          case 'PUT': {
            putRequest(request, response, userDB);
            break;
          }
          case 'DELETE': {
            deleteRequest(request, response, userDB);
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
    } catch {
      response.writeHead(500);
      response.end('Server error. Try again!');
    }
  };

  const server = http.createServer(requestListener);

  server.listen(port, host, () => {
    console.log(`Server is running on 🚀 http://${host}:${port}`);
  });

  server.on('connection', (socket) => {
    // console.log(`Worker ${process.pid} got a connection`);
  });

  return server;
}

export default startServer;
