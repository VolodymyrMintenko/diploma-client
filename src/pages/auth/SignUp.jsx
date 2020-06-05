import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isLoggedIn } from "./reducer/selectors";
import { authSignup } from "./reducer/actions";

import { Container, Paper, Link, Button } from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import signupValidationSchema from "services/validation/signinValidationSchema";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";

import "./index.scss";
import PasswordField from "components/forms/PasswordField";
import TextField from "components/forms/TextField";

function Auth({ isLoggedIn, authSignup }) {
  useDocumentTitle("Регистрация");
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  const onSubmit = async values => {
    await authSignup(values);
  };
  return (
    <div className="layout__form-bg">
      <Container maxWidth="xs" className="auth__container">
        <Paper className="auth__card">
          <h2>Registration</h2>
          <Formik
            initialValues={{ login: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={signupValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="login" label="Login" component={TextField} />
                <Field name="password" component={PasswordField} />
                <div className="auth__submit-container">
                  <div>
                    <Link
                      type="button"
                      disabled={isSubmitting}
                      component={RouterLink}
                      to="/signin"
                    >
                      Already have an account?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="auth__login-btn"
                    disabled={isSubmitting}
                  >
                    Registration
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: isLoggedIn(auth)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authSignup
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
