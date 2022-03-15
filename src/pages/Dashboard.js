import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import TimeLine from "../components/TimeLine";
import useUser from "../hooks/useUser";
import LoggedInUserContext from "../context/LoggedInUser";

function Dashboard({ user: loggedInUser }) {
  const { user } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className=" bg-gray-background">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-3  sm:gap-4 justify-between mx-auto max-w-screen-lg px-2 ">
          <TimeLine />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default Dashboard;
