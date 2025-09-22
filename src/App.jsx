import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Bookings from "./pages/Bookings";
import SpaceDetail from "./pages/SpaceDetail";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/my-bookings" element={<Bookings />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}