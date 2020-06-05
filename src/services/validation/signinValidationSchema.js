import * as yup from "yup";

const schema = yup.object().shape({
  login: yup.string().min(4, "Minimum login length 4 characters."),
  password: yup.string().min(4, "The minimum password length is 4 characters."),
});

export default schema;
