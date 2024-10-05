import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"
import { useUser } from "../context/UserContext"
import { useEffect } from "react"
import Sheets from "../components/Sheets"

const WorkPage = () => {
  const { workId } = useParams();
  const { getOneWorkspace, companyData } = useUser();

  useEffect(() => {
    if (workId !== null || workId !== undefined) {
      sessionStorage.setItem("workId", workId)
    }
    getOneWorkspace(workId);
    console.log(companyData);
  }, [workId, companyData]);

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[100%] flex flex-col">
        <Nav />
        <div className="w-[100%] h-auto p-[20px]">
          <Sheets />
        </div>
      </div>
    </div>
  )
}

export default WorkPage