"use client";
import React from "react";
import { Button } from "@mui/material";

import { FcGoogle } from "react-icons/fc";

const SocialButton = () => {
  const handleGoogleLogin = () => {
    const url = `http://localhost:8000/auth/google/login`;
    window.location.href = url;
  };
  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outlined"
      fullWidth
      startIcon={<FcGoogle />}
      sx={{
        borderColor: "#bab9b6",
        color: "#313330",
        "&:hover": {
          borderColor: "#5849fc",
          backgroundColor: "#d3cff3",
        },
      }}
    >
      Continue with Google
    </Button>
  );
};

export default SocialButton;
