import { useRef } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const nevigator= useNavigate();
        const userName = useRef<HTMLInputElement>(null);
          const Password = useRef<HTMLInputElement>(null);

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox refrence={userName} placeholder="harkiratSingh" label={"userName"} />
        <InputBox refrence={Password} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"}  onClick={async()=>{
               const  username=userName.current?.value
               const password=Password.current?.value

             try {
           const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username,
                password
            });
            console.log(response);
            const token = response.data.token
            localStorage.setItem("token",token)
        nevigator('/dashbord')
          }
          catch (error) {
            console.error('There was an error!', error);  
        }}} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}