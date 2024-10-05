import { useEffect } from "react"
import AllCompany from "../components/AllCompany"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const workIdString = sessionStorage.getItem("workId");
    const sheetIdString = sessionStorage.getItem("sheetId");

    if (workIdString && sheetIdString) {
      navigate(`/${workIdString}/${sheetIdString}`);
    } else if (workIdString) {
      navigate(`/${workIdString}`);
    }
  }, [])

  return (
    <div>
      <div className="w-[100%] flex">
        <Sidebar />
        <div className="w-[100%] flex flex-col">
          <Nav />
          <AllCompany />
        </div>
      </div>
    </div>
  )
}

export default HomePage