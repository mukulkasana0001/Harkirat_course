import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import Dashbord from './pages/Dashbord'
import { Signin } from './pages/Signin'
import { SendMoney } from './components/SendMoney'
import { ChangePassword } from './pages/ChangePassword'


function App() {

  return (
    
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} /> 
    <Route path="/dashbord" element={<Dashbord/>} />
    <Route path="/changepassword" element={<ChangePassword/>} />

    <Route path="/sendmoney" element={<SendMoney/>} />





   </Routes>

   </BrowserRouter>
  )
}

export default App
