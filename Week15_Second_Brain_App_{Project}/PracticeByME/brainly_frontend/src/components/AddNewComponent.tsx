import { useRef } from "react"
import { Input } from "./Input";
import { Button } from "./Button";
import { AddnewIcon } from "../icons/AddnewIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddNewComponent=()=>{
   
    const LinkRefrence = useRef(HTMLInputElement);
    const TypeRefrence = useRef(HTMLInputElement);
    const TitleRefrence = useRef(HTMLInputElement);
     const nevigator = useNavigate()



    //  const nevigator = useNavigate()
    async function addlink() {
        const title= TitleRefrence.current?.value
        const type= TypeRefrence.current?.value
        const link= LinkRefrence.current?.value
         
        console.log(title)
        console.log(type)
        console.log(link)
        await axios.post("http://localhost:3000/api/v1/content",{
        title,
        type,
        link
    },{
            headers: {
                "token": localStorage.getItem("token") || "" // Including the authorization token
            }
        })

        console.log(localStorage.getItem("token") )
      
    nevigator("/")
    }
    

      

    return<>
    <div className="p-3 shadow w-full h-full rounded-2xl">

        <div className="mt-2.5 flex flex-wrap justify-center ">
            <h1>Add New Link</h1>
           <Input reference={TitleRefrence} placeholder="Title" ></Input>
           <Input reference={LinkRefrence} placeholder="Link" ></Input>
           <Input reference={TypeRefrence} placeholder=" twitter | youtube "></Input>


        </div>
          
         
         <div className=" mt-7  flex justify-center">
        <Button size='lg' varient="primary" text="submit" startIcon={<AddnewIcon/>} onClick={addlink} ></Button>

         </div>
 
    
    </div>
    </>
}