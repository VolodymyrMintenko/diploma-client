import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import { getIn } from "formik";

function TextField({
  field,
  form,
  InputProps,
  label,
  InputLabelProps,
  inputProps,
  fullWidth
}) {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const displayError = error && touch;
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel
        error={displayError}
        htmlFor={field.name}
        {...InputLabelProps}
      >
        {label}
      </InputLabel>
      <Input
        id={field.name}
        error={displayError}
        aria-describedby={`${field.name}-helper-text`}
        inputProps={inputProps}
        {...InputProps}
        {...field}
      />
      <FormHelperText id={`${field.name}-helper-text`} error={displayError}>
        {displayError ? error : ""}
      </FormHelperText>
    </FormControl>
  );
}

TextField.defaultProps = {
  field: {},
  InputProps: {},
  form: { errors: {}, touched: {} },
  label: "",
  fullWidth: true
};

export default TextField;
