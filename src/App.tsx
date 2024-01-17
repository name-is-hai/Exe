import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Homedddd } from "./pages/Data-NodeRed";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Homedddd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
