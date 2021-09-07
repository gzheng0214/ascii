import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as styles from "../styles/Login.module.css";
import Button from "@material-ui/core/Button";
import { register } from "../utils/authUser";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
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
    setLoading(true);
    await register(user, handleError, setLoading);
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            name="email"
            disabled={loading}
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="name">name</InputLabel>
          <Input
            id="name"
            name="name"
            disabled={loading}
            type="text"
            value={user.name}
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
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
