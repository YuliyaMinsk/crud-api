import http from 'http';
import { validate } from 'uuid';

import findUser from '../utils/findUser';
import User from '../user';

function getRequest(request: http.IncomingMessage, response: http.ServerResponse, userDB: User[]) {
  // return all users
  if (request.url === '/api/users') {
    response.writeHead(200);
    response.end(JSON.stringify(userDB));
    return true;
  }

  // return one user
  if (request.url.includes('/api/users/')) {
    const idToFind = request.url.slice('/api/users/'.length);

    if (!validate(idToFind)) {
      response.writeHead(400);
      response.end('User id is invalid');
      return false;
    }

    const userFound = findUser(idToFind, userDB);

    if (userFound) {
      response.writeHead(200);
      response.end(JSON.stringify(userFound));
      return true;
    }
  }

  response.writeHead(404);
  response.end('User with this id does not exist');
  return false;
}

export default getRequest;
