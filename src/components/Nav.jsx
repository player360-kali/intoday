import { useMemo, useState } from "react";
import { GoBell } from "react-icons/go";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import profileIcon from "../assets/profile.svg";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { userData, changeRole, loading, companyData } = useUser();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate()

  const userRoles = useMemo(() => {
    if (userData?.roles) {
      return userData.roles.filter((role) => role.company?.name && role.company._id !== "");
    }
    return [];
  }, [userData?.roles]);

  const handleModalToggle = () => {
    setModal((prev) => !prev);
  };

  const handleChangeRole = async (roleId) => {
    await changeRole(roleId);
  };

  return (
    <div className="w-[100%] h-[100px] p-[20px] border border-solid flex justify-between flex-row items-center">
      <div>
        <h2 className="text-[26px] font-bold text-[#8469B9]">{companyData?.name ?? "Select your company"}</h2>
      </div>
      <div className="flex justify-between gap-[10px]">
        <div onClick={() => navigate("/notifications")} className="h-[100%] border border-solid rounded-[10px] p-[10px] cursor-pointer">
          <GoBell size={26} />
        </div>
        <div onClick={() => navigate("/invite")} className="h-[100%] border border-solid rounded-[10px] p-[10px] cursor-pointer">
          <MdOutlinePersonAddAlt size={26} />
        </div>
        <div className="h-[100%] border border-solid rounded-[10px] flex gap-[6px] items-center p-[5px] relative">
          <div className="flex flex-col">
            {userData ? (
              <>
                <h4 className="text-[14px]">{userData.name + " " + userData.surname}</h4>
                <p className="text-[10px] text-[#007AFF]">{companyData?.name ?? "None"}</p>
              </>
            ) : (
              <h4 className="text-[14px]">Loading...</h4>
            )}
          </div>
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              className="w-[100%] h-[100%] rounded-full bg-[#fff] object-cover"
              src={userData?.avatar || profileIcon}
              alt="Profile"
            />
          </div>
          <div>
            <FaAngleDown onClick={handleModalToggle} size={15} />
          </div>
          {modal && (
            <div className="w-[70%] h-auto absolute mx-auto text-center z-20">
              <div className="w-[100%] mx-auto relative mt-[20px]">
                {loading && (
                  <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[#170F2880] rounded-[6px] flex justify-center items-center border border-solid">
                    <p>Loading...</p>
                  </div>
                )}
                <div className="w-[100%] h-auto flex justify-between flex-col gap-[4px] bg-[#170F28] rounded-[6px]">
                  {userRoles.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleChangeRole(item._id)}
                      className="w-[100%] h-auto p-[6px] rounded-[6px] transition font-semibold hover:bg-[#fff5] cursor-pointer"
                    >
                      {item.company.name}
                    </div>
                  ))}
                </div>
                {userRoles.length === 0 && <div>No companies found.</div>}
              </div>
            </div>
          )}
        </div>
        {modal && <div onClick={() => setModal(false)} className="w-[100%] h-[100%] absolute top-0 left-0 z-0"></div>}
      </div>
    </div>
  );
};

export default Nav;
