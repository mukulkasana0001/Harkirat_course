import {  useRef, useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const ChangePassword = () => {
    const [change,setchange]= useState("Change")
    const [errorfound,seterrorfound]= useState("")
    
     const navigator= useNavigate();

    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const Password = useRef<HTMLInputElement>(null);
  
    async function changefun() {
        const firstname = firstName.current?.value
        const lastname = lastName.current?.value
        const password = Password.current?.value
        console.log({ firstname, lastname, password });

        
        try {
            setchange((x:string)=>x="....")
            const response = await axios.put('http://localhost:3000/api/v1/user', {
                firstname,
                lastname,
                password
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            });
            console.log(response);
            alert("Password Changed Successfully");
            setchange("Change")
            navigator('/')
        } catch (error:any) {
            setchange("Change Again")
            console.error(error.response.data.message);
            seterrorfound((x)=>x=error.response.data.message)

        }
    }




    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex  flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Enter New Password"} />
                 {errorfound==""? <SubHeading  label={"Enter your infromation to create an new Password"} /> : <SubHeading style="text-red-600" label={errorfound} />}
                
                <InputBox refrence={firstName} placeholder="John" label={"First Name"} />
                <InputBox refrence={lastName} placeholder="Doe" label={"Last Name"} />
                <InputBox refrence={Password} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button label={change} onClick={changefun} />
                </div>
            </div>
        </div>
    </div>
}