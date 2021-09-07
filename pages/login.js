import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as styles from "../styles/Login.module.css";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { login } from "../utils/authUser";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleError = (errorMsg) => {
    toast.error(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(user, handleError, setLoading);
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            name="email"
            disabled={loading}
            value={user.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={handleChange}
            name="password"
            disabled={loading}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </form>
      <span className={styles.text}>
        Don't have an account? <Link href="/register">Register here</Link>
      </span>
    </div>
  );
};

export default LoginPage;
