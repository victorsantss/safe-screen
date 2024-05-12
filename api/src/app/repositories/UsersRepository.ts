const db = require('../../database');

interface User {
  name: string;
  email: string;
  hashedPassword: string;
}

class UsersRepository {
  static async signup({ name, email, hashedPassword }: User) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      RETURNING *
      `, [name, email, hashedPassword]);
    return row;
  }

  static async validateEmail(email: string) {
    const [row] = await db.query(`
      SELECT id
      FROM USERS
      WHERE email=$1
      `, [email]);
    return row;
  }
}

export default UsersRepository;

