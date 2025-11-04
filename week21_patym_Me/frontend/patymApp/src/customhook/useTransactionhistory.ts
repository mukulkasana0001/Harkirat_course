import axios from "axios";
import {  useEffect, useState } from "react";


export const usetansactionhistory = () => {

    const [transactions, settransactions] = useState()

    const gettransaction = async () => {

        if (localStorage.getItem("token")?.length != 0) {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/history', {
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                })

                // If the request is successful, update the contents state with the fetched data
                settransactions(response.data);
            }
            catch (error) {
                // Handle any error that occurs during the request (optional)
                console.error( error);
            };
        }
        else {
            settransactions((conten) => conten = undefined);
        }

    }
    useEffect(()=>{
        gettransaction();
    },[])


    


    return { transactions, gettransaction };

}
