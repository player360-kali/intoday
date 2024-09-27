// api/server.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useServer = () => {
  const { token } = useAuth(); // useAuth'ni chaqirish

  const instance = axios.create({
    baseURL: 'https://enterprise-management-crm.onrender.com/api',
    headers: {
      Authorization: token // Tokenni qo'shish
    }
  });

  return instance; // Axios instance'ini qaytarish
};
