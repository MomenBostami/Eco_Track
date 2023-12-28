const bcrypt = require('bcrypt');
const { getConnection } = require("../db");

class UserModel {
  constructor() {
    this.tableName = 'test';
  }

  async create(userData) {
    try {
      
      this.validateUserData(userData);

      
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      
      const connection = await getConnection();

      const [result] = await connection.execute(
        `INSERT INTO ${this.tableName} (email, username, password, age, gender,score) VALUES (?, ?, ?, ?, ?,0)`,
        [userData.email, userData.username, hashedPassword, userData.age, userData.gender]
      );

      connection.end();

      return result;
    } catch (error) {
      throw error;
    }
  }

  validateUserData(userData) {
    if (!userData.email || !userData.username || !userData.password || !userData.age || !userData.gender) {
      throw new Error('All fields are required');
    }

    

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    

    return true;
  }

  isValidEmail(email) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async findByEmail(email) {
    try {
      const connection = await getConnection();
      const [users] = await connection.execute('SELECT * FROM test WHERE email = ?', [email]); 
      connection.end();
      return users[0] || null;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UserModel;
