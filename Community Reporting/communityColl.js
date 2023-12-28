const { getConnection } = require('../db');

class CommunityColl {
  async createReport(reportData) {
    try {
      const { type, description, location, timestamp, userId } = reportData;

      const connection = await getConnection();

      
      const [result] = await connection.execute(
        'INSERT INTO reports (type, description, location, timestamp, userId) VALUES (?, ?, ?, ?, ?)',
        [type, description, location, timestamp, userId]
      );

      
      await connection.execute('UPDATE test SET score = score + 1 WHERE id = ?', [userId]);

      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }




  async getAllReports() {
    try {
      const connection = await getConnection();
      const [reports] = await connection.execute('SELECT * FROM reports');
      connection.end();
      return reports;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommunityColl;
