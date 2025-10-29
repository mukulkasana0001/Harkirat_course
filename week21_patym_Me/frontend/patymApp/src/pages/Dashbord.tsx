import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export default function Dashbord() {
  const [balance,setbalance]=useState(Number)
    const [username,setusername]=useState("")

 
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/account/balance",{
      headers:{
        "token":localStorage.getItem("token")
    }}).then((res)=>{
      console.log(res.data);
      setbalance(res.data.balance)

      setusername(res.data.username)
       

    }).catch((err)=>{
      console.log(err);
    } )
  },[])

 console.log(username);
  return (
    <div>
      <Appbar username={username}/>
      <Balance value={balance}/>
      <Users/>
    </div>
  )
}
