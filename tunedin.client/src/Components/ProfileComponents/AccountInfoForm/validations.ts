import * as Yup from "yup";


export const accountInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().matches(/^[0-9+\-() ]+$/, "Invalid phone number"),
  goal: Yup.string().required("Fitness goal is required"),
});