import http from 'http';

import User from "./user";

function putRequest(request: http.IncomingMessage, response: http.ServerResponse) {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    response.end(body);
  });
}

export default putRequest;