'use strict';
const {
  Model
} = require('sequelize');

/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Francisco
 *         last_name:
 *           type: string
 *           example: garcia
 *         email:
 *           type: string
 *           example: franciscoExample@mail.com
 *         password:
 *           type: string
 *           example: 1234
 *     response-register-201:
 *       type: object
 *       properties:
 *         results:
 *           type: string
 *           example: Sucess Sing Up
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               errorName: 
 *                 type: string
 *                 example: ""
 *               message:
 *                 type: string
 *                 example: ""
 *     response-register-409:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: int
 *           example: 409
 *         name:
 *           type: string
 *           example: "SequelizeUniqueConstraintError"
 *         message:
 *           type: string
 *           example: "llave duplicada viola restricción de unicidad «users_email_key»"
 *         errors:
 *           type: array
 *           example: []
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: example@mail.com
 *         password:
 *           type: string
 *           example: 123445567789
 *     response-login-200:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Correct Credencials!
 *         token:
 *           type: string
 *           example: sasasaaa
 *     response-login-400:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: error
 *     forget-password:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: example@mail.com
 *     response-forget-password-200:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Email sended!, check your inbox"
 *     response-forget-password-400:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Error"
 *     change-password:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: "contraseña1234"
 *     response-change-password-200:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Succes Update"
 *     response-change-password-400:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: error
 *     response-me-200:
 *       type: object
 *       properties:
 *         result:
 *           type: object
 *           properties:
 *             id:
 *               type: int
 *               example: 2345123
 *             first_name:
 *               type: string
 *               example: Juana
 *             last_name:
 *               type: string
 *               example: De Arco
 *             email:
 *               type: string
 *               example: example@mail.com
 *             username:
 *               type: string
 *               example: example@mail.com
 *             image_url:
 *               type: string
 *               example: null
 *             porfiles:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: 6
 *                   user_id:
 *                     type: int
 *                     example: 21312312
 *                   role:
 *                     type: int
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     example: "2023-02-09T23:32:03.233Z"
 *                   updated_at:
 *                     type: string
 *                     example: "2023-02-09T23:32:03.233Z"
 *     response-me-400:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: error
 *     getUserByFirstName:
 *       type: object
 *       properties:
 *         results:
 *           type: object
 *           properties:
 *             count:
 *               type: int
 *               example: 1
 *             toltalPages:
 *               type: int
 *               example: null
 *             currentPage:
 *               type: int
 *               example: null
 *             results:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: '12312-45345-6563'
 *                   first_name:
 *                     type: string
 *                     example: juanita
 *                   last_name:
 *                     type: string
 *                     example: la huerfanita
 *                   email:
 *                     type: string
 *                     example: anita@mail.com
 *                   username:
 *                     type: string
 *                     example: anita@mail.com
 *                   created_at:
 *                     type: string
 *                     example: 2023-02-21T05:27:57.808Z
 *                   updated_at:
 *                     type: string
 *                     example: 2023-02-21T05:27:57.808Z
 *     error401:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: token invalid
 *         message:
 *           type: string
 *           example: nesesitas ser administrador
 *     userNotFound:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: 'Not Found'
 *         message:
 *           type: string
 *           example: 'Not Found User'
 *     response-ID-200-by-user:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "94264fb3-d028-4a20-x390-f0c7a6f460w"
 *         first_name:
 *           type: string
 *           example: martin
 *         last_name:
 *           type: string
 *           example: gonzales
 *         email:
 *           type: string
 *           example: example@mail.com
 *         username:
 *           type: string
 *           example: example@mail.com
 *         email_verified:
 *           type: string
 *           example: null
 *         code_phone:
 *           type: string
 *           example: null
 *         country_id:
 *           type: int
 *           example: 1
 *         image_url:
 *           type: string
 *           example: null
 *         created_at:
 *           type: string
 *           example: "2023-02-23T22:13:56.922Z"
 *         updated_at:
 *           type: string
 *           example: "2023-02-23T22:13:56.922Z"
 *     response-ID-200-by-other-user:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: paul
 *         last_name:
 *           type: string
 *           example: martin
 *         image_url:
 *           type: string
 *           example: null
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })
      Users.hasMany(models.Profiles, { as: 'profiles', foreignKey: 'user_id' })
    }
  }
  
  Users.init({
    id: {    type:DataTypes.UUID,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email_verified: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.TEXT
    },
    code_phone: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING
    },
    country_id: DataTypes.INTEGER,
    image_url: {
      type: DataTypes.STRING 
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {attributes: ['id', 'first_name', 'last_name', 'country_id', 'image_url']},
      view_same_user: {attributes: ['id', 'first_name', 'last_name', 'country_id', 'image_url','email', 'username', 'code_phone', 'phone']},
      auth_flow: {attributes: ['id', 'first_name', 'last_name', 'email', 'username',]},
      view_me: {attributes: ['id', 'first_name', 'last_name', 'email', 'username','image_url']}
    },
    hooks: {
      beforeCreate: (user, options) => {
        if (user.email){
          let emailLowercase = String(user.email).toLocaleLowerCase()
          user.email = emailLowercase
          user.username = emailLowercase
        }
      }
    }
  });
  return Users;
};