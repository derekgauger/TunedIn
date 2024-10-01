import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

const notificationTypes = [
  { id: 'email', label: 'Email Notifications' },
  { id: 'push', label: 'Push Notifications' },
  { id: 'sms', label: 'SMS Notifications' },
  { id: 'inApp', label: 'In-App Notifications' },
  { id: 'updates', label: 'Product Updates' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'marketing', label: 'Marketing Communications' },
  { id: 'security', label: 'Security Alerts' },
];

interface NotificationPreferencesModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (preferences: Record<string, boolean>) => void;
  initialPreferences?: Record<string, boolean>;
}

const NotificationPreferencesModal: React.FC<NotificationPreferencesModalProps> = ({ open, onClose, onConfirm, initialPreferences }) => {
  const [preferences, setPreferences] = useState(initialPreferences || {});

  const handlePreferenceChange = (id : string) => {
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleConfirm = () => {
    onConfirm(preferences);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
      <DialogTitle>Notification Preferences</DialogTitle>
      <DialogContent>
        <Typography variant="body1" className="mb-4">
          Choose the types of notifications you'd like to receive:
        </Typography>
        <FormGroup>
          {notificationTypes.map(({ id, label }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={!!preferences[id]}
                  onChange={() => handlePreferenceChange(id)}
                  name={id}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" sx={{ bgcolor: 'primary.main' }}>Save Preferences</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationPreferencesModal;