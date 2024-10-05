import { Fragment, useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import { IoMdMore } from "react-icons/io";
import useServer from "../api/server";
import { useForm } from "react-hook-form"
import addIcon from "../assets/add.svg"
import DynamicModal from "./Modal";
import { useNavigate } from "react-router-dom";

const Workspace = () => {

  const server = useServer()
  const navigate = useNavigate()
  const { allWorkspace, createWorkspaceData, updateWorkspaceData, deleteWorkspaceData, getAllWorkspace, companyData } = useUser()
  const workSpaceId = sessionStorage.getItem("workId")

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm()

  const [more, setMore] = useState(
    {
      id: "",
      require: "",
      modal: false,
      inputId: "",
      modalId: "",
      value: ""
    }
  )
  const [addWorkInput, setAddWorkInput] = useState(false)

  console.log(allWorkspace);

  const handleCreate = async (inp) => {
    try {
      const response = await server.post("/workspace", { name: inp.createName })
      createWorkspaceData(response.data)
      setAddWorkInput(false)
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateWorkspace = async (inp) => {
    const response = await server.put(`/workspace/${more.inputId}`, { name: inp.name })
    setMore({ id: "", require: "", modal: false, inputId: "" })
    updateWorkspaceData(response.data)
  }

  const handleDelete = async (inp) => {
    if (inp.deleteName === more.require) {
      try {
        const response = await server.delete(`/workspace/${more.modalId}`)
        deleteWorkspaceData(more.modalId)
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="font-semibold">
      <div className="my-[10px]">
        <h2>Workspace</h2>
      </div>
      <div className="w-[100%] h-auto flex justify-between flex-col gap-[8px] my-[10px]">
        {allWorkspace?.length !== 0 && allWorkspace !== null ? allWorkspace.map(item => (
          <Fragment key={item._id}>
            <div className={`w-[100%] h-auto bg-[${workSpaceId !== item._id ? "#170F28" : "#ffffff1a"}] flex flex-row justify-between items-center py-[6px] px-[16px] rounded-[6px] text-left relative select-none cursor-pointer`}>
              {more.inputId === item._id && (
                <form onSubmit={handleSubmit(updateWorkspace)} className="w-[100%] flex flex-col">
                  <input
                    {...register("name", {
                      required: "It's should more 3",
                      minLength: 3
                    })}
                    autoFocus={true}
                    className="w-[100%] bg-[#fff1] border border-solid rounded-[6px] px-[8px]"
                    type="text" />
                  <p className="w-[100%] h-[20px] text-[red]">{errors?.name?.message}</p>
                  <div className="w-[100%] h-auto">
                    <button className="rounded-[6px] mt-[6px] py-[4px] px-[8px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95" type="button" onClick={() => { setMore({ id: "", require: "", modal: false, inputId: "" }), reset() }}>Cancel</button>
                    <button className="rounded-[6px] mt-[6px] py-[4px] px-[8px] bg-[#00f] hover:bg-[#0000ffb9] active:bg-[#0000ffd9] active:scale-95" type="submit">Submit</button>
                  </div>
                </form>
              )}
              {more.inputId !== item._id && (
                <div onClick={() => { workSpaceId !== item._id ? navigate(`/${item._id}`) : "" }} onDoubleClick={() => { setMore({ id: "", require: more.require, modal: false, inputId: item._id, modalId: "", value: "" }), setValue("name", item.name) }} className="w-[80%] flex gap-[10px]">
                  <p>#</p>
                  <p>{item.name}</p>
                </div>
              )}
              {more.inputId !== item._id && (
                <div>
                  <IoMdMore onClick={() => { setMore({ id: item._id, require: "", modal: false, inputId: "", modalId: "", value: "" }), setAddWorkInput(false) }} className="relative cursor-pointer" size={20} />
                </div>
              )}
              {more.id === item._id && (
                <div className="w-[80px] py-[8px] px-[6px] rounded-[6px] bg-[#24114B] absolute top-0 right-0 z-[9999] flex flex-col">
                  <button
                    className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#00f]"
                    onClick={() => { setMore({ id: "", require: more.require, modal: false, inputId: item._id, modalId: "", value: "" }), setValue("name", item.name) }}
                  >Edit</button>
                  <button
                    onClick={() => { setMore({ id: "", require: item.name, modal: true, inputId: "", modalId: item._id, value: item.name }) }}
                    className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#f00]">Delete</button>
                </div>
              )}
              {more.modal === true && more.modalId === item._id && (
                <DynamicModal isOpen={more.modal} onClose={() => setMore({ id: more.id, require: more.require, modal: false, inputId: more.inputId })} >
                  <div>
                    <div className="text-center">
                      <h2 className="text-[26px] font-semibold">Do you want to delete your workspace?</h2>
                      <span>
                        <p>Do you want to delete the workspace:</p>
                        <br />
                        <b className="bg-[#fff4] py-[4px] px-[10px] border border-solid rounded-[6px]">{more.require}</b>
                      </span>
                    </div>
                    <form onSubmit={handleSubmit(handleDelete)} className="flex flex-col">
                      <div className="w-[50%] mx-auto my-[20px]">
                        <input
                          {...register("deleteName", {
                            required: "Fill your workspace name",
                            minLength: 3
                          })}
                          className="w-[100%] bg-[#fff1] border border-solid py-[2px] px-[10px] rounded-[6px]" placeholder="Inter your workspace's name" type="text" />
                        <p className="w-[100%] h-[20px] text-[red]">
                          {errors?.deleteName?.message}
                        </p>
                      </div>
                      <div className="w-[50%] mx-auto flex flex-row items-center justify-around font-semibold">
                        <button type="button" className="py-[4px] px-[14px] rounded-[6px] bg-[#00f] hover:opacity-80 active:opacity-95 active:scale-95" onClick={() => { setMore({ id: "", require: "", modal: false, inputId: "", modalId: "", value: "" }), reset() }} >Cancel</button>
                        <button type="submit" className="py-[4px] px-[14px] rounded-[6px] bg-[#f00] hover:opacity-80 active:opacity-95 active:scale-95">Delete</button>
                      </div>
                    </form>
                  </div>
                </DynamicModal>
              )}
            </div>
            {more.id !== "" && (
              <div onClick={() => setMore({ id: "", require: "", modal: false, inputId: "", modalId: "", value: "" })} className="w-[100%] h-[100vh] absolute top-0 left-0 z-10"></div>
            )}
          </Fragment>
        )) : (<>
          You haven't some data
        </>)}
      </div>
      {addWorkInput === false ? (
        <div
          onClick={() => setAddWorkInput(true)}
          className="w-[100%] h-auto py-[4px] px-[14px] bg-[#fff] rounded-[6px] text-[#000] flex flex-row justify-between items-center cursor-pointer">
          <img className="w-[16px] h-[16px]" src={addIcon} alt="" />
          <button className="font-normal">Add worklist</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleCreate)}>
          <input
            className="w-[100%] py-[2px] px-[14px] bg-[#170F28] border border-solid rounded-[6px]"
            placeholder="Workspace name"
            {...register("createName", {
              required: "Min length 3",
              minLength: 3
            })}
            type="text" />
          <p className="w-[100%] h-[20px] text-[#f00] font-medium mb-[4px]">{errors?.createName?.message}</p>
          <div className="w-[100%] flex flex-row justify-between items-center">
            <button className="py-[2px] px-[8px] rounded-[6px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95" type="button" onClick={() => { setAddWorkInput(false), reset() }}>Cancel</button>
            <button className="py-[2px] px-[8px] rounded-[6px] bg-[#00f] hover:bg-[#0000ffb9] active:bg-[#0000ffd9] active:scale-95" type="submit">Create</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Workspace