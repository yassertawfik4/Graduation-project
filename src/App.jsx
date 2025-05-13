import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavbarContainer from "./components/NavBar/NavbarContainer/NavbarContainer";
import { lazy, Suspense, useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Loaderpage from "./components/Loader/loaderpage";
import ProfileDetailes from "./pages/StudentProfilePage/ProfileDetailes";
import RoadMap from "./pages/RoadMap/RoadMap";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import BookMarkPage from "./pages/BookMarkPage/BookMarkPage";
import RoadMapDetailes from "./pages/RoadMap/RoadMapDetailes";
import InternDetails from "./pages/HomeContainer/InternDetails";
import Overview from "./pages/CompanyPages/Overview";
import Applications from "./pages/CompanyPages/Applications";
import Posts from "./pages/CompanyPages/Posts";
import CreateInterShip from "./pages/CompanyPages/CompanyCreation/CreateInterShip";
import CreateProject from "./pages/CompanyPages/CompanyCreation/CreateProject";
import CreateRoadMap from "./pages/CompanyPages/CompanyCreation/CreateRoadMap";
import CreateSectionRoadMap from "./pages/CompanyPages/CompanyCreation/CreateSectionRoadMap";
import Alerts from "./pages/Alert/Alerts";

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
  const isCompany = localStorage.getItem("isCompany");

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
          <Route path="/profile/:studentid" element={<ProfileDetailes />} />
          <Route path="/detailes/:id" element={<InternDetails />} />
          <Route path="/company/:companyid" element={<CompanyProfile />} />
          <Route path="/Bookmarks" element={<BookMarkPage />} />

          <Route path="/Roadmaps" element={<RoadMap />} />
          <Route path="/roadmap/:roadmapid" element={<RoadMapDetailes />} />
          {isCompany && (
            <>
              <Route path="/Overview" element={<Overview />} />
              <Route
                path="/internShip/:internshipId/application"
                element={<Applications />}
              />
              <Route path="/Post" element={<Posts />} />
              <Route path="/post/addinternship" element={<CreateInterShip />} />
              <Route path="/post/addproject" element={<CreateProject />} />
              <Route path="/post/addRoadmap" element={<CreateRoadMap />} />
              <Route
                path="/post/addRoadmap/:roadMapId/addSectionRoadmap"
                element={<CreateSectionRoadMap />}
              />
              <Route path="/Alerts" element={<Alerts />} />
            </>
          )}
        </Routes>
      </Suspense>

      {/* عرض Footer دايمًا */}
      <Footer />
    </>
  );
}

export default App;
