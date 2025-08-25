import { atom, selector } from "recoil"; 
import axios from "axios";

export const notifications = atom({
  key: "notifications", 
  
  default:  selector({
    key:"notificationselector",
    get:async () => {
        const res = await axios.get("https://sum-server.100xdevs.com/notifications");   /// this api gives a data of notifications
        return res.data;
    }
  })

})