import * as Yup from "yup";

export const emailSchema = Yup.object().shape({
  yourName: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  yourEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});