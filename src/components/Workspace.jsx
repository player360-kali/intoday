import { Fragment, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { IoMdMore } from "react-icons/io";
import useServer from "../api/server";
import { useForm } from "react-hook-form";
import addIcon from "../assets/add.svg";
import DynamicModal from "./Modal";
import { useNavigate } from "react-router-dom";

const Workspace = () => {
  const server = useServer();
  const navigate = useNavigate();
  const {
    userData,
    allWorkspace,
    createWorkspaceData,
    updateWorkspaceData,
    deleteWorkspaceData,
    getAllSheets,
    getOneWorkspace,
    ids,
    setIds
  } = useUser();

  const workSpaceId = ids.workId

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const [more, setMore] = useState({
    id: "",
    require: "",
    modal: false,
    inputId: "",
    modalId: "",
    value: "",
  });
  const [addWorkInput, setAddWorkInput] = useState(false);

  const handleCreate = async (inp) => {
    try {
      const response = await server.post("/workspace", { name: inp.createName });
      createWorkspaceData(response.data);
      setAddWorkInput(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateWorkspace = async (inp) => {
    const response = await server.put(`/workspace/${more.inputId}`, { name: inp.name });
    setMore({ id: "", require: "", modal: false, inputId: "" });
    updateWorkspaceData(response.data);
  };

  const handleDelete = async (inp) => {
    if (inp.deleteName === more.require) {
      try {
        await server.delete(`/workspace/${more.modalId}`);
        deleteWorkspaceData(more.modalId);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="bg-[#222430] p-[20px] rounded-[16px] font-semibold shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="my-[10px] flex justify-between">
        <h2 className="text-[20px] text-[#475366]">Workspace</h2>
        <button className="bg-[#171922] py-[6px] px-[16px] rounded-[6px] font-normal">see all</button>
      </div>
      <div className="w-[100%] h-auto flex flex-col gap-[8px] my-[10px]">
        {allWorkspace?.length > 0 ? (
          allWorkspace.map((item) => (
            <Fragment key={item._id}>
              <div
                className={`w-[100%] h-auto ${workSpaceId !== item._id ? "bg-[]" : "bg-[#8469B9]"
                  } flex justify-between items-center py-[6px] px-[20px] rounded-[6px] relative cursor-pointer`}
              >
                <div
                  onClick={() => {
                    workSpaceId !== item._id && (
                      navigate(`/${item._id}`),
                      getAllSheets(),
                      getOneWorkspace(item._id),
                      setIds({
                        workId: item._id,
                        sheetId: ids.sheetId
                      })
                    )
                  }}
                  onDoubleClick={() => {
                    setMore({ id: "", require: more.require, modal: false, inputId: item._id, modalId: "", value: "" });
                    setValue("name", item.name);
                  }}
                  className="w-[100%] flex items-center gap-[10px]"
                >
                  <p className="text-[20px] font-['Radio_Canada'] font-semibold">#</p>
                  <p>{item.name}</p>
                  {workSpaceId === item._id && <IoMdMore
                    onClick={() => {
                      setMore({ id: item._id, require: "", modal: false, inputId: "", modalId: "", value: "" });
                      setAddWorkInput(false)
                      console.log(item._id);
                    }}
                    className="ml-auto relative z-[10] cursor-pointer"
                    size={20}
                  />}
                </div>
                {more.id === item._id && (
                  <div className="w-[80px] py-[8px] px-[6px] rounded-[6px] bg-[#24114B] absolute top-0 right-0 z-[9999] flex flex-col">
                    <button
                      className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#00f]"
                      onClick={() => {
                        setMore({ id: "", require: more.require, modal: false, inputId: item._id, modalId: "", value: "" });
                        setValue("name", item.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setMore({ id: "", require: item.name, modal: true, inputId: "", modalId: item._id, value: item.name });
                      }}
                      className="w-[100%] h-auto hover:bg-[#fff3] rounded-[6px] hover:transition delay-200 hover:text-[#f00]"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {more.modal === true && more.modalId === item._id && (
                  <DynamicModal
                    height={"30%"}
                    isOpen={more.modal}
                    onClose={() => setMore({ id: more.id, require: more.require, modal: false, inputId: more.inputId })}
                  >
                    <div className="flex flex-col items-center justify-between gap-[10px]">
                      <div className="text-center">
                        <h2 className="text-[26px] font-semibold">Do you want to delete the workspace:</h2>
                      </div>
                      <b className="bg-[#fff4] py-[4px] px-[10px] border border-solid rounded-[6px] mb-[20px]">{more.require}</b>
                      <form onSubmit={handleSubmit(handleDelete)} className="w-[100%] flex flex-col items-center mt-[20px]">
                        <input
                          {...register("deleteName", {
                            required: "Fill your workspace name",
                            minLength: 3,
                          })}
                          autoFocus={true}
                          className="w-[50%] mx-auto bg-[#fff1] border border-solid py-[2px] px-[10px] rounded-[6px]"
                          placeholder="Enter your workspace's name"
                          type="text"
                        />
                        <p className="w-[50%] h-[20px] mb-[6px] text-[red]">{errors?.deleteName?.message}</p>
                        <div className="flex flex-row justify-between gap-[10px]">
                          <button
                            className="rounded-[6px] py-[4px] px-[8px] font-semibold bg-[#fff1] hover:bg-[#fffff0b4] active:bg-[#ffffffd9] active:scale-95"
                            type="button"
                            onClick={() => {
                              setMore({
                                id: "",
                                require: "",
                                modal: false,
                                inputId: "",
                                modalId: "",
                                value: "",
                              }, reset())
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="rounded-[6px] py-[4px] px-[8px] font-semibold bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95"
                            type="submit"
                          >
                            Delete
                          </button>
                        </div>
                      </form>
                    </div>
                  </DynamicModal>
                )}
              </div>
              {more.inputId === item._id && (
                <DynamicModal
                  height={"25%"}
                  isOpen={more.inputId === item._id}
                  onClose={() => setMore({
                    id: "",
                    require: "",
                    modal: false,
                    inputId: "",
                    modalId: "",
                    value: "",
                  })}
                >
                  <div className="w-[60%] mx-auto flex flex-col items-center justify-between">
                    <div>
                      <h2 className="text-[25px] font-semibold mb-[16px]">Edit Worklist</h2>
                    </div>
                    <form onSubmit={handleSubmit(updateWorkspace)} className="w-[80%] flex flex-col">
                      <input
                        {...register("name", {
                          required: "It's should more 3",
                          minLength: 3,
                        })}
                        autoFocus={true}
                        className="w-[100%] bg-[#fff1] border border-solid rounded-[6px] px-[8px] py-[2px]"
                        placeholder="Fill your workspace name"
                        type="text"
                      />
                      <p className="w-[100%] h-[20px] text-[red]">{errors?.name?.message}</p>
                      <div className="w-[60%] font-semibold mx-auto flex justify-between mt-[6px]">
                        <button
                          className="rounded-[6px] py-[4px] px-[8px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95"
                          type="button"
                          onClick={() => {
                            setMore({ id: "", require: "", modal: false, inputId: "" });
                            reset();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="rounded-[6px] py-[4px] px-[8px] bg-[#00f] hover:bg-[#0000ffb9] active:bg-[#0000ffd9] active:scale-95"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </DynamicModal>
              )}
              {more.id === item._id && (
                <div className="w-[100%] h-[100vh] absolute top-0 left-0" onClick={() => setMore({
                  id: "",
                  require: "",
                  modal: false,
                  inputId: "",
                  modalId: "",
                  value: "",
                })}></div>
              )}
            </Fragment>
          ))
        ) : (
          <p>No workspaces available</p>
        )}
        {addWorkInput === false && (
          <div
            onClick={() => setAddWorkInput(true)}
            className="w-[100%] h-auto py-[8px] px-[20px] bg-[#fff] rounded-[10px] text-[20px] text-[#000] flex flex-row justify-between items-center cursor-pointer">
            <img className="h-[100%]" src={addIcon} alt="" />
            <button className="font-normal">Add worklist</button>
          </div>
        )}
        {addWorkInput !== false && (
          <DynamicModal
            height={"25%"}
            isOpen={addWorkInput === true}
            onClose={() => setAddWorkInput(false)}>
            <div className="w-[60%] mx-auto flex flex-col items-center justify-between">
              <div>
                <h2 className="text-[25px] font-semibold mb-[16px]">Edit Worklist</h2>
              </div>
              <form onSubmit={handleSubmit(handleCreate)} className="w-[80%] flex flex-col">
                <input
                  className="w-[100%] py-[2px] px-[14px] bg-[#170F28] border border-solid rounded-[6px]"
                  autoFocus={true}
                  placeholder="Workspace name"
                  {...register("createName", {
                    required: "Min length 3",
                    minLength: 3
                  })}
                  type="text" />
                <p className="w-[100%] h-[20px] text-[#f00] font-medium mb-[6px]">{errors?.createName?.message}</p>
                <div className="w-[50%] mx-auto font-semibold flex flex-row justify-between items-center">
                  <button className="py-[2px] px-[8px] rounded-[6px] bg-[#f00] hover:bg-[#ff0000b9] active:bg-[#ff0000d9] active:scale-95" type="button" onClick={() => { setAddWorkInput(false), reset() }}>Cancel</button>
                  <button className="py-[2px] px-[8px] rounded-[6px] bg-[#00f] hover:bg-[#0000ffb9] active:bg-[#0000ffd9] active:scale-95" type="submit">Create</button>
                </div>
              </form>
            </div>
          </DynamicModal>
        )}
      </div>
    </div>
  );
};

export default Workspace;
