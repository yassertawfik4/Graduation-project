import { Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer/Footer";

const HomePage = lazy(() => import("./pages/HomeContainer/HomePage"));
const UserLoginPage = lazy(() => import("./pages/users/Login/UserLogin"));
const UserRegisterPage = lazy(() =>
  import("./pages/users/Register/UserRegister")
);
function App() {
  return (
    <>
      <NavbarContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user">
            <Route path="login" element={<UserLoginPage />} />
            <Route path="register" element={<UserRegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
