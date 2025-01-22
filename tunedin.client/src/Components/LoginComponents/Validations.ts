import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  loginIdentifier: Yup.string().required("Email or Username is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Username cannot contain spaces or special characters"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().matches(
    /^\(\d{3}\) \d{3}-\d{4}$/,
    "Phone number must be in the format (XXX) XXX-XXXX"
  ),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is required"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
