import { useState } from 'react'

import './App.css'
import LeftCOmponent from './components/LeftCOmponent'
import RightComponent from './components/RightComponent';

function App() {
  const [mount, setmount] = useState(true);
  console.log(mount)

  return (
    <>
      <div className="flex col-span-12 h-screen">


        <div className={`bg-gray-600  hidden w-full h-1/12 pt-2 sm:block sm:w-1/6 sm:h-full `}>
          <LeftCOmponent />
        </div>

        <div className={` transation-all duration-700 block sm:hidden`}>
          {mount ?
               
               
              <div className={` bg-gray-600 justify-items- absolute  w-full   sm:w-1/6 sm:h-1/12 `}>
                
              <div onClick={() => setmount(e => e = !e)} className={` absolute  h-1/12 rounded-2xl pt-2 sm:w-1/6 `}>❌</div>
             
                <LeftCOmponent /> 
              
                  
                
              </div>
            :
              <div onClick={() => setmount(e => e = !e)} className={` bg-gray-600  absolute  h-1/12  rounded-2xl p-2 sm:w-1/6   `}>✖️</div>

          }
        </div>

        <div className="bg-blue-800  w-full h-full"><RightComponent></RightComponent></div>
      </div>
    </>
  )
}

export default App
