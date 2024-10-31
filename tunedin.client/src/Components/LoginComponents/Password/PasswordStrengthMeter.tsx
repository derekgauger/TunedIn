import { Box, LinearProgress, Typography } from "@mui/material";
import zxcvbn from "zxcvbn";
import { DARK } from "../../../Utils/colors";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const result = zxcvbn(password);
  const score = result.score; // score is 0-4

  const getProgressColor = (score: number) => {
    switch (score) {
      case 0:
        return "error";
      case 1:
        return "error";
      case 2:
        return "warning";
      case 3:
        return "info";
      case 4:
        return "success";
      default:
        return "primary";
    }
  };

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Very Weak";
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={(score + 1) * 20}
        color={getProgressColor(score)}
      />
      <Typography
        variant="caption"
        sx={{ mt: 0.5, display: "block", color: DARK ? "white" : "black" }}
      >
        Password strength: {getStrengthLabel(score)}
      </Typography>
      {result.feedback.warning && (
        <Typography variant="caption" color="error">
          {result.feedback.warning}
        </Typography>
      )}
    </Box>
  );
};

export default PasswordStrengthMeter;
