import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Sheets from "../components/Sheets"
import Nav from "../components/Nav"

const SheetsPage = () => {
  const { sheetId } = useParams()

  useEffect(() => {
    if (sheetId !== "null" && sheetId !== "undefined") {
      console.log(typeof sheetId);
      sessionStorage.setItem("sheetId", sheetId)
    }
  }, [sheetId])

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[100%] flex flex-col">
        <Nav />
        <div className="w-auto h-auto p-[20px]" id="test">
          <Sheets />
        </div>
      </div>
    </div>
  )
}

export default SheetsPage