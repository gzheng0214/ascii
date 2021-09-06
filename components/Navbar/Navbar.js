import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import * as styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Link href="/login">
          <Button color="inherit">Login</Button>
        </Link>
        <Link href="/register">
          <Button color="inherit">Register</Button>
        </Link>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
