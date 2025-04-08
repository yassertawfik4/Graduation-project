import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";
import { lazy, Suspense, useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Loaderpage from "./components/Loader/loaderpage";
import ProfileDetailes from "./pages/StudentProfilePage/ProfileDetailes";
import RoadMap from "./pages/RoadMap/RoadMap";

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
  const location = useLocation(); // 📍 للوصول للمسار الحالي

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [navigate]);

  if (loading) {
    return <Loaderpage />;
  }
  const hideNavbarPaths = ["/studentProdile"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {/* عرض الـ Navbar فقط لو المسار غير موجود ضمن قائمة الإخفاء */}
      {!shouldHideNavbar && <NavbarContainer />}

      <Suspense fallback={<Loaderpage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user">
            <Route path="login" element={<UserLoginPage />} />
            <Route path="register" element={<UserRegisterPage />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/studentProdile" element={<ProfileDetailes />} />
          <Route path="/Roadmaps" element={<RoadMap />} />
        </Routes>
      </Suspense>

      {/* عرض Footer دايمًا */}
      <Footer />
    </>
  );
}

export default App;
