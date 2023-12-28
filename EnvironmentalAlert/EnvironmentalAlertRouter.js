const express = require('express');
const EnvironmentalAlertModel = require('./EnvironmentalAlertModel');

const router = express.Router();
const environmentalAlertModel = new EnvironmentalAlertModel();

router.post('/create-alert', async (req, res) => {
  try {
    const { sensorType, location, thresholdForme } = req.body;

    
    if (!sensorType || !location || !thresholdForme) {
      return res.status(400).json({ error: 'Sensor type, location, and thresholdForme are required' });
    }

    
    await environmentalAlertModel.createAlert({ sensorType, location, thresholdForme });
    res.status(201).json({ message: 'Environmental alert created successfully' });
  } catch (error) {
    console.error('Error storing environmental alert:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-alerts', async (req, res) => {
  try {
    const alerts = await environmentalAlertModel.getAllAlerts();
    res.json(alerts);
  } catch (error) {
    console.error('Error retrieving environmental alerts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
