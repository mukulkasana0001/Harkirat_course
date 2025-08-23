import { useRef } from "react";

function App() {
     
   function senddata(){
    // fetch("https://www.google.com/")
    console.log("fatched")
   }

   const variable= debounce(senddata);

  
  return (
    <>
    <div>
    <input  onChange={variable} type="text" />
    </div>  
    </>
  )
}
export function debounce(func){
  
  let  stopit=useRef();

  function timmer(val){
     clearTimeout(stopit.current)
      stopit.current=setTimeout(func,2000);
     }
  
     return timmer
}


export default App
