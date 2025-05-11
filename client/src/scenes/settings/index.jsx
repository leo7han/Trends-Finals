import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Checkbox,
  Slider,
  FormGroup,
  FormLabel
} from '@mui/material';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    // Data Refresh
    refreshInterval: 30,
    
    // Dashboard Configuration
    dashboardConfig: {
      showCharts: true,
      showTransactions: true,
      showPerformance: false,
      showGeography: true
    },
    
    // Export Settings
    exportPreferences: {
      format: 'csv',
      includeCustomers: true,
      includeTransactions: true,
      includeProducts: false
    },
    
    // Notifications
    notifications: {
      emailEnabled: true,
      appEnabled: true,
      frequency: 'daily',
      salesThreshold: 1000
    },
    
    // Analytics
    analytics: {
      advancedEnabled: false,
      samplingRate: 100,
      predictiveEnabled: false
    },
    
    // User Permissions
    permissions: {
      role: 'analyst',
      canExport: true,
      canEdit: false,
      canDelete: false
    },
    
    // System Performance
    system: {
      cacheEnabled: true,
      cacheDuration: 60,
      preloadData: true
    }
  });

  // Load settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Handle simple field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle nested object changes
  const handleNestedChange = (path, value) => {
    setSettings(prev => ({
      ...prev,
      [path[0]]: {
        ...prev[path[0]],
        [path[1]]: value
      }
    }));
  };

  // Handle array/object changes for permissions
  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  // Save all settings
  const handleSave = async () => {
    try {
      await axios.post('/api/settings', settings);
      alert('Settings saved successfully!');
      
      // Apply refresh interval immediately
      if (window.setRefreshInterval) {
        window.setRefreshInterval(settings.refreshInterval * 1000);
      }
      
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h2" textAlign="center" sx={{ mb: 4, fontWeight: '1000' }}>
        SETTINGS
      </Typography>

      {/* Data Refresh Settings */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Data Refresh</Typography>
        <TextField
          fullWidth
          type="number"
          label="Refresh Interval (seconds)"
          value={settings.refreshInterval}
          onChange={handleChange}
          name="refreshInterval"
          inputProps={{ min: 5, max: 3600 }}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.system.preloadData}
              onChange={(e) => handleNestedChange(['system', 'preloadData'], e.target.checked)}
            />
          }
          label="Preload Data on Startup"
        />
      </Paper>

      {/* Dashboard Configuration */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Dashboard Configuration</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.dashboardConfig.showCharts}
                onChange={(e) => handleNestedChange(['dashboardConfig', 'showCharts'], e.target.checked)}
              />
            }
            label="Show Charts"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.dashboardConfig.showTransactions}
                onChange={(e) => handleNestedChange(['dashboardConfig', 'showTransactions'], e.target.checked)}
              />
            }
            label="Show Transactions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.dashboardConfig.showPerformance}
                onChange={(e) => handleNestedChange(['dashboardConfig', 'showPerformance'], e.target.checked)}
              />
            }
            label="Show Performance Metrics"
          />
        </FormGroup>
      </Paper>

      {/* Export Settings */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Export Settings</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Export Format</InputLabel>
          <Select
            value={settings.exportPreferences.format}
            onChange={(e) => handleNestedChange(['exportPreferences', 'format'], e.target.value)}
            label="Export Format"
          >
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
          </Select>
        </FormControl>
        
        <Typography sx={{ mb: 1 }}>Include in Exports:</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.exportPreferences.includeCustomers}
                onChange={(e) => handleNestedChange(['exportPreferences', 'includeCustomers'], e.target.checked)}
              />
            }
            label="Customer Data"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.exportPreferences.includeTransactions}
                onChange={(e) => handleNestedChange(['exportPreferences', 'includeTransactions'], e.target.checked)}
              />
            }
            label="Transaction Data"
          />
        </FormGroup>
      </Paper>

      {/* Notification Settings */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Notifications</Typography>
        <FormGroup sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications.emailEnabled}
                onChange={(e) => handleNestedChange(['notifications', 'emailEnabled'], e.target.checked)}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications.appEnabled}
                onChange={(e) => handleNestedChange(['notifications', 'appEnabled'], e.target.checked)}
              />
            }
            label="In-App Notifications"
          />
        </FormGroup>
        
        <TextField
          fullWidth
          type="number"
          label="Sales Alert Threshold ($)"
          value={settings.notifications.salesThreshold}
          onChange={(e) => handleNestedChange(['notifications', 'salesThreshold'], e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth>
          <InputLabel>Notification Frequency</InputLabel>
          <Select
            value={settings.notifications.frequency}
            onChange={(e) => handleNestedChange(['notifications', 'frequency'], e.target.value)}
            label="Notification Frequency"
          >
            <MenuItem value="realtime">Realtime</MenuItem>
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Analytics Settings */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Analytics</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.analytics.advancedEnabled}
              onChange={(e) => handleNestedChange(['analytics', 'advancedEnabled'], e.target.checked)}
            />
          }
          label="Enable Advanced Analytics"
          sx={{ mb: 2 }}
        />
        
        {settings.analytics.advancedEnabled && (
          <>
            <Typography gutterBottom>Data Sampling Rate</Typography>
            <Slider
              value={settings.analytics.samplingRate}
              onChange={(e, value) => handleNestedChange(['analytics', 'samplingRate'], value)}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.analytics.predictiveEnabled}
                  onChange={(e) => handleNestedChange(['analytics', 'predictiveEnabled'], e.target.checked)}
                />
              }
              label="Enable Predictive Analytics"
            />
          </>
        )}
      </Paper>

      {/* User Permissions */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>User Permissions</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>User Role</InputLabel>
          <Select
            value={settings.permissions.role}
            onChange={(e) => handleNestedChange(['permissions', 'role'], e.target.value)}
            label="User Role"
          >
            <MenuItem value="admin">Administrator</MenuItem>
            <MenuItem value="analyst">Analyst</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
        
        {settings.permissions.role !== 'viewer' && (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.permissions.canExport}
                  onChange={handlePermissionChange}
                  name="canExport"
                />
              }
              label="Allow Data Export"
            />
            {settings.permissions.role === 'admin' && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settings.permissions.canEdit}
                      onChange={handlePermissionChange}
                      name="canEdit"
                    />
                  }
                  label="Allow Data Editing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settings.permissions.canDelete}
                      onChange={handlePermissionChange}
                      name="canDelete"
                    />
                  }
                  label="Allow Data Deletion"
                />
              </>
            )}
          </FormGroup>
        )}
      </Paper>

      {/* System Performance */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>System Performance</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.system.cacheEnabled}
              onChange={(e) => handleNestedChange(['system', 'cacheEnabled'], e.target.checked)}
            />
          }
          label="Enable Data Caching"
          sx={{ mb: 2 }}
        />
        
        {settings.system.cacheEnabled && (
          <TextField
            fullWidth
            type="number"
            label="Cache Duration (minutes)"
            value={settings.system.cacheDuration}
            onChange={(e) => handleNestedChange(['system', 'cacheDuration'], e.target.value)}
          />
        )}
      </Paper>

      <Button
        variant="contained"
        size="large"
        textAlign="center"
        onClick={handleSave}
        sx={{
          py: 2,
          px: 4,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        SAVE CHANGES
      </Button>
    </Box>
  );
};

export default SettingsPanel;