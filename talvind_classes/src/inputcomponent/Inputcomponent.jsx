import { useState } from "react"
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Inputcomponent() {

    const [type, settype] = useState("email");
    const [disable, setdisable] = useState(false);
    return <>
      <div className="flex items-center  flex-col ">
       <h1 className={"text-white text-2xl m-2"}>Wanbinar.gg</h1>

        <div>
            <Input setdisable={setdisable} type={type} ></Input>
        </div>
        <div>
            <Button disable={disable}>signup</Button>
        </div>
        
    </div>
        
    </>
}



