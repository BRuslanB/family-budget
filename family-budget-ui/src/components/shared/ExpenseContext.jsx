import { createContext, useContext, useState } from 'react';
import { useFormErrorContext } from './FormErrorContext.jsx';
import AuthContext from "./AuthContext.jsx";
import createJwtInterceptor from "./jwtInterceptor.jsx";

const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {

  const { setFormError } = useFormErrorContext();

  const [expenseList, setExpenseList] = useState([]);
  const [expense, setExpense] = useState(null);
  const { user, refreshToken, setRefreshToken, logout } = useContext(AuthContext);

  const fetchExpenseList = async () => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.get(
        // 'http://localhost:8001/api/expenses'
        '/data-service/api/expenses'
      );

      if (response.data !== undefined) {
        console.log("ExpenseList fetching:", response.data);
        setExpenseList(response.data);
      } else {
        console.log("ExpenseList fetching:", null);
        setExpenseList([]);
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error fetching Expense:', error);
        setFormError(error.response.data.message);
      }
    }
  };

  const fetchExpense = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.get(
        // `http://localhost:8001/api/expenses/${id}`
        `/data-service/api/expenses/${id}`
      );

      if (response.data !== undefined) {
        console.log("Expense fetching:", response.data);
        setExpense(response.data);
      } else {
        console.log("Expense fetching:", null);
        setExpense(null);
      }
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error fetching Expense:', error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.get(
            // `http://localhost:8001/api/expenses/${id}`
            `/data-service/api/expenses/${id}`
          );
          console.log("Expense fetching with refreshed token:", response.data);
        } catch (error) {
          console.error("Error fetching Expense with refreshed token:", error);
        }
      }
    }
  };

  const createExpense = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.post(
        // "http://localhost:8001/api/expenses",
        "/data-service/api/expenses",
        payload
      );
      setFormError(null);
      console.log("Expense created:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error creating Expense:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.post(
            // "http://localhost:8001/api/expenses",
            "/data-service/api/expenses",
            payload
          );
          console.log("Expense created with refreshed token:", response.data);
        } catch (error) {
          console.error("Error creating Expense with refreshed token:", error);
        }
      }
    }
  };

  const updateExpense = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.put(
        // "http://localhost:8001/api/expenses",
        "/data-service/api/expenses",
        payload
      );
      setFormError(null);
      console.log("Expense updated:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error updating Expense:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.put(
            // "http://localhost:8001/api/expenses",
            "/data-service/api/expenses",
            payload
          );
          console.log("Expense updated with refreshed token:", response.data);
        } catch (error) {
          console.error("Error updating Expense with refreshed token:", error);
        }
      }
    }
  };

  const deleteExpense = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.delete(
        // `http://localhost:8001/api/expenses/${id}`
        `/data-service/api/expenses/${id}`
      );
      setFormError(null);
      console.log("Expense deleted:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error deleting Expense:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.delete(
            // `http://localhost:8001/api/expenses/${id}`
            `/data-service/api/expenses/${id}`
          );
          console.log("Expense deleted:", response.data);
        } catch (error) {
          console.error("Error deleting Expense with refreshed token:", error);
        }
      }
    }
  };

  return (
    <ExpenseContext.Provider value={{ expense, expenseList, fetchExpense, 
      fetchExpenseList, createExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);