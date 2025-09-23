import { SignupComponent } from "../components/SignupComponent"

export const Signup=()=>{
    return <>
     <div className="w-screen  flex  items-center bg-gray-300 h-screen justify-center ">
    <div className='p-2 border  border-blue-400 rounded-2xl bg-gray-200 w-80 h-80 '>
            <SignupComponent/>
          </div>
          </div>
    </>
}