import { RecoilRoot } from 'recoil'
import { Otp } from './Otp'


function App() {

  return (
    <>
    <div className='bg-blue-800 h-screen'>
      <RecoilRoot>
    <Otp></Otp>
      </RecoilRoot>
      
    </div>
    
    </>
  )
}

export default App
