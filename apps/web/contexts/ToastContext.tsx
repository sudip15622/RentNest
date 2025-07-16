"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  toast as reactToast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
  toast: (message: string, type?: ToastType, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = (
    message: string,
    type: ToastType = "info",
    options?: ToastOptions
  ) => {
    const defaultOptions: ToastOptions = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      ...options,
    };

    switch (type) {
      case "success":
        reactToast.success(message, defaultOptions);
        break;
      case "error":
        reactToast.error(message, defaultOptions);
        break;
      case "warning":
        reactToast.warning(message, defaultOptions);
        break;
      case "info":
      default:
        reactToast.info(message, defaultOptions);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast-container"
        toastClassName="custom-toast"
      />
    </ToastContext.Provider>
  );
};
