import { memo } from "react";
import { useState, useEffect} from "react";

function App() {
    return (
        <div>
            <Counter />
        </div>
    );
}

const Counter=memo(function () {
    const [count, setCount] = useState(0);


    return (
        <div>
            <CurrentCount count={count}/>

            <Increase />
            <Decrease setCount={setCount}/>
        </div>
    );
})

const CurrentCount = function ({count}) {
    return (
        <h1>hii {count}</h1>
    );
}

const Decrease = memo(function ({setCount}) {
    

    return (
        <button  onClick={()=>{setCount(count=>count+1)}}>Decrease </button>
    )
})

const Increase = memo(function () {

    return (
        <button >Increase</button>
    );
})

export default App;
