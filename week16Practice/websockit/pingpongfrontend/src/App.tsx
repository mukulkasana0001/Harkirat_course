import { useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [socket, setsocket] = useState(null)
  const inputref = useRef(null)

  function sendmsg() {
    if(!socket){
      return 
    }
        
    //@ts-ignore 
    const msg = inputref.current.value;
    console.log(msg)
    socket.send(msg)
  }


  useEffect(()=>{

         const ws =  new   WebSocket("ws://localhost:8080")
           //@ts-ignore
        
           setsocket(ws)
           
           ws.onmessage = (ev)=>{
            console.log(ev.data)
           }
    

  },[])

  return (
    <>
      <input ref={inputref} type="text" />

      <button onClick={sendmsg}>ping</button>
    </>
  )
}

export default App
