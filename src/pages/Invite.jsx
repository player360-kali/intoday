import { useForm } from "react-hook-form"
import { useUser } from "../context/UserContext"
import { Fragment, useEffect, useState } from "react"
import DynamicModal from "../components/Modal"
import userImg from "../assets/profile.svg"
import { Link } from "react-router-dom"
const Invite = () => {

  const { searchUser, inviteUser, sendInvite } = useUser()

  const [showUser, setShowUser] = useState(false)
  const [userSelects, setUserSelects] = useState({
    open: false,
    value: []
  })

  const options = [
    {
      value: "create",
      text: "Create"
    },
    {
      value: "update",
      text: "Update"
    },
    {
      value: "delete",
      text: "Delete"
    }
  ]

  useEffect(() => {
    console.log(userSelects);
  }, [userSelects])

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSearchEmail = (inp) => {
    searchUser(inp.email);
  }

  const handleInvite = () => {
    sendInvite(inviteUser._id, userSelects.value)
  }

  return (
    <div className="w-[100%] h-[100vh] relative flex justify-center items-center">
      <div className="w-[50%] h-[60%] p-[40px] border border-solid rounded-[8px]">
        <div className="w-[100%] h-[100%] flex flex-col justify-between">
          <div className="w-[100%]">
            <Link to={"/"} className="text-[14px] font-semibold mb-[10px]">Go back</Link>
            <h4 className="text-[20px] font-semibold">Invite a member</h4>
          </div>
          <div>
            <h2 className="text-[36px] font-bold">Enter email or ID</h2>
          </div>
          <form onSubmit={handleSubmit(handleSearchEmail)} className="w-[100%] h-[60%] flex flex-col">
            <label className="text-[16px] font-semibold mb-[2px]" htmlFor="email">Email</label>
            <div className="w-[100%] h-auto flex flex-row justify-between gap-[10px]">
              <input
                {...register("email", {
                  required: "Inter member's email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="Company name..."
                className="w-[80%] h-auto bg-[#fff4] py-[16px] px-[26px] rounded-[6px] border border-solid"
              />
              <button type="submit" className="w-[20%] py-[8px] px-[6px] rounded-[6px] font-semibold bg-[#fff] hover:opacity-90 active:opacity-95 active:scale-95 text-[#000]">Search</button>
            </div>
            <p className="w-[100%] h-[24px] mt-[10px] text-[red]">{errors?.email?.message}</p>
            <b onClick={() => setShowUser(true)} className="w-[100px] text-[gray] hover:text-[#fff] cursor-pointer">{inviteUser?.length !== 0 ? (<>Show user {inviteUser.length}</>) : (<></>)}</b>
            <button
              onClick={handleInvite}
              className="mt-auto py-[16px] px-[26px] font-bold text-[20px] rounded-[6px] bg-[#4C0BCD] hover:opacity-90 active:opacity-95 active:scale-95">Send</button>
          </form>
        </div>
      </div>
      <DynamicModal isOpen={showUser} onClose={() => setShowUser(false)}>
        {inviteUser.map(item => (
          <Fragment key={item._id}>
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
              <div className="w-[100%] h-auto flex items-center justify-between border border-solid py-[6px] px-[10px] rounded-[6px] bg-[#fff0] hover:bg-[#fff1] cursor-pointer">
                <div className="w-[36px] h-[36px] rounded-full">
                  <img
                    className="w-[100%] h-[100%] rounded-full bg-[#fff]"
                    src={item.avatar ?? userImg}
                    alt="" />
                </div>
                <div>
                  <p>{item.email}</p>
                  <div className="flex gap-[4px]">
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={() => setUserSelects({ open: true, value: userSelects.value })}>Choose</button>
                  {userSelects.open === true &&
                    <div className="bg-[#24114B] py-[6px] px-[10px] rounded-[6px] z-[20] border border-solid absolute top-0 right-0">
                      {options.map(item => (
                        <Fragment key={item.value}>
                          <div className="flex justify-between gap-[6px]">
                            <label htmlFor={item.value}>{item.text}</label>
                            <input
                              id={item.value}
                              type="checkbox"
                              checked={userSelects.value.includes(item.value)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setUserSelects(prev => ({
                                  ...prev,
                                  value: isChecked
                                    ? [...prev.value, item.value]
                                    : prev.value.filter(v => v !== item.value),
                                  open: true
                                }));
                              }}
                            />
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  }
                </div>
              </div>
              <button onClick={() => setShowUser(false)} className="mt-auto py-[10px] px-[20px] font-bold text-[20px] rounded-[6px] bg-[#4C0BCD] hover:opacity-90 active:opacity-95 active:scale-95">Choose</button>
            </div>
            {userSelects.open === true && (
              <div onClick={() => setUserSelects({ open: false, value: userSelects.value })} className="w-[100%] h-[100%] absolute top-0 left-0 z-[10]"></div>
            )}
          </Fragment>
        ))}
      </DynamicModal>
    </div>
  )
}

export default Invite