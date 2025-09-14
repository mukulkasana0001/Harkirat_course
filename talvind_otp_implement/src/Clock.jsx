import { useEffect, useRef } from "react"

import { useRecoilState, useSetRecoilState } from "recoil";
import { Disableatom, RestartAtom, TimerAtom } from "./Atom";





const Clock = () => {

  const [sec, setsec] = useRecoilState(TimerAtom);
  const [restart, setrestart] = useRecoilState(RestartAtom);
  const setdisable = useSetRecoilState(Disableatom);


  const ref = useRef();

  useEffect(() => {
    setsec(30);
    ref.current = setInterval(() => { setsec(sec => sec - 1) }, 1000)
    console.log(ref.current)

    return () => { clearInterval(ref.current); }
  }, [restart])

  

  useEffect(() => {
    if (sec <= 0) {
      clearInterval(ref.current);
      setdisable(false);
      console.log("clear");
      console.log(ref.current);
    }
  }, [sec, setdisable]);




  return (


    <>
      <div className="bg-blue-300 m-1 rounded-2xl p-1 w-20 ml-l4">
        {sec > 0 ? <div className=" grid grid-cols-2 px-2"> <div className="col-span-1 "> {sec} </div >
          <div className="col-span-1 ">🕝</div ></div>
          : <button className="bg-blue-500 border-2  cursor-pointer hover:bg-blue-400  rounded-3xl p-1  " onClick={() => setrestart(c => c = !c)} >🔂O.T.P</button>}
      </div>

    </>
  )
}





export default Clock

