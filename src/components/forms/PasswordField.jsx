import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { getIn } from "formik";

function PasswordField({ field, form, InputProps, label }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const displayError = error && touch;
  return (
    <FormControl fullWidth>
      <InputLabel error={displayError} htmlFor={field.name}>
        {label}
      </InputLabel>
      <Input
        id={field.name}
        error={displayError}
        aria-describedby={`${field.name}-helper-text`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        {...InputProps}
        {...field}
        type={showPassword ? "text" : "password"}
      />
      <FormHelperText id={`${field.name}-helper-text`} error={displayError}>
        {displayError ? form.errors[field.name] : ""}
      </FormHelperText>
    </FormControl>
  );
}

PasswordField.defaultProps = {
  field: {},
  InputProps: {},
  form: { errors: {}, touched: {} },
  label: "Password"
};

export default PasswordField;
