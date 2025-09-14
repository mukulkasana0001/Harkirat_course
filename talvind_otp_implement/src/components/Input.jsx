import { memo } from "react"

export const Input= memo( function({ type,refrence,onBackspace}) {
    console.log("Input render");

    return <>
   
        <input ref={refrence}  type={type}  maxLength={1} onKeyUp={onBackspace} className={`bg-blue-500 m-3 rounded-3xl text-center outline-0 w-8`}></input>
    
         </>}
         
)