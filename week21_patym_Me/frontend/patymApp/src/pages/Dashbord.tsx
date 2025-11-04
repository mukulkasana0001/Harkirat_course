// import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
// import axios from "axios";
import AppbarNoLogin from "../components/AppbarNoLogin";
import { useContent } from "../customhook/useContent";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


export default function Dashbord() {
 

   const { contents, refresh } = useContent() as {
     contents?: { balance?: number; username?: string };
     refresh: () => void;
   };

   useEffect(()=>{
refresh();
   },[])

  // const [balance, setbalance] = useState(Number)
  // const [username, setusername] = useState("")




  // useEffect(() => {
  //   try {
  //      axios.get("http://localhost:3000/api/v1/account/balance", {
  //       headers: {
  //         "token": localStorage.getItem("token")
  //       }
  //     }).then((res) => {
  //       console.log(res.data);
  //       setbalance(res.data.balance)

  //       setusername(res.data.username)


  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }catch(e){
  //      console.log(e);
  //   }
    
  // }, [])



  console.log(contents?.balance);
    console.log(contents?.username);

   console.log(localStorage.getItem("token"));
  return (
    <div>
      {/* {localStorage.getItem("token")?.length} */}

      {localStorage.getItem("token")?.length == 0 && (<AppbarNoLogin />)}

      {localStorage.getItem("token")?.length!=0 && (<>
        <Appbar username= {contents?.username} />
        <Balance value={contents?.balance} />
        <Outlet></Outlet>
 
      </>)}
     

    </div>
  )
}
