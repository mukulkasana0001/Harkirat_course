import { useState } from 'react'

import { Inputcomponent } from './inputcomponent/Inputcomponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen bg-blue-600  '>
 <Inputcomponent></Inputcomponent>
      </div>

    </>
  )
}

export default App
