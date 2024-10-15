import { useEffect } from "react"
import AllCompany from "../components/AllCompany"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

const HomePage = () => {

  const navigate = useNavigate();
  const { ids } = useUser()

  useEffect(() => {
    const workIdString = ids.workId;
    const sheetIdString = ids.sheetId;

    if (workIdString && sheetIdString) {
      navigate(`/${workIdString}/${sheetIdString}`);
    } else if (workIdString) {
      navigate(`/${workIdString}`);
    }
  }, [ids.workId, ids.sheetId, navigate]);

  return (
    <div>
      <div className="w-[100%] flex">
        <Sidebar />
        <div className="w-[75%] flex flex-col">
          <Nav />
          <AllCompany />
        </div>
      </div>
    </div>
  )
}

export default HomePage