"use client";
import React from "react";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

const SocialButton = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  
  const handleGoogleLogin = () => {
    // Create state parameter with redirect info
    const state = btoa(JSON.stringify({ redirectTo }));
    const url = `http://localhost:8000/auth/google/login?state=${encodeURIComponent(state)}`;
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
        borderRadius: "8px",
        color: "#313330",
        "&:hover": {
          borderColor: "#a16207",
          backgroundColor: "#f3e8ab",
        },
      }}
    >
      Continue with Google
    </Button>
  );
};

export default SocialButton;
