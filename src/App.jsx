import { Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";

function App() {
  return (
    <>
      <NavbarContainer />
      <Routes>
        <Route path="/" element={""} />
      </Routes>
    </>
  );
}

export default App;
