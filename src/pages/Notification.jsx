import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const Notification = () => {
  const { notifications, getOneNotification } = useUser();
  const { notificationId } = useParams();
  const [checked, setChecked] = useState(["read"]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    getOneNotification(notificationId)
  }, [notificationId])

  const handleCheckboxChange = (item, isChecked) => {
    console.log(checked);
    setChecked(prev => {
      if (isChecked) {
        return [...prev, item];
      } else {
        return prev.filter(v => v !== item);
      }
    });
  };

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div className="w-[50%] h-[60%] border border-solid rounded-[8px] flex flex-col px-[50px] py-[30px] gap-[20px]">
        <div className="w-[100%] h-[30%] flex flex-col gap-[20px]">
          <h4 className="text-[20px] font-semibold">Join project</h4>
          <h2 className="text-[26px] font-bold">Owner_Name</h2>
        </div>
        <form className="w-[100%] h-[70%] mt-auto mx-auto flex flex-col" onSubmit={handleSubmit(/* your submit function */)}>
          <label className="text-[18px] font-semibold mb-[10px]" htmlFor="task">
            Task
          </label>
          <input
            id="task"
            type="text"
            className="bg-[#fff8] text-[#000] py-[10px] px-[20px] rounded-[6px]"
            disabled
          />
          <div className="w-[120px] mt-[40px] flex flex-col gap-[6px]">
            {notifications.map(item =>
              item.member.permissions.map((permission, ind) => (
                permission !== "read" && (<div key={`${item._id}-${ind}`} className="flex justify-between items-center font-semibold">
                  <label htmlFor={`${item._id}-${ind}`}>
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </label>
                  <input
                    id={`${item._id}-${ind}`}
                    type="checkbox"
                    checked={checked.includes(permission)}
                    onChange={(e) => handleCheckboxChange(permission, e.target.checked)} // Call your function
                  />
                </div>)
              ))
            )}
          </div>
          <button type="submit" className="mt-auto py-[16px] px-[26px] font-bold text-[20px] rounded-[6px] bg-[#4C0BCD] hover:opacity-90 active:opacity-95 active:scale-95">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notification;
