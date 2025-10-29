import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
    // Replace with backend call
 type UserType = {
      id:number,
    username: string,
        firstname: string,
        lastname: string
    }

    const [users, setUsers] = useState<UserType[]>([]);

    const [value, setValue] = useState("");

      useEffect(() => {
            //   debouncing 
          const  timeout = setTimeout(() => {

                axios.get(`http://localhost:3000/api/v1/user/all?username=${value}`,{
                    headers:{
                        "token":localStorage.getItem("token") 
                }}
            ).then((res)=>{
                setUsers(res.data.users);
            }).catch((err)=>{
                console.log(err);
            });

            }, 500);

        return () => clearTimeout(timeout);
          
       }, [value]);
     
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>setValue(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user} :{user: {id:number,username:string,firstname:string, lastname:string }}) {


    const nevigator = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"}  onClick={()=>{
                nevigator('/Sendmoney',{state:{ username:user.username ,id: user.id}})
            }} />
        </div>
    </div>
}