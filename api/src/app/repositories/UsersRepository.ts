const db = require('../../database');

interface User {
  name: string;
}

class UsersRepository {
  static async create({ name }: User) {
    const [row] = await db.query(`
      INSERT INTO users(name)
      VALUES($1)
      RETURNING *
      `, [name]);
    return row;
  }
}

export default UsersRepository;

