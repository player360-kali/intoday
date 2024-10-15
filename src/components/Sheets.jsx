import { Fragment, useEffect, useState } from "react";
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline, IoMdMore } from "react-icons/io";
import { useForm } from "react-hook-form"
import DynamicModal from "./Modal";

const Sheets = () => {

  const { allSheets, ids, setIds, createSheet, updateSheet, deleteSheet } = useUser()
  const navigate = useNavigate()
  const workId = ids.workId
  const sheetId = ids.sheetId

  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit
  } = useForm()

  const [update, setUpdate] = useState({
    updateId: "",
    modalId: "",
    inputId: "",
    require: ""
  })

  const [addModal, setAddModal] = useState(false)

  const handleCreate = (inp) => {
    createSheet(inp.newSheet)
    reset()
    setAddModal(false)
  }

  const updateSheetName = (inp) => {
    updateSheet(update.inputId, inp.updateName)
    setUpdate({
      updateId: "",
      modalId: "",
      inputId: "",
      require: ""
    })
  }

  const handleDelete = () => {
    deleteSheet(update.modalId)
    setUpdate({
      updateId: "",
      modalId: "",
      inputId: "",
      require: ""
    })
  }

  return (
    <div className="w-[100%] flex">
      <div className="h-[40px] bg-[#fff4] rounded-[4px] overflow-x-auto custom-scrollbar">
        <div className="min-w-max h-[100%] px-[4px] py-[2px] flex flex-row gap-[2px] items-center">
          {allSheets?.length !== 0 && allSheets !== null ? (
            allSheets?.map((item) => (
              <Fragment key={item._id}>
                <div
                  onClick={() => {
                    navigate(`/${workId}/${item._id}`)
                    setIds({
                      workId: ids.workId,
                      sheetId: item._id
                    })
                  }}
                  className={`w-auto h-[100%] py-[4px] px-[14px] rounded-[4px] bg-[${sheetId === item._id ? "#170F28" : "#fff0"}] text-[16px] cursor-pointer flex justify-between items-center`}>
                  <>
                    <button>{item.name}</button>
                    {sheetId === item._id && <IoMdMore
                      onClick={() => setUpdate({
                        updateId: item._id,
                        modalId: "",
                        inputId: "",
                        require: ""
                      })}
                      className="relative cursor-pointer"
                      size={20}
                    />}
                  </>
                  {update.updateId === item._id && (
                    <div className="w-[80px] h-[64px] absolute py-[8px] px-[6px] bg-[#24114B] rounded-[6px] z-[9999] cursor-default flex flex-col justify-between items-center font-semibold">
                      <button
                        onClick={() => {
                          setUpdate({
                            updateId: "",
                            modalId: "",
                            inputId: item._id,
                            require: ""
                          }),
                            setValue("updateName", item.name)
                        }}
                        className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#00f]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setUpdate({
                            updateId: "",
                            modalId: item._id,
                            inputId: "",
                            require: item.name
                          })
                        }}
                        className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#f00]"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {update.updateId === item._id && (
                    <div onClick={() => setUpdate({
                      updateId: "",
                      modalId: "",
                      inputId: "",
                      require: ""
                    })} className="w-[100%] h-[100vh] absolute top-0 left-0 z-[10] cursor-default"></div>
                  )}
                  {update.modalId === item._id && (
                    <DynamicModal
                      isOpen={update.modalId === item._id}
                      onClose={() => setUpdate({
                        updateId: "",
                        modalId: "",
                        inputId: "",
                        require: ""
                      })}
                      height={"25%"}
                    >
                      <div className="flex flex-col items-center justify-between gap-[6px]">
                        <div>
                          <h2 className="text-[26px] font-semibold">Do you want to delete the sheet:</h2>
                        </div>
                        <div>
                          <b className="bg-[#fff4] py-[4px] px-[10px] border border-solid rounded-[6px]">{update.require}</b>
                        </div>
                        <div className="mt-[20px] flex justify-between items-center gap-[16px]">
                          <button
                            onClick={() => setUpdate({
                              updateId: "",
                              modalId: "",
                              inputId: "",
                              require: ""
                            })}
                            className="py-[4px] px-[10px] rounded-[6px] border border-solid bg-[#fff1] hover:bg-[#fff4] active:bg-[#fff6] active:scale-95">Cancel</button>
                          <button
                            onClick={handleDelete}
                            autoFocus={true}
                            className="py-[4px] px-[10px] rounded-[6px] border border-solid bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95">Delete</button>
                        </div>
                      </div>
                    </DynamicModal>
                  )}
                  {update.inputId === item._id && (
                    <DynamicModal
                      height={"30%"}
                      isOpen={update.inputId === item._id}
                      onClose={() => setUpdate({
                        updateId: "",
                        modalId: "",
                        inputId: "",
                        require: ""
                      })}>
                      <form onSubmit={handleSubmit(updateSheetName)} className="w-[100%] flex flex-col items-center gap-[8px]">
                        <h2 className="text-[26px] font-semibold">Update your sheet name:</h2>
                        <input
                          {...register("updateName", {
                            required: "Enter your sheet name",
                            minLength: 3
                          })}
                          autoFocus={true}
                          className="w-[60%] rounded-[6px] bg-[#fff1] px-[10px] py-[4px] border border-solid mt-[20px]"
                          type="text" />
                        <p className="h-[24px] text-[red]">{errors?.updateName?.message}</p>
                        <div className="w-[40%] flex justify-between items-center gap-[6px]">
                          <button
                            type="button"
                            onClick={() => {
                              setUpdate({
                                updateId: "",
                                modalId: "",
                                inputId: "",
                                require: ""
                              }),
                                reset()
                            }}
                            className="rounded-[6px] py-[2px] px-[8px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95">Cancel</button>
                          <button
                            type="submit"
                            className="rounded-[6px] py-[2px] px-[8px] bg-[#00f] hover:bg-[#0000ffb9] ] p-[6px]active:bg-[#0000ffd9] active:scale-95">Submit</button>
                        </div>
                      </form>
                    </DynamicModal>
                  )}
                </div>
              </Fragment>
            ))
          ) : (
            <>
              <div className="w-[100%] h-[100%] p-[6px]">
                <IoMdAddCircleOutline onClick={() => setAddModal(true)} className="w-[100%] h-[100%]" />
              </div>
            </>
          )}
          {allSheets?.length !== 0 && allSheets !== null && (<>
            <div className="w-[1px] h-[60%] bg-[#fff] mx-[6px]"></div>
            <div>
              <IoMdAddCircleOutline onClick={() => setAddModal(true)} className="w-[100%] h-[100%] cursor-pointer" />
            </div>
          </>)}

          {addModal === true && (
            <DynamicModal isOpen={addModal} onClose={() => setAddModal(false)}>
              <div className="w-[50%] mx-auto h-[100%] flex flex-col gap-[8px]">
                <div className="w-[100%]">
                  <h2 className="text-[26px] text-center font-semibold">New sheet</h2>
                </div>
                <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col items-center gap-[8px] mt-[20px]">
                  <input
                    placeholder="Enter your sheet name"
                    {...register("newSheet", {
                      required: "Min length is 3",
                      minLength: 3
                    })}
                    className="py-[2px] px-[10px] rounded-[6px] bg-[#fff1] border border-solid" type="text" />
                  <p className="h-[20px] text-[red]">{errors?.newSheet?.message}</p>
                  <div className="flex gap-[8px] items-center">
                    <button className="bg-[#f00] border border-solid py-[4px] px-[10px] rounded-[6px] hover:bg-[#f008] active:bg-[#f009] active:scale-95" onClick={() => setAddModal(false)} type="button">Cancel</button>
                    <button className="bg-[#00f] border border-solid py-[4px] px-[10px] rounded-[6px] hover:bg-[#00f8] active:bg-[#00f9] active:scale-95" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </DynamicModal>
          )}
        </div>
      </div>
    </div >
  )
}

export default Sheets