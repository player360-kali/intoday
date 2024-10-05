import { Fragment } from "react";
import { useUser } from "../context/UserContext";

const AllCompany = () => {
  const { userData, changeRole, loading } = useUser();
  return (
    <div className="w-[100%] h-auto p-[20px]">
      {userData.slectedRole === null && userData.slectedRole === "" && userData.slectedRole === undefined && <div className="w-[100%] mx-auto text-center">
        <div className="mb-[20px]">
          <h2 className="text-[36px] font-semibold">Please, select your company:</h2>
        </div>
        <div className="w-[50%] mx-auto relative mt-[20px]">
          {loading && <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[#170F2880] rounded-[6px] flex justify-center items-center border border-solid">
            <p>Loding ...</p>
          </div>}
          <div className="w-[100%] h-auto flex justify-between flex-col gap-[4px] bg-[#170F28] rounded-[6px]">
            {userData?.roles?.map((item) => (
              <Fragment key={item._id}>
                {item.company?.name && item.company._id !== "" ? (
                  <div onClick={() => changeRole(item._id)} className="w-[100%] h-auto p-[6px] rounded-[6px] transition font-semibold hover:bg-[#fff5] cursor-pointer">{item.company.name}</div>
                ) : null}
              </Fragment>
            ))}
          </div>
          {userData?.roles?.length === 0 || userData?.roles === undefined && <div>No companies found.</div>}
        </div>
      </div>}
    </div>
  );
};

export default AllCompany;
