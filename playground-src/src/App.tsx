import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PlayGround from "./pages/PlayGround";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="snippet/:id" element={<PlayGround />} />
      </Route>
    </Routes>
  );
}

export default App;
