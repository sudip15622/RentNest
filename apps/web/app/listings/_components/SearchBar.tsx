"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" size={16} />
      </div>
      <TextField
            // {...field}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            size="medium"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                paddingLeft: "30px",
                "&:hover fieldset": {
                  borderColor: "#a16207",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a16207",
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
    </div>
  );
}
