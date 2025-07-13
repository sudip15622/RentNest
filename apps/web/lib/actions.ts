"use server"

import { createPageAuthFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";

const profileAuthFetch = createPageAuthFetch('/profile');

export const getProfile = async() => {
    const response = await profileAuthFetch(`${BACKEND_URL}/user/profile`);
    const result = await response.json();
    return result;
}