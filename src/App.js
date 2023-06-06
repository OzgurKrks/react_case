import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Weather from "./components/Weather";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;
