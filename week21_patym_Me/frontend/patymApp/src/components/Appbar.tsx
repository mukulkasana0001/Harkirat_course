import { useNavigate } from "react-router-dom"
import { useContent } from "../customhook/useContent";
import {  useState } from "react";


export const Appbar = ({username }:{username:string|undefined}) => {
    const  [logout,setlogout]=useState("Logout")
      

    const {contents,refresh}=useContent();
    

       

    const nevigator = useNavigate();
    async function changepassword() {
        nevigator('/changepassword')
    }

   console.log(username)
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {username==undefined?("....."): username}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {username==undefined?"..": username[0]?.toUpperCase()}
                </div>

            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col text-centjustify-center h-full  m-4">
                    <button className="cursor-pointer" onClick={changepassword}>🔑</button>
                </div>
            </div>
            <div className="rounded-full h-12 w-20 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <button className="cursor-pointer" onClick={ async() => {
                        setlogout("....");

                        localStorage.setItem("token", "");
                         await refresh(); 
                        // setlogout("Logout");
                    }}>{!username?"....":logout}</button>
                </div>
            </div>

        </div>
    </div>
}


