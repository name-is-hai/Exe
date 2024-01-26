import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Homedddd } from "./pages/Data-NodeRed";
import RegisterPage from "./pages/routes/signup/page";
import AuthenticationPage from "./pages/routes/signin/page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Homedddd />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
