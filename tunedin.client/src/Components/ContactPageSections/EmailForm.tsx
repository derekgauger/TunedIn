import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { emailSchema } from "./validations";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";

interface ContactFormValues {
  yourName: string;
  yourEmail: string;
  subject: string;
  message: string;
}

const initialValues: ContactFormValues = {
  yourName: "",
  yourEmail: "",
  subject: "",
  message: "",
};

const EmailForm: React.FC = () => {
  const [triedSubmit, setTriedSubmit] = useState(false);

  const handleSubmit = (
    values: ContactFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    console.log("Form submitted:", values);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
    }, 1000);
  };
  return (
    <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Send us a message
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={emailSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Box sx={{ pb: 1 }}>
              <Field
                as={TextField}
                fullWidth
                label="Your Name"
                name="yourName"
                error={triedSubmit && errors.yourName}
              />
              <ErrorMessage error={triedSubmit && errors.yourName} />
            </Box>
            <Box sx={{ pb: 1 }}>
              <Field
                as={TextField}
                fullWidth
                label="Your Email"
                name="yourEmail"
                type="email"
                error={triedSubmit && errors.yourEmail}
              />
              <ErrorMessage error={triedSubmit && errors.yourEmail} />
            </Box>
            <Box sx={{ pb: 1 }}>
              <Field
                as={TextField}
                fullWidth
                label="Subject"
                name="subject"
                error={triedSubmit && errors.subject}
              />
              <ErrorMessage error={triedSubmit && errors.subject} />
            </Box>
            <Box sx={{ pb: 1 }}>
              <Field
                as={TextField}
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={8}
                error={triedSubmit && errors.message}
              />
              <ErrorMessage error={triedSubmit && errors.message} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                onClick={() => setTriedSubmit(true)}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default EmailForm;