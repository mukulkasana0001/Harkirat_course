import { WebSocketServer ,WebSocket} from "ws"

const wss = new WebSocketServer({ port: 8080 });

const users:WebSocket[] = []

wss.on("connection", (socket) => {


      // setInterval(() => {
            socket.send("connected ");
      // }, 1000)
   
      users.push(socket);
       

      socket.on("message", (e) => {
            // if (e.toString() == "ping") {

                  // socket.send("pong");
                  for(let j=0;j<users.length;j++){
                        // @ts-ignore
                        users[j].send(e.toString(),"sended")
                  }
            // } 

      })

})
