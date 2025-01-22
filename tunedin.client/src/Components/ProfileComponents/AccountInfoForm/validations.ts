import * as Yup from "yup";

export const accountInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Username cannot contain spaces or special characters"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string(),
  goal: Yup.string().required("Fitness goal is required"),
});

export const initialAccountInfo = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  goal: "",
};
