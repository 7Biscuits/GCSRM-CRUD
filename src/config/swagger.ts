import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'CRUD REST API for Task Management using Node.js, Express, MongoDB, and TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local development server',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '65f02c611488c03565f49d9c',
            },
            title: {
              type: 'string',
              example: 'Complete recruitment task',
            },
            description: {
              type: 'string',
              example: 'Implement CRUD API in Node.js, Express, MongoDB, TypeScript',
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
              example: 'pending',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: '2026-10-01T12:00:00.000Z',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        CreateTaskInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              example: 'task title',
            },
            description: {
              type: 'string',
              example: 'task description',
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
              default: 'pending',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              example: '2026-10-15T00:00:00.000Z',
            },
          },
        },
        UpdateTaskInput: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Updated task title',
            },
            description: {
              type: 'string',
              example: 'Updated task description',
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    paths: {
      '/api/tasks': {
        post: {
          summary: 'Create a new task',
          tags: ['Tasks'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateTaskInput',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Task created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ApiResponse',
                  },
                },
              },
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        get: {
          summary: 'Fetch all tasks',
          tags: ['Tasks'],
          parameters: [
            {
              in: 'query',
              name: 'status',
              schema: {
                type: 'string',
                enum: ['pending', 'in_progress', 'completed'],
              },
              description: 'Filter tasks by status',
            },
            {
              in: 'query',
              name: 'title',
              schema: {
                type: 'string',
              },
              description: 'Filter tasks by title substring',
            },
          ],
          responses: {
            '200': {
              description: 'List of tasks',
            },
          },
        },
      },
      '/api/tasks/{id}': {
        get: {
          summary: 'Retrieve a task by ID',
          tags: ['Tasks'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'MongoDB ObjectId',
            },
          ],
          responses: {
            '200': {
              description: 'Task found',
            },
            '400': {
              description: 'Invalid task ID format',
            },
            '404': {
              description: 'Task not found',
            },
          },
        },
        put: {
          summary: 'Update a task by ID',
          tags: ['Tasks'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'MongoDB ObjectId',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateTaskInput',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Task updated successfully',
            },
            '400': {
              description: 'Validation error or invalid ID',
            },
            '404': {
              description: 'Task not found',
            },
          },
        },
        delete: {
          summary: 'Delete a task by ID',
          tags: ['Tasks'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'MongoDB ObjectId',
            },
          ],
          responses: {
            '200': {
              description: 'Task deleted successfully',
            },
            '400': {
              description: 'Invalid task ID format',
            },
            '404': {
              description: 'Task not found',
            },
          },
        },
      },
      '/api/tasks/title/{title}': {
        get: {
          summary: 'Retrieve a task by title',
          tags: ['Tasks'],
          parameters: [
            {
              in: 'path',
              name: 'title',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Exact title to search (case-insensitive)',
            },
          ],
          responses: {
            '200': {
              description: 'Task found',
            },
            '404': {
              description: 'Task not found',
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
