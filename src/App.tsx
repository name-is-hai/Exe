import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Homedddd } from "./pages/Data-NodeRed";
import AuthenticationPage from "./pages/routes/login/page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Homedddd />} />
        <Route path="/signin" element={<AuthenticationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
