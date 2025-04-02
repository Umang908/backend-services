const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend-as-a-Service API",
      version: "1.0.0",
      description: "This is a simple Backend-as-a-Service (BaaS) API",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
