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

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="text"
            value={user.username}
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
        <Button color="primary" variant="contained">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
