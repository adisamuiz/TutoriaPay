import config from './env.config.js';
import pg from 'pg';

const {Pool} = pg;
const pool = new Pool({
    connectionString: config.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
export default pool;