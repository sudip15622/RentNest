"use client";
import React from "react";

import { Button as MuiButton } from "@mui/material";

import { ScaleLoader } from "react-spinners";

const Button = ({
  icon,
  type = "button",
  children = "Search",
  isSubmitting = false
}: {
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  isSubmitting?: boolean,
}) => {
  return (
    <MuiButton
      type={type}
      variant="contained"
      fullWidth
      size="small"
      {...(icon && { startIcon: icon })}
      sx={{
        backgroundColor: "var(--primary)",
        fontWeight: "bold",
        transition: "all 0.3s ease",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        gap: "8px",
        height: "40px", // Match the height of small TextField
        "&:hover": {
          backgroundColor: "var(--primary-dark)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {isSubmitting ? <ScaleLoader height={21} color="#f2f1ed"/> : children}
    </MuiButton>
  );
};

export default Button;
