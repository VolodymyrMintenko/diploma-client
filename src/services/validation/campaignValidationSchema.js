import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Minimum title length 4 characters.")
    .required("Enter a name for the campaign."),
});

export default schema;
