import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServer from '../api/server';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { workId, sheetId } = useParams();
  const server = useServer();
  const { token } = useAuth();
  const navigate = useNavigate()

  const [haveUserData, setHaveUserData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const userDataRef = useRef(null);
  const [companyData, setCompanyData] = useState(null);
  const [allWorkspace, setAllWorkspace] = useState(null);
  const [allSheets, setAllSheets] = useState(null);

  const [columns, setColumns] = useState(null)
  const [selects, setSelects] = useState(null)
  const [tasks, setTasks] = useState(null)

  const [inviteUser, setInviteUser] = useState([])
  const [notifications, setNotifications] = useState([])
  const [oneNotification, setOneNotification] = useState(null)

  const [ids, setIds] = useState({
    workId: workId || null,
    sheetId: sheetId || null
  });

  const getCompanyData = async () => {
    const response = userDataRef.current;
    const selectedRole = response.roles.find((item) => item._id === response.selectedRole);
    if (response.selectedRole === selectedRole._id) {
      const response = await server.get(`/company/${selectedRole.company._id}`);
      setCompanyData(response.data);
    }
  };

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

      getCompanyData();
    } catch (error) {
      console.error("Error fetching user data:", error);
      setHaveUserData(false);
    } finally {
      setPageLoading(false);
    }
  };

  const getOneWorkspace = async (id) => {
    if (token) {
      try {
        const response = await server.get(`/workspace/${id}`)
        setAllSheets(response.data.sheets);
      } catch (error) {
        console.error("Error fetching workspace:", error.message);
      }
    }
  };

  const getAllWorkspace = async () => {
    try {
      const response = await server.get("/workspace");
      setAllWorkspace(response.data);
    } catch (error) {
      console.log("Error fetching workspaces:", error.message);
    }
  };

  const updateWorkspaceData = (data) => {
    const filteredData = allWorkspace.filter(item => item._id !== data._id);
    setAllWorkspace([data, ...filteredData])
  };

  const deleteWorkspaceData = (id) => {
    const filteredData = allWorkspace.filter(item => item._id !== id)
    setAllWorkspace(filteredData)
  }

  const getAllSheets = async () => {
    if (ids.workId) {
      try {
        const response = await server.get("/sheet");
        const sheets = response.data
          .filter(item => item.sheets.length !== 0)
          .map(item => item.sheets.filter(sheet => sheet.workspace === ids.workId))
          .flat();

        setAllSheets(sheets)
      } catch (error) {
        console.log("Error fetching sheets:", error.message);
      }
    }
  }

  const createSheet = async (name) => {
    const response = await server.post("/sheet", {
      workspace: ids.workId,
      name: name
    })
    setAllSheets([...allSheets, response.data])
    setIds({
      workId: ids.workId,
      sheetId: response.data._id
    })
    navigate(`/${ids.workId}/${response.data._id}`)
  }

  const updateSheet = async (id, name) => {
    const response = await server.put(`/sheet/${id}`, { name: name })
    console.log(allSheets);
    const filteredSheets = allSheets.filter(item => item._id !== id)
    setAllSheets([response.data, ...filteredSheets])
  }

  const deleteSheet = async (id) => {
    await server.delete(`/sheet/${id}`)
    const filteredSheets = allSheets.filter(item => item._id !== id)
    setAllSheets(filteredSheets)
    navigate(`/${ids.workId}`)
  }

  const getColumns = () => {
    if (allSheets && allSheets.length > 0) {
      const filteredSheet = allSheets.filter(item => item._id === ids.sheetId)
        .map(item => item.columns)
        .flat()
      setColumns(filteredSheet)
    } else {
      console.log("Sheets data not available yet.");
    }
  }

  const createColumns = async (type, name) => {
    if (type === "text") {
      const response = await server.post("/column", {
        name: name,
        key: type,
        sheet: ids.sheetId
      })
      setColumns([response.data, ...columns])
    }
    else if (type === "select") {
      const selectIds = []
      selects.filter(item => selectIds.push(item._id))
      console.log(ids.sheetId);
      console.log(selectIds);
      const response = await server.post("/column", {
        name: name,
        key: type,
        sheet: ids.sheetId,
        selects: selectIds
      })
      setColumns([response.data, ...columns])
    }
    console.log("created");
  }

  const updateColumns = async (id, columnName) => {
    try {
      const response = await server.put(`/column/${id}`, { name: columnName });
      const updatedColumn = response.data;
      const updatedColumns = columns.map(item =>
        item._id === id ? { ...item, name: updatedColumn.name } : item
      );
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Failed to update column:', error);
    }
  };

  const deleteColumns = async (id) => {
    await server.delete(`/column/${id}`)
    const filteredData = columns.filter(item => item._id !== id)
    setColumns(filteredData)
  }

  const getSelectors = async () => {
    const response = await server.get("/select")
    setSelects(response.data)
  }

  const createSelectors = async (value, color) => {
    const response = await server.post("/select", { value: value, color: color })
    setSelects([...selects, response.data])
  }

  const deleteSelectFunk = async (id, when) => {
    if (when === "forever") {
      await server.delete(`/select/${id}`)
    }
    const filteredSelects = selects.filter(item => item._id !== id)
    setSelects(filteredSelects)
  }

  const getTasks = async () => {
    const filteredTasks = allSheets.filter(item => item.tasks.length !== 0)
      .map(item => item.tasks)
      .flat()
    setTasks(filteredTasks)
    console.log(filteredTasks);
  }

  const createNewTask = async () => {
    const response = await server.post("/task", {
      name: "",
      sheet: ids.sheetId
    })
    setTasks(response.data.result)
  }

  const searchUser = async (email) => {
    let user = []
    const response = await server.get(`/auth/${email}`)
    user.push(response.data)
    setInviteUser(user)
    console.log(response.data);
  }

  const sendInvite = async () => {
    const response = await server.post("/member")
    console.log(response)
  }

  // const getInviteUserData = async () =>{
  //   const response = await server.get("")
  // }

  const getAllNotifications = async () => {
    if (token) {
      const response = await server.get("/notification")
      setNotifications(response.data)
      console.log(response.data);
    }
  }

  const getOneNotification = async (notificationId) => {
    const response = await server.get(`/notification/${notificationId}`)
    console.log(response);
    setOneNotification(response.data)
  }

  useEffect(() => {
    if (token) {
      getUserData();
      getAllWorkspace();
      if (ids.workId) {
        getAllSheets();
      }
      getAllNotifications()
    }
  }, [token, ids.workId]);

  useEffect(() => {
    if (allSheets && allSheets.length > 0) {
      getColumns()
      getSelectors()
      getTasks()
    }
  }, [ids.sheetId, allSheets]);

  return (
    <UserContext.Provider value={{
      haveUserData,
      pageLoading,
      userData: userDataRef.current,
      companyData,
      allWorkspace,
      ids,
      setIds,
      getOneWorkspace,
      updateWorkspaceData,
      deleteWorkspaceData,
      allSheets,
      getAllSheets,
      createSheet,
      updateSheet,
      deleteSheet,
      columns,
      setColumns,
      updateColumns,
      selects,
      setSelects,
      createSelectors,
      deleteSelectFunk,
      createColumns,
      deleteColumns,
      tasks,
      createNewTask,
      searchUser,
      inviteUser,
      sendInvite,
      notifications,
      getOneNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
