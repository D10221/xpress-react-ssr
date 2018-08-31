import { ViewState } from "./types";

export const STORE_KEY = "@tiny-auth/login";
const isWindow = typeof window !== "undefined";
export const defaultState: ViewState = {
  token: (isWindow && localStorage.getItem("token")) || "",
  busy: false,
  error: undefined,
  authenticated: false,
  success: false  
};