import { backendUrl } from "../constants/constants";
import Router from "next/router";
import cookie from "js-cookie";

export const register = async (user, handleError, setLoading) => {
  try {
    const res = await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data;
    if (!res.ok) {
      data = await res.text();
      throw new Error(data);
    }
    data = await res.json();
    setToken(data);
  } catch (e) {
    const errorMsg = getErrorMessage(e);
    console.log(errorMsg);
    handleError(errorMsg);
  }
  setLoading(false);
};

export const login = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await fetch(`${backendUrl}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      data = await res.text();
      throw new Error(data);
    }
    data = await res.json();
    setToken(data);
  } catch (e) {
    const errorMsg = getErrorMessage(e);
    console.log(errorMsg);
    setError(errorMsg);
  }
  setLoading(false);
};

const getErrorMessage = (e) => {
  let errorMsg;
  if (e.response) {
    errorMsg = e.response.data;
  } else if (e.request) {
    errorMsg = e.request;
  } else {
    errorMsg = e.message;
  }
  return errorMsg;
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};
