import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.tsx";
import ClassicPage from "./pages/Classic.tsx";
import FinisherPage from "./pages/Finisher.tsx";
import LittleLegendPage from "./pages/LittleLegend.tsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ClassicPage />} />
        <Route path="/finisher" element={<FinisherPage />} />
        <Route path="/littlelegend" element={<LittleLegendPage />} />
      </Route>
    </Routes>
  );
}

export default App;
