import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"
import { useUser } from "../context/UserContext"
import { useEffect } from "react"
import Sheets from "../components/Sheets"

const WorkPage = () => {
  const { workId } = useParams();
  const { getOneWorkspace, getAllSheets, ids, setIds } = useUser();

  useEffect(() => {
    if (workId) {
      setIds({
        workId: workId,
        sheetId: ids.sheetId
      })
      getOneWorkspace(workId);
      getAllSheets();
    }
  }, [workId]);

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[75%] flex flex-col">
        <Nav />
        <div className="w-[100%] h-auto p-[20px]">
          <Sheets />
        </div>
      </div>
    </div>
  )
}

export default WorkPage