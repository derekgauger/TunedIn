import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { emailSchema } from "./validations";
import ErrorMessage from "../GeneralComponents/ErrorMessage/ErrorMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import GenericTextField from "../GeneralComponents/GenericTextField";
import { DARK } from "../../Utils/colors";
import { EmailSettings } from "../../Utils/types";
import { enqueueSnackbar } from "notistack";
import { sendTemplatedEmail } from "../../Functions/email";
import { useUser } from "../../Hooks/useUser";
import { useLocation } from "react-router";

interface EmailFormProps {
    toEmail: string | undefined;
    onSendEmail?: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ toEmail, onSendEmail }) => {
    const [triedSubmit, setTriedSubmit] = useState(false);
    const location = useLocation();
    const { user } = useUser();

    // Create initial values once when component mounts or when user changes
    const getInitialValues = (): EmailSettings => ({
        name: user ? `${user.firstName} ${user.lastName}` : "",
        email: user ? (user.verifiedEmail ? user.email : "") : "",
        subject: "",
        body: "",
    });

    const handleSubmit = (
        values: EmailSettings,
        { setSubmitting, resetForm }: FormikHelpers<EmailSettings>
    ) => {
        const emailParameters = {
            Subject: values.subject,
            Body: values.body,
            SenderName: values.name,
            SenderEmail: values.email,
        };
        if (!toEmail) {
            enqueueSnackbar("Failed to send email. Please try again later.", {
                variant: "error",
            });
            return;
        }
        sendTemplatedEmail("contact", toEmail, emailParameters).then(
            (response) => {
                if (response.error) {
                    enqueueSnackbar(
                        "Failed to send email. Please try again later.",
                        {
                            variant: "error",
                        }
                    );
                } else {
                    resetForm();
                    if (onSendEmail) {
                        onSendEmail();
                    }
                    if (location.pathname === "/contact") {
                        enqueueSnackbar(
                            "Email sent successfully! Thank you for contacting us!",
                            {
                                variant: "success",
                            }
                        );
                    } else {
                        enqueueSnackbar("Email sent successfully!", {
                            variant: "success",
                        });
                    }
                }
                setSubmitting(false);
            }
        );
    };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                height: "100%",
                backgroundColor: DARK ? "secondary.light" : "white",
            }}
        >
            {}
            {location.pathname === "/contact" && (
                <GenericSectionText text="Send us a message" type="Header" />
            )}
            <Formik
                initialValues={getInitialValues()}
                validationSchema={emailSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <Box sx={{ pb: 1, pt: 2 }}>
                            <Field
                                as={GenericTextField}
                                fullWidth
                                label="Your Name"
                                name="name"
                                error={triedSubmit && errors.name}
                                isDark={DARK}
                            />
                            <ErrorMessage error={triedSubmit && errors.name} />
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <Field
                                as={GenericTextField}
                                fullWidth
                                label="Your Email"
                                name="email"
                                type="email"
                                error={triedSubmit && errors.email}
                                isDark={DARK}
                            />
                            <ErrorMessage error={triedSubmit && errors.email} />
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <Field
                                as={GenericTextField}
                                fullWidth
                                label="Subject"
                                name="subject"
                                error={triedSubmit && errors.subject}
                                isDark={DARK}
                            />
                            <ErrorMessage
                                error={triedSubmit && errors.subject}
                            />
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <Field
                                as={GenericTextField}
                                fullWidth
                                label="Message"
                                name="body"
                                multiline
                                rows={8}
                                error={triedSubmit && errors.body}
                                isDark={DARK}
                            />
                            <ErrorMessage error={triedSubmit && errors.body} />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 2,
                            }}
                        >
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
