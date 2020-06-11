import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { isLoggedIn } from "pages/auth/reducer/selectors";
import { getUser } from "../campaigns/reducer/actions";
import Spinner from "../../components/Spinner";
import NotFound from "pages/notFound";
import QuizHTML from "./components/QuizHtml";

function User({
    match,
    getUser,
    isLoading,
    isLoggedIn,
  }) {
    useDocumentTitle("Lesson");
    useEffect(() => {
      getUser(match.params.id);
    }, [match, getUser]);
  
    if (isLoading) {
      return (
        <section>
          <Spinner />
        </section>
      );
    }
    return (
        <section>
              <QuizHTML />  
        </section>
      );
    }
    const mapStateToProps = ({ auth, user }) => ({
        isLoggedIn: isLoggedIn(auth),
        isLoading: user.isLoading,
        user: user.user,
      });
      
      const mapDispatchToProps = dispatch =>
        bindActionCreators(
          {
            getUser,
          },
          dispatch
        );
        export default connect(mapStateToProps, mapDispatchToProps)(User);  