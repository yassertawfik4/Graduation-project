import { Route, Routes, useNavigate } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";
import { lazy, Suspense, useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Loaderpage from "./components/Loader/loaderpage";

const HomePage = lazy(() => import("./pages/HomeContainer/HomePage"));
const UserLoginPage = lazy(() => import("./pages/users/Login/UserLogin"));
const UserRegisterPage = lazy(() =>
  import("./pages/users/Register/UserRegister")
);
const ForgetPassword = lazy(() => import("./pages/users/Login/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/users/Login/ResetPassword"));

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [navigate]);

  if (loading) {
    return <Loaderpage />;
  }

  return (
    <>
      <NavbarContainer />
      <Suspense fallback={<Loaderpage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user">
            <Route path="login" element={<UserLoginPage />} />
            <Route path="register" element={<UserRegisterPage />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
