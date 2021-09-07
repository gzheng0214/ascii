import React from "react";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Ascii Saver</title>
      </Head>

      <div>
        <Navbar user={user} />
        {children}
      </div>
    </>
  );
};

export default Layout;
