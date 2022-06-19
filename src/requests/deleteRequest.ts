import http from 'http';
import { validate } from 'uuid';

import User from '../user';
import findIndex from '../utils/findIndex';

function deleteRequest(request: http.IncomingMessage, response: http.ServerResponse, userDB: User[]) {
  const idToFind = request.url.slice('/api/users/'.length);

  if (!validate(idToFind)) {
    response.writeHead(400);
    response.end('User id is invalid');
    return false;
  }

  const index = findIndex(idToFind, userDB);

  if (index !== -1) {
    response.writeHead(204);
    userDB.splice(index, index + 1); // delete user
    response.end(JSON.stringify(userDB));
    return true;
  }

  response.writeHead(404);
  response.end('User with this id does not exist');
  return false;
}

export default deleteRequest;
