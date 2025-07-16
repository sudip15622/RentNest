"use client";
import React from "react";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from "@mui/material";

const SelectWithoutLabel = ({
  field,
  error,
  options,
  placeholder,
}: {
  field: any;
  error: any;
  options: string[];
  placeholder: string;
}) => {
  return (
    <FormControl fullWidth size="small" error={!!error}>
      <MuiSelect
        {...field}
        displayEmpty
        error={!!error}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: !error ? "#bab9b6" : undefined,
            borderRadius: "8px"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: !error ? "#a16207" : undefined,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: !error ? "#a16207" : undefined,
          },
          "& .MuiSelect-select": {
            color: field.value ? "#313330" : "#5f5e5e",
            backgroundColor: "transparent",
          },
          "& .MuiSvgIcon-root": {
            color: field.value ? "#313330" : "#5f5e5e",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#f2f1ed",
              border: "1px solid #bab9b6",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "& .MuiMenuItem-root": {
                color: "#313330",
                "&:hover": {
                  backgroundColor: "#f3e8ab",
                },
                "&.Mui-selected": {
                  backgroundColor: "#f3e8ab",
                //   color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#f3e8ab",
                  },
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "transparent",
                },
              },
            },
          },
          autoFocus: false,
        }}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && (
        <div className="text-red-500 text-xs mt-1">{error.message}</div>
      )}
    </FormControl>
  );
};

export default SelectWithoutLabel;
