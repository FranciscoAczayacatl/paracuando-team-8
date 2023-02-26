const swaggerJSDoc = require('swagger-jsdoc');



const options = {
  apis: [
    './routes/auth.routes.js',
    './database/models/users.js',
    './routes/users.routes.js',
  ],
  definition:{
    openapi: '3.0.0',
    info: {
      title: 'paracuando Api',
      version: '0.0.9',
      description: 'API para la plataforma paracuando'
    }
  }
}

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec;