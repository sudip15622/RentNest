// Example usage in any client component
"use client";

import { useToast } from "../../../contexts/ToastContext";

export default function ToastExample() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast("Profile updated successfully!", "success");
  };

  const handleError = () => {
    toast("Something went wrong!", "error");
  };

  const handleInfo = () => {
    toast("This is some information", "info");
  };

  const handleWarning = () => {
    toast("Warning: Please check your input", "warning");
  };

  // With custom options
  const handleCustom = () => {
    toast("Custom toast!", "success", {
      autoClose: 5000,
      position: "bottom-center"
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleInfo}>Info Toast</button>
      <button onClick={handleWarning}>Warning Toast</button>
      <button onClick={handleCustom}>Custom Toast</button>
    </div>
  );
}