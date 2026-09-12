import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler, notFound } from './middleware/error.middleware';
import taskRoutes from './routes/task.routes';

const app: Application = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Swagger Documentation
(app.use as any)('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpec);
});

// API Info endpoint
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    name: 'Task Management API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: '/api/tasks',
  });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
