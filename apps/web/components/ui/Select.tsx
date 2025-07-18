"use client";
import React from "react";
import { TextField, MenuItem } from "@mui/material";

const Select = ({
  field,
  error,
  label,
  options,
}: {
  field: any;
  error: any;
  label: string;
  options: { value: string; label: string }[];
}) => {
  return (
    <TextField
      {...field}
      select
      label={label}
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
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
