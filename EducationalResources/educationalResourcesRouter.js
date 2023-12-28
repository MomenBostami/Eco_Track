const express = require('express');
const EducationalResourcesModel = require('./EducationalResourcesModel');

const router = express.Router();
const educationalResources = new EducationalResourcesModel();


router.post('/create-resource', async (req, res) => {
  try {
    const timestamp = new Date().getTime();
    const { title, content } = req.body;

   
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    
    await educationalResources.create({ title, content, timestamp });
    res.status(201).json({ message: 'Educational resource created successfully' });
  } catch (error) {
    console.error('Error storing educational resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/get-resources', async (req, res) => {
  try {
    const resources = await educationalResources.getAllResources();
    res.json(resources);
  } catch (error) {
    console.error('Error retrieving educational resources:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
