import { Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomeContainer/HomePage"));

function App() {
  return (
    <>
      <NavbarContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
