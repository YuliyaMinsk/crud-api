import http from 'http';
import { v4 } from 'uuid';

import User from './user';
import validateUser from './validateUser';

function postRequest(request: http.IncomingMessage, response: http.ServerResponse, userDB: User[]) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    const newUser = validateUser(body);
    if (newUser) {
      response.writeHead(201);

      userDB.push({
        id: v4(),
        username: newUser.username,
        age: newUser.age,
        hobbies: newUser.hobbies
      });

      response.end(JSON.stringify(userDB));
      return true;
    } else {
      response.writeHead(400);
      response.end('The required fields for the new user are not specified');
      return false;
    }
  });
}

export default postRequest;
