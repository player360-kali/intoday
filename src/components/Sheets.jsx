import { Fragment, useEffect } from "react";
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom";

const Sheets = () => {

  const { allSheets, getAllSheets } = useUser()
  const navigate = useNavigate()
  const workId = sessionStorage.getItem("workId")
  const sheetId = sessionStorage.getItem("sheetId")

  useEffect(() => {
    if (!allSheets) {
      getAllSheets()
    }
    console.log(allSheets);
  }, [allSheets]);

  return (
    <div className="flex">
      <div className="w-auto h-[40px] bg-[#fff4] rounded-[10px]">
        <div className="w-auto h-[100%] px-[4px] py-[2px] flex flex-row gap-[2px] items-center m-auto overflow-x-auto">
          {allSheets?.length !== 0 && allSheets !== null ? (
            allSheets?.map((item) => (
              <Fragment key={item._id}>
                <div className={`w-auto h-[100%] py-[4px] px-[14px] rounded-[8px] bg-[${sheetId === item._id ? "#0C0814" : "#fff0"}] text-[16px] cursor-pointer`}>
                  <button onClick={() => navigate(`/${workId}/${item._id}`)}>{item.name}</button>
                </div>
              </Fragment>
            ))
          ) : (<></>)}
        </div>
      </div>
    </div>
  )
}

export default Sheets