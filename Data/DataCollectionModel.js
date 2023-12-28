const { getConnection } = require('../db');

class DataCollectionModel {
  async create(locationData) {
    try {
      const { timestamp, location,value ,userID} = locationData;

      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO temperatures (timestamp, location,value,userId) VALUES (?, ?,?,?)',
        [timestamp, location,value,userID]
      );
      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }

  

  async createAirQuality(locationData) {
    try {
      const { timestamp, location,value,userId } = locationData;

      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO airqualitys (timestamp, location,value,userid) VALUES (?, ?,?,?)',
        [timestamp, location,value,userId]
      );
      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }


  async getAllAirQuality() {
    try {
      const connection = await getConnection();
      const [airQualityData] = await connection.execute(`
        SELECT airqualitys.*, test.username
        FROM airqualitys
        JOIN test ON airqualitys.userId = test.id
      `);
      connection.end();
      return airQualityData;
    } catch (error) {
      throw error;
    }
  }
  





  async getAllInfo() {
    try {
      const connection = await getConnection();
      const [info] = await connection.execute(`
        SELECT temperatures.*, test.username
        FROM temperatures
        JOIN test ON temperatures.userId = test.id
      `);
      connection.end();
      return info;
    } catch (error) {
      throw error;
    }
  }
  


}


module.exports = DataCollectionModel;
