import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { getUsers } from "../../reducer/actions";
import { isLoggedIn } from "pages/auth/reducer/selectors";
import Spinner from "components/Spinner";
import DataTable from "components/DataTable";
import { useHistory } from "react-router";

const UsersTable = ({
  isLoading,
  getUsers,
  users
}) => {
  const history = useHistory();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoading) {
    return <Spinner />;
  }

  const onUserClick = login => () => {
      history.push(`/users/${login}`);
  };
  console.log(users);
  const rows = users.map(({ id, login}) => ({
    login,
    props: {
      hover: true,
      onClick: onUserClick(login)
    },
  }));
  console.log(users);
  const headerData = [
    {
      key: "login",
      label: "Users",
      cellProps: { component: "th" }
    },
  ];
  
  return <DataTable rows={rows} headerData={headerData} keyPropName="login" />;
};

const mapStateToProps = ({ auth, campaigns }) => ({
    isLoggedIn: isLoggedIn(auth),

    users: campaigns.users,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        getUsers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
