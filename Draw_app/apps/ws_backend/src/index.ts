import { WebSocketServer } from 'ws';
import  jwt, { JwtPayload }  from 'jsonwebtoken';

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws,req) {
  
  const url = req.url;
  if(!url){
    return;
  }
  const query=    new URLSearchParams(url?.split("?")[1]);    //URLSearc hParams is a built-in JavaScript class (in Node.js and browsers) that lets you easily read and manipulate query parameters from a URL.
                                                              // **EXAMPLE-
                                                              // const queryString = "name=Mukul&age=21&token=abc123";
                                                              // const params = new URLSearchParams(queryString);

                                                              // console.log(params.get("name"));   // "Mukul"
                                                              // console.log(params.get("age"));    // "21"
                                                              // console.log(params.get("token"));  // "abc123"

                         
  const token = query.get("token")
  if(!token){
    return
  }
  const decoded = jwt.verify(token,"secret")
  if(!decoded ||(decoded as JwtPayload).userId){
ws.close();
return;
  }
  

  ws.on('message', function message(data) {
    console.log("pong");
  });

  
}); 