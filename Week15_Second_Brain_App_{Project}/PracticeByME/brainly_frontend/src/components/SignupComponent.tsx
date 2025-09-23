import { useRef } from "react"
import { Input } from "./Input";
import { Button } from "./Button";
import { SignupIcon } from "../icons/SignupIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignupComponent = () => {

    const usernameRefrence = useRef(HTMLInputElement);
    const passwordRefrence = useRef(HTMLInputElement);

     const nevigator = useNavigate()
    
    async function  signup() {
        const username = usernameRefrence.current?.value;
        const password = passwordRefrence.current?.value;
        console.log(username,password)
      const response = await axios.post("http://localhost:3000/api/v1/signup",{
      username,
      password
        }) 

        nevigator("/signin")
}

    

    return <>
        <div className="p-3 shadow w-full h-full rounded-2xl">

            <div className="mt-2.5 flex flex-wrap justify-center ">
                <h1> Sign up</h1>
                <Input reference={usernameRefrence} placeholder="username" ></Input>
                <Input reference={passwordRefrence} placeholder="password" ></Input>

            </div>


            <div className=" mt-7  flex justify-center">
                <Button size='lg' varient="primary" text="submit" startIcon={<SignupIcon />} onClick={signup} ></Button>

            </div>


        </div>
    </>
}