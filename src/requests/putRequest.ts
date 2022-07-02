import http from 'http';
import { validate } from 'uuid';

import User from '../user';
import findIndex from '../utils/findIndex';
import validateUser from '../utils/validateUser';

function putRequest(request: http.IncomingMessage, response: http.ServerResponse, userDB: User[]) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    if (request.url.includes('/api/users/')) {
      const idToFind = request.url.slice('/api/users/'.length);

      if (!validate(idToFind)) {
        response.writeHead(400);
        response.end('User id is invalid');
        return false;
      }

      const index = findIndex(idToFind, userDB);

      if (index === -1) {
        response.writeHead(404);
        response.end('User with this id does not exist');
        return false;
      }

      let newUserData = JSON.parse(body);

      if (newUserData.username) {
        if (typeof newUserData.username === 'string') {
          userDB[index].username = newUserData.username;
        } else {
          response.writeHead(400);
          response.end('The username should be String');
          return false;
        }
      }
      if (newUserData.age) {
        if (typeof newUserData.age === 'number') {
          userDB[index].age = newUserData.age;
        } else {
          response.writeHead(400);
          response.end('The age should be Number');
          return false;
        }
      }
      if (newUserData.hobbies) {
        if (Array.isArray(newUserData.hobbies)) {
          userDB[index].hobbies = newUserData.hobbies;
        } else {
          response.writeHead(400);
          response.end('The hobbies should be Array');
          return false;
        }
      }

      response.writeHead(200);
      response.end(JSON.stringify(userDB[index]));

      return true;
    } else {
      response.writeHead(400);
      response.end('The required fields for the new user are not specified');
      return false;
    }
  });
}

export default putRequest;
