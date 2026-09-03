const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CAB System API',
      version: '1.0.0',
      description: 'API Documentation for Online Cab Booking Platform - Vo Tat Thien 22652711',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server (v1)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/modules/**/*.routes.js'] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
