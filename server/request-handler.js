/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var data = {
  results: []
};
const url = require('url');

var exports = module.exports = {};
exports.requestHandler = function(request, response) {

  var statusCode;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/JSON';
  
  if (url.parse(request.url).pathname!== '/classes/messages') {
  
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('ERROR 404: path not valid');
  }
  
  if (url.parse(request.url).pathname === '/classes/messages') {
    
    if (request.method === 'POST') {
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      statusCode = 201;
    
      response.writeHead(statusCode, headers);
      //store the messages 
      let body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        data.results.push(JSON.parse(body));
        // console.log(data.results);
        response.end(JSON.stringify('Post Received'));
      });
    }
 
    if (request.method === 'GET') {
      
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      statusCode = 200;
      
      response.writeHead(statusCode, headers);
      console.log(data.results);
      response.end(JSON.stringify(data)); 
    }
    
    if (request.method === 'DELETE') {
      
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      statusCode = 200;
      data.results.pop();
    
      
      response.writeHead(statusCode, headers);
      
      response.end('Last message deleted'); 
    }
   
  }
};
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.



