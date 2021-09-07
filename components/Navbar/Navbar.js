import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import * as styles from "./navbar.module.css";
import Link from "next/link";
import { logout } from "../../utils/authUser";

const Navbar = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        {!user ? (
          <>
            {" "}
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register">
              <Button color="inherit">Register</Button>
            </Link>{" "}
          </>
        ) : (
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
