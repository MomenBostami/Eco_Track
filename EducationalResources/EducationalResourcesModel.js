const { getConnection } = require('../db');

class EducationalResourcesModel {
  async create(resourceData) {
    try {
      const { title, content, timestamp } = resourceData;

      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO educational_resources (title, content, timestamp) VALUES (?, ?, ?)',
        [title, content, timestamp]
      );
      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllResources() {
    try {
      const connection = await getConnection();
      const [resources] = await connection.execute('SELECT * FROM educational_resources');
      connection.end();
      return resources;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EducationalResourcesModel;
