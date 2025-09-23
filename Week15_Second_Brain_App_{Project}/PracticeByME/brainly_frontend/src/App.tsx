
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Pages/Mainpage";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { AddLink } from "./Pages/AddLink";
import { ShareComponent } from "./components/ShareComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Mainpage />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addlink" element={<AddLink />} />
          <Route path="/shared/:sharehash" element={<ShareComponent/>} />
      </Routes>
    </BrowserRouter>
    // <ShareComponent></ShareComponent>
  );
}

export default App;