"use client";
import React from "react";
import { TextField } from "@mui/material";

const Input = ({
  field,
  error,
  label,
  type,
}: {
  field: any;
  error: any;
  label: string;
  type: string;
}) => {
  return (
    <TextField
      {...field}
      label={label}
      type={type}
      size="small"
      fullWidth
      error={!!error}
      helperText={error?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: !error ? "#7266ff" : undefined,
          },
          "&.Mui-focused fieldset": {
            borderColor: !error ? "#7266ff" : undefined,
          },
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: !error ? "#7266ff" : undefined,
          },
        },
      }}
    />
  );
};

export default Input;
