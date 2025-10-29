import { useRef } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from  'axios'

export const Signup = () => {

  const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
      const userName = useRef<HTMLInputElement>(null);
        const Password = useRef<HTMLInputElement>(null);

     console.log("signup");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox refrence={firstName} placeholder="John" label={"First Name"} />
        <InputBox refrence={lastName}placeholder="Doe" label={"Last Name"} />
        <InputBox refrence={userName}placeholder="harkiratSingh" label={"userNmae"} />
        <InputBox refrence={Password}placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"} onClick={async()=>{
              const  firstname=firstName.current?.value
               const  lastname= lastName.current?.value
               const  username=userName.current?.value
               const password=Password.current?.value

             try {
           const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
               firstname,
                lastname,
                username,
                password
            });
             console.log(response);
            const token = response.data.token
            localStorage.setItem("token",token)
          }
          catch (error) {
            console.error('There was an error!', error);  
        }}} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}