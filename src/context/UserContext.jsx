import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import useServer from "../api/server";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const server = useServer();
  const { token } = useAuth();
  const workId = sessionStorage.getItem("workId")
  const navigate = useNavigate()

  const [haveUserData, setHaveUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)

  const userDataRef = useRef(null)
  const [companyData, setCompanyData] = useState(null)
  const [allWorkspace, setAllWorkspace] = useState(null);
  const [allSheets, setAllSheets] = useState(null)

  const getCompanyData = async () => {
    const response = userDataRef.current
    const selectedRole = response.roles.find((item) => item._id === response.selectedRole)
    if (response.selectedRole === selectedRole._id) {
      const response = await server.get(`/company/${selectedRole.company._id}`)
      setCompanyData(response.data)
    }
  }

  const getUserData = async () => {
    if (!token) {
      setHaveUserData(false);
      setPageLoading(false);
      return;
    }
    setPageLoading(true);

    try {
      const response = await server.get("/auth");
      setHaveUserData(Boolean(response.data));
      userDataRef.current = response.data;
      getAllWorkspace()

      getCompanyData();
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setHaveUserData(false);
    } finally {
      setPageLoading(false);
    }
  }

  const changeRole = async (id) => {
    try {
      setLoading(true);
      await server.put(`/auth/role/${id}`);
      userDataRef.current.selectedRole = id;
      await getCompanyData();
      getAllWorkspace()
      sessionStorage.clear()
      navigate("/")
    } catch (error) {
      console.error("Error changing role:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeComapnyId = async (id) => {
    try {
      const response = await server.get(`/company/${id}`)
      console.log(response);
      sessionStorage.clear()
      navigate("/")
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllWorkspace = async () => {
    const response = await server.get("/workspace")
    setAllWorkspace(response.data)
  }

  const createWorkspaceData = (data) => {
    setAllWorkspace([...allWorkspace, data])
    navigate(`/${data._id}`)
  }

  const updateWorkspaceData = (data) => {
    const filteredData = allWorkspace.filter(item => item._id !== data._id);
    setAllWorkspace([data, ...filteredData])
  };

  const deleteWorkspaceData = (id) => {
    const filteredData = allWorkspace.filter(item => item._id !== id)
    setAllWorkspace(filteredData)
    sessionStorage.clear()
    navigate("/")
  }

  const getOneWorkspace = async (id) => {
    await server.get(`/workspace/${id}`)
  }

  const getAllSheets = async () => {
    if (workId !== null && workId !== undefined && workId !== "") {
      const response = await server.get("/sheet");

      const sheets = response.data.filter(item => item.sheets.length !== 0).map(item => item.sheets.filter(sheet => sheet.workspace === workId)
      ).flat()

      setAllSheets(sheets)
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <UserContext.Provider value={{ haveUserData, pageLoading, loading, userData: userDataRef.current, changeRole, companyData, changeComapnyId, allWorkspace, createWorkspaceData, updateWorkspaceData, deleteWorkspaceData, getOneWorkspace, allSheets, getAllSheets }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};