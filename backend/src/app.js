import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the backend API!');
// });
app.use('/api/v1/students', studentRoutes)

export default app;