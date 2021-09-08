import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import * as styles from "./navbar.module.css";
import Link from "next/link";
import { logout } from "../../utils/authUser";
import { useRouter } from "next/router";

const Navbar = ({ user }) => {
  const router = useRouter();

  const isActive = (route) => {
    return router.pathname === route;
  };
  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        {!user ? (
          <>
            <Link href="/login">
              <Button
                color="inherit"
                className={isActive("/login") ? styles.active : ""}
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                color="inherit"
                className={isActive("/register") ? styles.active : ""}
              >
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <Button
                color="inherit"
                className={isActive("/") ? styles.active : ""}
              >
                Convert
              </Button>
            </Link>
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
