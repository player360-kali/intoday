import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useServer = () => {
  const { token } = useAuth();

  const instance = axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: {
      Authorization: token ? token : '',
    },
  });

  return instance;
};

export default useServer;
