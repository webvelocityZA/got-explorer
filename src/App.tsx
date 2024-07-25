import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import CharacterDetail from "./pages/CharacterDetail";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Houses from "./pages/Houses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="characters" element={<Characters />} />
        <Route path="character/:id" element={<CharacterDetail />} />
        <Route path="houses" element={<Houses />} />
        <Route path="houses/:id" element={<Houses />} />
      </Route>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
