import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 });



type user = {
      "socket": WebSocket;

      "roomId"?: number;

}

let users: user[] = []


wss.on("connection", (socket) => {

      // socket.send("connected ");

 


      socket.on("message", (e) => {
            //@ts-ignore
            const paresdmsg = JSON.parse(e.toString())

            if (paresdmsg.type == "join") {

                  users.push({
                        socket,
                        "roomId": paresdmsg.payload.roomId
                  });
                  socket.send("you are Joined ")
            }
            else if (paresdmsg.type == "chat") {

                  const messegeToSend = paresdmsg.payload.message;
                  let currentRoomId = null;
                  let currentUserNumber=null;

                  for (let i = 0; i < users.length; i++) {
                        if (users[i]?.socket == socket) {
                              currentRoomId = users[i]?.roomId;
                              currentUserNumber=i;

                        }

                  }

                  for (let i = 0; i < users.length; i++) {

                        if (users[i]?.socket != socket && users[i]?.roomId == currentRoomId) {
                              users[i]?.socket.send("user "+currentUserNumber+" | "+messegeToSend)
                        }
                  }

            } else {
                  socket.send("Plese choose correct type")
            }


          

      })

      socket.on("close",()=>{
             users = users.filter(i=>i.socket!=socket);

             socket.send("connection closed")

           })

})
