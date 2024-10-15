import { IoIosAddCircleOutline } from "react-icons/io"
import { BiHide } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import Table from "./Table";
import { useUser } from "../context/UserContext";

const Columns = () => {
	const { createNewTask } = useUser()

	return (
		<div>
			<div className="w-[100%] h-[100%] flex flex-row items-center gap-[10px]">
				<div
					onClick={createNewTask}
					className="flex flex-row items-center gap-[4px] py-[4px] px-[10px] rounded-[6px] cursor-pointer bg-[#fff] text-[#000]">
					<IoIosAddCircleOutline fill="#000" />
					<button>New task</button>
				</div>

				<div className="flex flex-row items-center relative">
					<input
						className="bg-[#fff1] py-[4px] px-[10px] border border-solid rounded-[6px]" placeholder="Search Task by name"
						type="text"
					/>
					<CiFilter size={20} className="absolute right-[10px]" />
				</div>

				<div className="flex flex-row items-center gap-[4px] py-[4px] px-[10px] rounded-[6px] border border-solid cursor-pointer text-[#fff]">
					<BiHide />
					<button>Hide columns</button>
				</div>
			</div>
			<div><Table /></div>
		</div>
	)
}

export default Columns