"use client";
import React from "react";
import { TextField } from "@mui/material";

const InputWithoutLabel = ({
  field,
  error,
  placeholder,
  type = "text",
}: {
  field: any;
  error: any;
  placeholder: string;
  type?: string;
}) => {
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      type={type}
      size="small"
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&:hover fieldset": {
            borderColor: !error ? "#a16207" : undefined,
          },
          "&.Mui-focused fieldset": {
            borderColor: !error ? "#a16207" : undefined,
          },
        },
        "& .MuiOutlinedInput-input": {
          "&::placeholder": {
            color: "var(--foreground-sec)",
            opacity: 1,
          },
        },
      }}
    />
  );
};

export default InputWithoutLabel;
