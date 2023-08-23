import * as Yup from "yup";

const SignUpFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .min(4, "Username must be at least 4 characters long."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email format."),
  password: Yup.string().required("Password is required."),
});

export default SignUpFormValidationSchema;
