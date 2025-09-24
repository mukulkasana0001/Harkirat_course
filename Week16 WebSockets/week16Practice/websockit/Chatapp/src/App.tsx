import { useEffect, useRef, useState } from 'react'


function App() {
  const [socket, setsocket] = useState(null)
  const typeref = useRef(null)
  const roomIdref = useRef(null)
  const messageref = useRef(null)
  const [addmessage, setaddmessage] = useState([{ message: "hii", who: "me" },{ message: "hii", who: "other" }])
  const  autoUpRef = useRef<HTMLElement>(null);   //for auto scroll down when new message come



  function join() {
    if (!socket) {
      return;
    }
    let obj = {
      type: typeref.current?.value,
      payload: {
        roomId: parseInt(roomIdref.current?.value)
      }
    }

    socket.send(JSON.stringify(obj))

  }

  function sendmsg() {
    if (!socket) {
      return;
    }
    let obj = {
      type: typeref.current?.value,
      payload: {
        message: messageref.current?.value
      }
    }


    setaddmessage(w => [...w, { message: obj.payload.message, who: "me" }])
    socket.send(JSON.stringify(obj))
  }


  // {"type":"chat","payload":{"message":"how are you 123"}}

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080")
    //@ts-ignore

    setsocket(ws)

    ws.onmessage = (ev) => {
      console.log(ev.data)
      setaddmessage(m => [...m, { message: ev.data, who: "other" }])

    }

    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, [])


  useEffect(() => {
  if (autoUpRef.current) {
    autoUpRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [addmessage]);

  return <><div className='w-screen h-screen  bg-gray-500 flex flex-col  items-end'  >

    <div className=' h-[90vh] overflow-y-scroll w-full p-9  flex flex-col items-center  bg-gray-400' >

      {/* <div className='  bg-gray-800 h-full w-full'>
                
          </div> */}

      {addmessage.map((msg, i) => (
        <div key={i} className={`p-2 mt-1 rounded w-1/2 ${msg.who === "me" ? "bg-blue-100  text-right" : "bg-sky-100"}`} >
          {msg.message}

          <div ref={autoUpRef} ></div>
        </div>
      ))}




    </div>



    <div className=' w-full flex justify-evenly  items-center'>


      <div className='p-4 bg-gray-700  rounded-2xl h-full '>
        <div className='rounded-2xl bg-white h-full '>
          <input className='text-center h-10' ref={typeref} type="text" placeholder='type: chat | join' />

        </div>
      </div>

      <div className='p-4 bg-gray-700  flex  rounded-2xl h-full items-center'>
        <div className='rounded-2xl bg-white h-full mr-2 '>
          <input className='text-center h-10' ref={roomIdref} type="text" placeholder='join id' />

        </div>
        <div className='border-2 bg-gray-300 p-2 rounded-2xl'>
          <button onClick={join}>Join Id</button>
        </div>
      </div>



      <div className='p-4 bg-gray-700  flex  rounded-2xl h-full items-center'>
        <div className='rounded-2xl bg-white  h-full mr-2 '>
          <input className='text-center h-10' ref={messageref} type="text" placeholder='message' />

        </div>

        <div className='border-2  bg-gray-300 p-2 rounded-2xl'>
          <button onClick={sendmsg}>send</button>
        </div>


      </div>

    </div>



  </div>

  </>
}

export default App
