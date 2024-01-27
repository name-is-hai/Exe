import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/page"
import RegisterPage from "./pages/Authentication/signup/page";
import AuthenticationPage from "./pages/Authentication/signin/page";
import ServicePage from "./pages/ServicePage/page";
import { RoomDetail } from "./pages/RoomDetail/page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/room-detail" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
