import Sidebar from "../components/Sidebar"
import Sheets from "../components/Sheets"
import Nav from "../components/Nav"
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Columns from "../components/Columns";

const SheetsPage = () => {

  const { workId, sheetId } = useParams();
  const { ids, setIds } = useUser();

  useEffect(() => {
    if (sheetId) {
      setIds({
        workId: workId || ids.workId, // agar workId null bo'lsa, avvalgi qiymatni saqlab qolamiz
        sheetId: sheetId,
      });
    }
  }, [sheetId, workId]);

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[75%] flex flex-col">
        <Nav />
        <div className="w-auto h-auto py-[10px] px-[20px]" id="test">
          <Sheets />
        </div>
        <div className="w-[100%] h-auto my-[10px] py-[10px] px-[20px]">
          <Columns />
        </div>
      </div>
    </div>
  )
}

export default SheetsPage