const { getConnection } = require('../db');

class EnvironmentalAlertModel {
  async createAlert(alertData) {
    try {
      const { sensorType, location, thresholdForme } = alertData;

      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO alerts (sensorType, location, thresholdForme) VALUES (?, ?, ?)',
        [sensorType, location, thresholdForme]
      );
      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllAlerts() {
    try {
      const connection = await getConnection();
      const [alerts] = await connection.execute('SELECT * FROM alerts');
      connection.end();
      return alerts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EnvironmentalAlertModel;
