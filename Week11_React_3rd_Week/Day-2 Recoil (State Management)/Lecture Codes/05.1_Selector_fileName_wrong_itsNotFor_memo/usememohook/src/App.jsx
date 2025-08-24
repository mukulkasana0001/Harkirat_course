import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterstate, isEven } from "./atom";


function App() {
    return (
        <div>
            <RecoilRoot>
              <Counter/>
              <Increment/>
              <Decrement/>
              <Even/>
            </RecoilRoot>
        </div>
    );
}

 function Counter(){
      
   const count= useRecoilValue(counterstate)

  return <div>
{count}
  </div>
}

 function Increment(){
const setcount=useSetRecoilState(counterstate)

  return <div>
    <button onClick={()=>setcount(c=>c+2)}>increase</button>
  </div>
}

 function Decrement(){

const setcount=useSetRecoilState(counterstate)
  return <div>
    <button onClick={()=>setcount(c=>c-1)}>Decrease</button>
  </div>
}


 function Even(){

  const even = useRecoilValue(isEven)   // useRecoilValue check under the hood that the  iseven change or not if change then only return or  we can say that re-render is like i think that a use prev hook that check privious value if  value change then only re-render  
  return <div>
    {even?"counter is even off":"counter is odd on"}
  </div>
}

export default App
