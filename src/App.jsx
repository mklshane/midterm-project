import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";

export default function App() {

  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Homepage />}/>
       </Routes>
      </BrowserRouter>

    </div>
  );
}