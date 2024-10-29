import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { notificationTypes } from './constants';


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
            {notificationTypes.map(({ id, label, description }) => (
            <div key={id} className='mb-2'>
              <FormControlLabel
              control={
                <Checkbox
                checked={!!preferences[id]}
                onChange={() => handlePreferenceChange(id)}
                name={id}
                />
              }
              label={label}
              />
              {description && (
              <Typography variant="body2" color="textSecondary" style={{ marginLeft: 32 }}>
                {description}
              </Typography>
              )}
            </div>
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