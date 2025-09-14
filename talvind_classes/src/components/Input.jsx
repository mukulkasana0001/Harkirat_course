 export function Input({ type, setdisable}) {

    return <>
   
        <input type={type} placeholder={type} onChange={(e) => {

            if (e.target.value) {
                setdisable(true);
            } else {
                setdisable(false);
            }
        }} className="bg-blue-500 m-3 rounded-md  text-center   outline-0"></input>
   
         </>
}