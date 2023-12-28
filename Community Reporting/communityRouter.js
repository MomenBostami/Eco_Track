const express = require('express');
const CommunityColl = require('./communityColl');

const communityRouter = express.Router();
const communityColl = new CommunityColl();

communityRouter.post('/report-issue/:userId', async (req, res) => {
  try {
    const { type, description, location } = req.body;
    const userId = req.params.userId
    const timestamp = new Date().getTime();

    
    if (!type || !description || !location) {
      return res.status(400).json({ error: 'Type, description, and location are required' });
    }

    
    await communityColl.createReport({ type, description, location, timestamp,userId });
    res.status(201).json({ message: 'Issue reported successfully' });
  } catch (error) {
    console.error('Error reporting issue:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

communityRouter.get('/get-community-reports', async (req, res) => {
    try {
      const reports = await communityColl.getAllReports();
      res.json(reports);
    } catch (error) {
      console.error('Error retrieving community reports:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = communityRouter;
