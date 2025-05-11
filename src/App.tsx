import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.tsx";
import ClassicPage from "./pages/Classic.tsx";
import FinisherPage from "./pages/Finisher.tsx";
import LittleLegendPage from "./pages/LittleLegend.tsx";
import TraitPage from "./pages/Trait.tsx";
import Home from "./pages/Home.tsx";

const CURRENT_VERSION = "v1.4";

const storedVersion = localStorage.getItem("appVersion");

if (storedVersion !== CURRENT_VERSION) {
  localStorage.clear();
  localStorage.setItem("appVersion", CURRENT_VERSION);
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/classic" element={<ClassicPage />} />
        <Route path="/finisher" element={<FinisherPage />} />
        <Route path="/littlelegend" element={<LittleLegendPage />} />
        <Route path="/trait" element={<TraitPage />} />
      </Route>
    </Routes>
  );
}

export default App;
