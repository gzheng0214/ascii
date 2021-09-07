import React, { useEffect } from "react";

const HomePage = ({ user }) => {
  useEffect(() => {
    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);
  return <div>hi</div>;
};

export default HomePage;
