import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import campaignValidationSchema from "services/validation/campaignValidationSchema";
import TextField from "components/forms/TextField";
import { postCampaign } from "../../reducer/actions";
import { useHistory } from "react-router";

const CreateCampaignForm = ({ postCampaign, onCancel, focusDelay }) => {
  let textInput = null;

  const history = useHistory();
  const onSubmit = async values => {
    await postCampaign(values, { redirectAfterCreate: true, history });
  };
  const onKeyDown = e => {
    if (e.key === "Escape") {
      onCancel();
    }
  };
  useEffect(() => {
    if (textInput) {
      setTimeout(textInput.focus.bind(textInput), focusDelay || 0);
    }
  }, [textInput, focusDelay]);
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={onSubmit}
      validationSchema={campaignValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form onKeyDown={onKeyDown}>
          <Field
            name="name"
            label="Room name"
            fullWidth={false}
            InputProps={{
              inputRef: input => {
                textInput = input;
              }
            }}
            component={TextField}
          />
          <IconButton
            type="submit"
            aria-label="Create"
            color="primary"
            disabled={isSubmitting}
          >
            <DoneIcon />
          </IconButton>
          <IconButton type="button" aria-label="Cancel" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postCampaign
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(CreateCampaignForm);
