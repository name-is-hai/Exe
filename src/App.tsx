import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/HomePage/page"
import RegisterPage from "./pages/routes/signup/page";
import AuthenticationPage from "./pages/routes/signin/page";
import Service from "./pages/ServicePage/page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
