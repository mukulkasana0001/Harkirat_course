import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil"
import counter from "./atom"


function App() {

  
  return (
    <> 
    <RecoilRoot>
      <Buttons/>
      <Counter/>
    </RecoilRoot>
     
    </>
  )
}

function Buttons() {
  const setCount = useSetRecoilState(counter);

  function increase() {
    setCount(c => c + 1)
  }
  
  function decrease() {
    setCount(c => c - 1)
  }
  
  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Counter() {
  const count = useRecoilValue(counter);

  return <div>
    {count}
  </div>
}

export default App
