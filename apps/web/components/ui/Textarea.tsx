"use client";
import React from "react";
import { TextField } from "@mui/material";

const Textarea = ({
  field,
  error,
  label,
  rows = 4,
}: {
  field: any;
  error: any;
  label: string;
  rows?: number;
}) => {
  return (
    <TextField
      {...field}
      label={label}
      multiline
      rows={rows}
      size="small"
      fullWidth
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

export default Textarea;
