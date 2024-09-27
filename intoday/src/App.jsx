import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { useUser } from "./context/UserContext"
import LoginPage from "./pages/LoginPage"

function App() {

  const { haveUserData } = useUser()

  const RequireAuth = ({ children }) => {
    return (
      haveUserData ? { children } : <Navigate to={"/login"} />
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
