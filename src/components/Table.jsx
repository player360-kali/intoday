import { useUser } from "../context/UserContext"
import { MdDone, MdMoreHoriz, MdOutlineDateRange } from "react-icons/md";
import { FaChevronDown, FaPlus, FaRegClock } from "react-icons/fa6";
import { Fragment, useEffect, useState } from "react";
import DynamicModal from "./Modal";
import { useForm } from "react-hook-form";

import { LuText } from "react-icons/lu";
import { AiOutlineNumber } from "react-icons/ai";
import { GoCheckbox } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const Table = () => {
  const { columns, updateColumns, selects, createSelectors, createColumns, deleteColumns, deleteSelectFunk } = useUser()
  const [updateColumn, setUpdateColumn] = useState({
    id: "",
    updateId: "",
  })

  const [selectInputValue, setSelectInputValue] = useState("")
  const [deleteSelect, setDeleteSelect] = useState({
    id: "",
    delteType: ""
  })

  const [addColumn, setAddColumn] = useState(false)
  const [columnType, setColumnType] = useState({
    isOpen: false,
    type: "text",
    label: "Text",
    icons: <LuText />
  })
  const [isOpenColor, setIsOpenColor] = useState({
    isOpen: false,
    selectedColor: ""
  })

  const defaultColors = [
    { colorName: "Green", color: "#00FF00" },
    { colorName: "Orange", color: "#FFA500" },
    { colorName: "Red", color: "#FF0000" }
  ]

  const allColors = [
    { colorName: "Green", color: "#00FF00" },
    { colorName: "Orange", color: "#FFA500" },
    { colorName: "Red", color: "#FF0000" },
    { colorName: "Gray", color: "#808080" },
    { colorName: "Emerald", color: "#50C878" },
    { colorName: "Indigo", color: "#4B0082" },
    { colorName: "Teal", color: "#008080" },
    { colorName: "Cyan", color: "#00FFFF" },
    { colorName: "Blue", color: "#0000FF" },
    { colorName: "Violet", color: "#EE82EE" },
    { colorName: "Pink", color: "#FFC0CB" }
  ];

  const options = [
    { value: 'text', label: 'Text', icons: <LuText /> },
    { value: 'number', label: 'Number', icons: <AiOutlineNumber /> },
    { value: 'checkbox', label: 'Checkbox', icons: <GoCheckbox /> },
    { value: 'select', label: 'Select', icons: <FaRegClock /> },
    { value: 'date', label: 'Date', icons: <MdOutlineDateRange /> },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors
  } = useForm()

  const handleUpdate = (inp) => {
    updateColumns(updateColumn.updateId, inp.columnName)
    setUpdateColumn({ id: "", updateId: "" })
  }

  useEffect(() => {
    if (selectInputValue && isOpenColor.selectedColor) {
      clearErrors();
    }
  }, [selectInputValue, isOpenColor.selectedColor, clearErrors]);

  const createNewColumn = (inp) => {
    createColumns(columnType.type, inp.newColumnName)
    setAddColumn(false)
  }

  const createNewSelect = () => {
    if (selectInputValue !== "" && isOpenColor.selectedColor !== "") {
      clearErrors();
    }

    if (selectInputValue === "" || isOpenColor.selectedColor === "") {
      setError("root", { type: "manual", message: "Please choose a color and fill option name" });
      return
    }

    createSelectors(selectInputValue, isOpenColor.selectedColor);
    setSelectInputValue("");
    setIsOpenColor({ isOpen: false, selectedColor: "" })
  };

  const handleDeleteSelect = () => {
    deleteSelectFunk(deleteSelect.id, deleteSelect.delteType);
    setDeleteSelect({ id: "", delteType: "" })
  }

  return (
    <div className="w-[100%] h-auto my-[20px] overflow-y-auto custom-scrollbar py-[20px]">
      <div style={{ display: "inline-block" }} className="bg-[#fff4] rounded-t-[6px]">
        <table>
          <thead>
            <tr className="flex flex-row">
              {columns?.map(item => (
                <Fragment key={item._id}>
                  <th className="flex items-center gap-[10px] cursor-pointer relative" id="thName" key={item.key}>
                    {item.name}
                    <MdMoreHoriz
                      onClick={() => setUpdateColumn({
                        id: item._id,
                        updateId: ""
                      })}
                      id="thIcon"
                    />
                    {updateColumn.id === item._id && (
                      <div className="w-[80px] h-[64px] absolute py-[8px] px-[6px] bg-[#24114B] rounded-[6px] z-[9999] cursor-default flex flex-col justify-between items-center font-semibold">
                        <button
                          className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#00f]"
                          onClick={() => { setUpdateColumn({ id: "", updateId: item._id }), setValue("columnName", item.name) }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteColumns(item._id)}
                          className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#f00]"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </th>
                </Fragment>
              ))}
              <th className="w-[45px] flex items-center cursor-pointer" onClick={() => setAddColumn(true)}>
                <FaPlus className="mx-auto" />
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {updateColumn.id !== "" && (
        <div onClick={() => setUpdateColumn({
          id: "",
          updateId: ""
        })}
          className="w-[100%] h-[100vh] absolute top-0 left-0 z-10"></div>
      )}
      {updateColumn.updateId !== "" && (
        <DynamicModal isOpen={updateColumn.updateId !== ""} onClose={() => setUpdateColumn({
          id: "",
          updateId: ""
        })}>
          <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
            <h2 className="mx-auto text-[26px] font-semibold">Update your column name</h2>
            <form onSubmit={handleSubmit(handleUpdate)} className="w-[60%] mx-auto flex flex-col justify-between gap-[10px]">
              <input
                {...register("columnName", {
                  required: "Min length is 3",
                  minLength: 3
                })}
                autoFocus={true}
                className="py-[2px] px-[10px] rounded-[6px] bg-[#fff4] border border-solid text-[#fff]"
                type="text"
                placeholder="Fill new column name"
              />
              <p className="w-[100%] h-[20px] text-[red]">{errors?.columnName?.message}</p>
              <div className="w-[60%] mx-auto flex justify-between items-center gap-[6px]">
                <button
                  type="button"
                  onClick={() => {
                    setUpdateColumn({
                      id: "",
                      updateId: ""
                    }),
                      reset()
                  }}
                  className="rounded-[6px] py-[2px] px-[8px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95">Cancel</button>
                <button
                  type="submit"
                  className="rounded-[6px] py-[2px] px-[8px] bg-[#00f] hover:bg-[#0000ffb9] ] p-[6px]active:bg-[#0000ffd9] active:scale-95">Submit</button>
              </div>
            </form>
          </div>
        </DynamicModal>
      )}
      {addColumn && (
        <DynamicModal isOpen={addColumn} onClose={() => setAddColumn(false)} height={"auto"}>
          <form onSubmit={handleSubmit(createNewColumn)} className="flex flex-col justify-between gap-[10px]">
            <div>
              <h2 className="text-[26px] font-semibold">Add new column</h2>
              <label htmlFor="columnName">Column name:</label><br />
              <input
                id="columnName"
                {...register("newColumnName", {
                  required: "Min length is 3",
                  minLength: 3
                })}
                type="text"
                className="py-[2px] px-[10px] bg-[#fff4] border border-solid rounded-[6px] m-[4px]"
                placeholder="Fill your column name"
              />
              <p className="w-[100%] h-[24px] px-[6px] text-[red]">{errors?.newColumnName?.message}</p>
            </div>
            <div>
              <label
                onClick={() => setColumnType({
                  isOpen: !columnType.isOpen,
                  type: columnType.type,
                  label: columnType.label,
                  icons: columnType.icons
                })}
                htmlFor="select">Column type:</label>
              <div className="w-[100%] h-[35px] py-[4px] px-[10px] m-[4px] bg-[#fff4] border border-solid rounded-[6px] z-[0]">
                <button
                  type="button"
                  className="w-[100%] flex items-center gap-[10px]"
                  onClick={() => setColumnType(prevState => ({
                    ...prevState,
                    isOpen: !prevState.isOpen
                  }))}
                >
                  {columnType.icons} {columnType.label}
                </button>
                {columnType.isOpen && (
                  <div className="w-[140px] p-[6px] rounded-[8px] bg-[#24114B] border border-solid mt-[20px] absolute flex flex-col gap-[4px] items-start z-[40]">
                    {options.map(item => (
                      <Fragment key={item.value}>
                        <button
                          onClick={() => setColumnType({
                            isOpen: false,
                            type: item.value,
                            label: item.label,
                            icons: item.icons
                          })}
                          type="button"
                          className="flex items-center gap-[10px]"
                        >
                          <div className="w-[16px]">
                            {columnType.type === item.value && (
                              <MdDone />
                            )}
                          </div>
                          {item.icons}
                          {item.label}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {columnType.type === "select" && (
              <div className="flex flex-col gap-[10px] px-[6px]">
                <div className="flex justify-between">
                  <input
                    className="w-[40%] h-auto py-[2px] px-[10px] bg-[#fff4] border border-solid rounded-[6px]"
                    type="text"
                    placeholder="Add new option"
                    onChange={(e) => {
                      setSelectInputValue(e.target.value)
                    }}
                    value={selectInputValue}
                  />
                  <div className="flex flex-row gap-[6px]">
                    {defaultColors.map(item => (
                      <Fragment key={item.colorName}>
                        <span
                          onClick={() => setIsOpenColor({ ...isOpenColor, selectedColor: item.colorName })}
                          className="w-[35px] h-[35px] rounded-full flex justify-center items-center hover:opacity-80 cursor-pointer"
                          style={{ backgroundColor: item.color }}
                        >
                          {isOpenColor.selectedColor === item.colorName && <MdDone />}
                        </span>
                      </Fragment>
                    ))}
                    <button
                      onClick={() => setIsOpenColor({ ...isOpenColor, isOpen: !isOpenColor.isOpen })}
                      className="w-[35px] h-[35px] rounded-full bg-[#fff] flex items-center justify-center"
                      type="button"
                    >
                      <FaChevronDown
                        className={`${isOpenColor.isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                        fill="#000"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={createNewSelect}
                      className="py-[4px] px-[10px] rounded-[6px] bg-[#fff] text-[#000]">
                      Add
                    </button>
                  </div>
                </div>
                <div className={`w-auto flex flex-wrap mt-[10px] gap-[10px] ${isOpenColor.isOpen ? "block" : "hidden"}`}>
                  {allColors.map(item => (
                    <Fragment key={item.colorName}>
                      <span
                        onClick={() => setIsOpenColor({ ...isOpenColor, selectedColor: item.colorName })}
                        className="w-[35px] h-[35px] rounded-full flex justify-center items-center hover:opacity-80 cursor-pointer"
                        style={{ backgroundColor: item.color }}
                      >
                        {isOpenColor.selectedColor === item.colorName && <MdDone />}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
            <p className="w-[100%] h-[20px] text-[red]">{errors.root?.message}</p>
            {selects?.length !== 0 && columnType.type === "select" && (
              selects?.map(item =>
                <Fragment key={item._id}>
                  <div
                    className="w-[100%] py-[2px] px-[10px] rounded-[6px] flex flex-row justify-between items-center relative"
                    style={
                      {
                        backgroundColor:
                          `${allColors.find(i => i.colorName === item.color)?.color || "#fff"}`,
                        color: "#fff",
                        fontWeight: "bolder"
                      }
                    }>
                    {item.value}
                    <FaRegTrashAlt
                      onClick={() => setDeleteSelect({
                        id: item._id,
                        delteType: ""
                      })}
                      className="cursor-pointer"
                    />
                    {deleteSelect.id === item._id && (
                      <div className="w-[120px] h-[80px] border border-solid bg-[#24114B] top-0 right-[20px] rounded-[6px] flex flex-col gap-[2px] py-[6px] px-[10px] absolute z-[40]">
                        <span className="w-[100%] h-[14px] flex items-center gap-[6px] text-[14px] text-center justify-between">
                          <p>Forever</p>
                          <input
                            onChange={() => setDeleteSelect({ ...deleteSelect, delteType: "forever" })}
                            type="checkbox"
                            checked={deleteSelect.delteType === "forever" ? true : false}
                          />
                        </span>
                        <span className="w-[100%] h-[14px] flex items-center gap-[6px] text-[14px] text-center justify-between">
                          <p>Just now</p>
                          <input
                            onChange={() => setDeleteSelect({ ...deleteSelect, delteType: "now" })}
                            type="checkbox"
                            checked={deleteSelect.delteType === "now" ? true : false}
                          />
                        </span>
                        <button
                          type="button"
                          className="w-[60%] mt-auto mx-auto rounded-[6px] bg-[#f00] hover:bg-[#f008] active:bg-[#f009] active:scale-95"
                          onClick={handleDeleteSelect}>delete</button>
                      </div>
                    )}
                  </div>
                  {deleteSelect.id === item._id && (
                    <div onClick={() => setDeleteSelect({ id: "", delteType: "" })} className="w-[100%] h-[100%] absolute top-0 left-0"></div>
                  )}
                </Fragment>
              )
            )}
            <div className="w-[40%] mx-auto flex justify-between items-center gap-[6px]">
              <button
                type="button"
                onClick={() => setAddColumn(false)}
                className="rounded-[6px] py-[2px] px-[8px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95">Cancel</button>
              <button
                type="submit"
                className="rounded-[6px] py-[2px] px-[8px] bg-[#00f] hover:bg-[#0000ffb9] ] p-[6px]active:bg-[#0000ffd9] active:scale-95">Submit</button>
            </div>
          </form>
          {columnType.isOpen === true && (
            <div className="w-[100%] h-[100%] absolute top-0 left-0 z-[10]" onClick={() => setColumnType({ ...columnType, isOpen: false })}></div>
          )}
        </DynamicModal>
      )}
    </div>
  )
}

export default Table