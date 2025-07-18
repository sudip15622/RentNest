"use client";
import React from "react";
import { TextField } from "@mui/material";

const TextareaWithoutLabel = ({
  field,
  error,
  placeholder,
  rows = 4,
}: {
  field: any;
  error: any;
  placeholder: string;
  rows?: number;
}) => {
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      multiline
      rows={rows}
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
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: !error ? "#a16207" : undefined,
          },
        },
      }}
    />
  );
};

export default TextareaWithoutLabel;
