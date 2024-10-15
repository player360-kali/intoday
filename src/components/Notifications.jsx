import { Fragment } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { notifications } = useUser();
  const navigate = useNavigate()

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div className="w-[50%] h-[60%] border border-solid rounded-[8px] flex flex-col px-[26px] py-[16px] gap-[20px]">
        <div>
          <h2 className="text-[26px] font-bold">Notifications</h2>
        </div>
        <div>
          {notifications?.length !== 0 ? (
            notifications.map(item => (
              <Fragment key={item._id}>
                <div className="w-[100%] h-auto flex flex-col gap-[10px]">
                  <div className="border-b border-gray-300 py-2 flex flex-col">
                    <p className="text-gray-500">{item.text}</p>
                    <p className="text-gray-300 text-sm">
                      Created at: {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/notifications/${item._id}`)}
                    className="bg-[#24114B] opacity-95 hover:opacity-100 active:opacity-95 active:scale-95 w-[50%] py-[6px] px-[10px] border border-solid rounded-[6px] font-semibold text-center mx-auto">
                    Join project
                  </button>
                </div>
              </Fragment>
            ))
          ) : (
            <p>You have not any notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
