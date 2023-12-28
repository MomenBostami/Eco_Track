const express = require('express');
const DataCollectionModel = require('./DataCollectionModel');

const router = express.Router();
const dataCollection = new DataCollectionModel();

const jwt = require('jsonwebtoken');



router.post('/createTemp/:userId', async (req, res) => {
  try {
    const timestamp = new Date().getTime();
    const userID =req.params.userId;
    const {  location,value } = req.body;


    if (!location) {
      return res.status(400).json({ error: 'Timestamp and location are required' });
    }

    // Create the location
    await dataCollection.create({ timestamp, location,value,userID });
    res.status(201).json({ message: 'Location created successfully' });
  } catch (error) {
    console.error('Error storing location:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getTemp', async (req, res) => {
  try {
    const info = await dataCollection.getAllInfo();
    res.json(info);
  } catch (error) {
    console.error('Error retrieving locations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/create-air/:userId', async (req, res) => {
    try {
      const timestamp = new Date().getTime();
      const userId =req.params.userId;
      const {  location,value } = req.body;
  
     
      if (!location) {
        return res.status(400).json({ error: 'Timestamp and location are required' });
      }
  
      await dataCollection.createAirQuality({ timestamp, location,value,userId });
      res.status(201).json({ message: 'Location created successfully' });
    } catch (error) {
      console.error('Error storing location:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  router.get('/get-air', async (req, res) => {
    try {
      const info = await dataCollection.getAllAirQuality();
      res.json(info);
    } catch (error) {
      console.error('Error retrieving locations:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
