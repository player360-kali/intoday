import { Link } from "react-router-dom"
import Employes from "./Employes"
import Viewers from "./Viewers"
import Workspace from "./Workspace"
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="w-[25%] h-[100vh] border border-solid p-[15px]">
      <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
        <div className="w-[100%] h-auto bg-[#24114B] py-[14px] px-[20px] rounded-[6px] font-semibold">
          <h1 className="text-[30px]">Intoday</h1>
        </div>
        <Workspace />
        <Employes />
        <Viewers />
        <div className="w-[100%] h-auto">
          <Link className="w-[100%] flex justify-between items-center py-[6px] px-[14px] bg-[#fff] text-[#000] rounded-[6px]" to={"/profile"}>
            <IoIosSettings fill="#000" size={18} />
            <button className="text-[18px] font-medium">
              Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar