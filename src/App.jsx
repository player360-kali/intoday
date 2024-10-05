import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { useUser } from "./context/UserContext"
import LoginPage from "./pages/LoginPage"
import Register from "./pages/Register"
import Loading from "./components/Loading"
import WorkPage from "./pages/WorkPage"
import SheetsPage from "./pages/SheetsPage"

function App() {

  const { haveUserData, pageLoading } = useUser();

  // eslint-disable-next-line react/prop-types
  const RequireDashboard = ({ children }) => {
    if (pageLoading) { return <Loading />; } // Show loading state
    return haveUserData ? children : <Navigate to="/login" />;
  };

  // eslint-disable-next-line react/prop-types
  const RequireLogin = ({ children }) => {
    if (pageLoading) return <Loading />; // Show loading state
    return haveUserData ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <RequireDashboard>
            <HomePage />
          </RequireDashboard>
        } />

        <Route path="/:workId" element={
          <RequireDashboard>
            <WorkPage />
          </RequireDashboard>
        } />

        <Route path="/:workId/:sheetId" element={
          <RequireDashboard>
            <SheetsPage />
          </RequireDashboard>
        } />

        <Route path="/login" element={
          <RequireLogin>
            <LoginPage />
          </RequireLogin>
        } />

        <Route path="/create-account" element={
          <RequireLogin>
            <Register />
          </RequireLogin>
        } />
      </Routes>
    </>
  )
}

export default App
