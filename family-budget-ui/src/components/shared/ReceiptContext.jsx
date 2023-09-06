import { createContext, useContext, useState } from 'react';
import { useFormErrorContext } from './FormErrorContext.jsx';
import AuthContext from "./AuthContext.jsx";
import createJwtInterceptor from "./jwtInterceptor.jsx";

const ReceiptContext = createContext();

export const ReceiptContextProvider = ({ children }) => {
  
  const { formError, setFormError } = useFormErrorContext();
  const { user, refreshToken, setRefreshToken, logout } = useContext(AuthContext);

  const [receipt, setReceipt] = useState(null);
  const [receiptId, setReceiptId] = useState("");

  const fetchReceipt = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.get(
        // `http://localhost:8002/api/receipts/${id}`
        `/receipt-service/api/receipts/${id}`
      );

      if (response.data !== undefined) {
        console.log("Receipt fetching:", response.data);
        setReceipt(response.data);
        setReceiptId(response.data.id);
      } else {
        console.log("Receipt fetching:", null);
        setReceipt(null);
        setReceiptId("");
      }
      console.log("ReceiptContext.Receipt", receipt);
      console.log("ReceiptContext.ReceiptId", receiptId);
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error fetching Receipt:', error);
        setFormError(error.response.data.message);
        setReceipt(null);
        setReceiptId("");
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.get(
            // `http://localhost:8002/api/receipts/${id}`
            `/receipt-service/api/receipts/${id}`
          );
          console.log("Receipt fetching with refreshed token:", response.data);
          setReceipt(response.data);
          setReceiptId(response.data.id);
        } catch (error) {
          console.error("Error fetching Receipt with refreshed token:", error);
          setReceipt(null);
          setReceiptId("");
        }
      }
    }
  };

  const createReceipt = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.post(
        // "http://localhost:8002/api/receipts",
        "/receipt-service/api/receipts",
        payload
      );
      console.log("Receipt created:", response.data);
      setReceiptId(response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error creating Receipt:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.post(
            // "http://localhost:8002/api/receipts",
            "/receipt-service/api/receipts",
            payload
          );
          console.log("Receipt created with refreshed token:", response.data);
          setReceiptId(response.data);
        } catch (error) {
          console.error("Error creating Receipt with refreshed token:", error);
          setReceiptId("");
        }
      }
    }
  };

  const updateReceipt = async (payload) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.put(
        // "http://localhost:8002/api/receipts",
        "/receipt-service/api/receipts",
        payload
      );
      console.log("Receipt updated:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error updating Receipt:", error);
        setFormError(error.response.data.message);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.put(
            // "http://localhost:8002/api/receipts",
            "/receipt-service/api/receipts",
            payload
          );
          console.log("Receipt updated with refreshed token:", response.data);
        } catch (error) {
          console.error("Error updating Receipt with refreshed token:", error);
        }
      }
    }
  };

  const deleteReceipt = async (id) => {
    try {
      const interceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, 
        setRefreshToken, logout);
      const axiosInstance = interceptor;
      const response = await axiosInstance.delete(
        // `http://localhost:8002/api/receipts/${id}`
        `/receipt-service/api/receipts/${id}`
      );
      console.log("Receipt deleted:", response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error deleting Receipt:", error);
        setFormError(error.response.data.message);
        console.log("ReceiptContext6.formError=", formError);
      }
      if (error.response && error.response.status === 403) {
        const newInterceptor = createJwtInterceptor(user?.sub, refreshToken?.UUID, setRefreshToken, logout);
        const newAxiosInstance = newInterceptor;
        try {
          const response = await newAxiosInstance.delete(
            // `http://localhost:8002/api/receipts/${id}`
            `/receipt-service/api/receipts/${id}`
          );
          console.log("Receipt deleted:", response.data);
        } catch (error) {
          console.error("Error deleting Receipt with refreshed token:", error);
        }
      }
    }
  };

  return (
    <ReceiptContext.Provider value={{ receipt, setReceipt, receiptId, setReceiptId, 
      fetchReceipt, createReceipt, updateReceipt, deleteReceipt }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceiptContext = () => useContext(ReceiptContext);