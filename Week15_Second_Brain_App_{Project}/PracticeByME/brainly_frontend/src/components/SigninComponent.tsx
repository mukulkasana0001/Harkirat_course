import { useRef } from "react"
import { Input } from "./Input";
import { Button } from "./Button";
import { SigninIcon } from "../icons/SigninIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SigninComponent = () => {

    const usernameRefrence = useRef(HTMLInputElement);
    const passwordRefrence = useRef(HTMLInputElement);
     const nevigator = useNavigate()

   
  async function signin() {
       const username=usernameRefrence.current.value;
       const password=passwordRefrence.current.value;
       
        const response = await axios.post("http://localhost:3000/api/v1/signin",{
      username,
      password
        }) 

        const jwtToken= response.data.token
        console.log(jwtToken)
        localStorage.setItem("token", jwtToken);
         
        nevigator("/")
        
   }


    return <>
        <div className="p-3 shadow w-full h-full rounded-2xl">

            <div className="mt-2.5 flex flex-wrap justify-center ">
                <h1> Sign in</h1>
                <Input reference={usernameRefrence} placeholder="username" ></Input>
                <Input reference={passwordRefrence} placeholder="password" ></Input>

            </div>


            <div className=" mt-7  flex justify-center">
                <Button size='lg' varient="primary" text="submit" startIcon={<SigninIcon />} onClick={signin} ></Button>

            </div>


        </div>
    </>
}