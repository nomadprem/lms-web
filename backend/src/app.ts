import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import { createUserRoutes } from './routes/user.routes';
import { createCourseRoutes } from './routes/course.routes';
import { createAssignmentRoutes } from './routes/assignment.routes';

dotenv.config();
console.log(`Environment>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: ${process.env.NODE_ENV}`);
console.log(`Database URL: ${process.env.DATABASE_PASSWORD}`);

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));
app.use(bodyParser.json());

// Initialize DB
initializeDatabase();

// Routes
app.use('/api/users', createUserRoutes());
app.use('/api/courses', createCourseRoutes());
app.use('/api/assignments', createAssignmentRoutes());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
