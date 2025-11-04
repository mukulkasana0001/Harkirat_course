import axios from "axios";
import { useEffect, useState } from "react";


export const useContent = () => {

    const [contents, setcontents] = useState()

    const refresh = async () => {
        if (localStorage.getItem("token")?.length != 0) {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                })

                // If the request is successful, update the contents state with the fetched data
                setcontents(response.data);
            }
            catch (error) {
                // Handle any error that occurs during the request (optional)
                console.error("Error fetching content:", error);
            };
        }
        else {
            setcontents((conten) => conten = undefined);
        }

    }


    useEffect(() => {
        refresh(); // Initial fetch when the component mounts

        // Set an interval to refresh content every 10 seconds
        let interval = setInterval(() => {
            refresh();
        }, 5 * 1000); // 10 seconds interval

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(interval); // Clears the interval when the component is removed from the DOM
        };
    }, []);


    return { contents, refresh };

}
