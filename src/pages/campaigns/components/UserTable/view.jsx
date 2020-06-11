import React from "react";
import "./user.scss"
import UsersTable from "./index";

const EnterUser = () => {

  // TODO: use web sockets to determine when new campaign is activated and add it to the top of the capmaigns list
  return (
    <div className="user">
      <h1>Users</h1>
      <UsersTable />
    </div>
  );
};

export default EnterUser;