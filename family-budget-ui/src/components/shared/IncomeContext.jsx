import { createContext, useContext, useState } from 'react';
import { useFormErrorContext } from './FormErrorContext.jsx';
import AuthContext from "./AuthContext.jsx";
import createJwtInterceptor from "./jwtInterceptor.jsx";

const IncomeContext = createContext();

export const IncomeContextProvider = ({ children }) => {
  
  const { setFormError } = useFormErrorContext();
  const { user, refreshToken, setRefreshToken, logout } = useContext(AuthContext);

  const [incomeList, setIncomeList] = useState([]);
  const [income, setIncome] = useState(null);

  const fetchIncomeList = async () => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.get(
        // 'http://localhost:8001/api/incomes'
        '/data-service/api/incomes'
      );

      if (response.data !== undefined) {
        console.log("IncomeList fetching:", response.data);
        setIncomeList(response.data);
      } else {
        console.log("IncomeList fetching:", null);
        setIncomeList([]);
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error fetching Income:', error);
        setFormError(error.response.data.message);
      }
    }
  };

  const fetchIncome = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.get(
        // `http://localhost:8001/api/incomes/${id}`
        `/data-service/api/incomes/${id}`
      );
  
      if (response.data !== undefined) {
        console.log("Income fetching:", response.data);
        setIncome(response.data);
      } else {
        console.log("Income fetching:", null);
        setIncome(null);
      }
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error fetching Income:', error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.get(
            // `http://localhost:8001/api/incomes/${id}`
            `/data-service/api/incomes/${id}`
          );
          console.log("Income fetching with refreshed token:", response.data);
        } catch (error) {
          console.error("Error fetching Income with refreshed token:", error);
        }
      }
    }
  };

  const createIncome = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.post(
        // "http://localhost:8001/api/incomes",
        "/data-service/api/incomes",
        payload
      );
      setFormError(null);
      console.log("Income created:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error creating Income:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.post(
            // "http://localhost:8001/api/incomes",
            "/data-service/api/incomes",
            payload
          );
          console.log("Income created with refreshed token:", response.data);
        } catch (error) {
          console.error("Error creating Income with refreshed token:", error);
        }
      }
    }
  };

  const updateIncome = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.put(
        // "http://localhost:8001/api/incomes",
        "/data-service/api/incomes",
        payload
      );
      setFormError(null);
      console.log("Income updated", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error updating Income:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.put(
            // "http://localhost:8001/api/incomes",
            "/data-service/api/incomes",
            payload
          );
          console.log("Income updated with refreshed token:", response.data);
        } catch (error) {
          console.error("Error updating Income with refreshed token:", error);
        }
      }
    }
  };

  const deleteIncome = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.delete(
        // `http://localhost:8001/api/incomes/${id}`
        `/data-service/api/incomes/${id}`
      );
      setFormError(null);
      console.log("Income deleted:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error deleting Income:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.delete(
            // `http://localhost:8001/api/incomes/${id}`
            `/data-service/api/incomes/${id}`
          );
          console.log("Income deleted:", response.data);
        } catch (error) {
          console.error("Error deleting Income with refreshed token:", error);
        }
      }
    }
  };

  return (
    <IncomeContext.Provider value={{ income, incomeList, fetchIncome,  
      fetchIncomeList, createIncome, updateIncome, deleteIncome }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomeContext = () => useContext(IncomeContext);