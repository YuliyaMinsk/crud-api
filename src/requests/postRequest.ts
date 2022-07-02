import http from 'http';
import { v4 } from 'uuid';

import User from '../user';
import validateUser from '../utils/validateUser';

function postRequest(request: http.IncomingMessage, response: http.ServerResponse, userDB: User[]) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    let newUser = validateUser(body);

    if (newUser) {
      newUser.id = v4();
      userDB.push({
        id: newUser.id,
        username: newUser.username,
        age: newUser.age,
        hobbies: newUser.hobbies
      });

      response.writeHead(201);
      response.end(JSON.stringify(newUser));

      return true;
    } else {
      response.writeHead(400);
      response.end('The required fields for the new user are not specified or wrong type');
      return false;
    }
  });
}

export default postRequest;
