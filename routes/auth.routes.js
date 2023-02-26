const express = require('express');
const router = express.Router();

const passport = require('../libs/passport');

const verifySchema = require('../schemas/joiSchema.checker');
const { signupSchema,forgetPasswordSchema,restorePasswordSchema } = require('../schemas/auth.schemas');

const { signUp, logIn,forgetPassword,restorePassword,userToken } = require('../controllers/auth.controller');

/**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: crear un nuevo usuario
 *     tags: [auth]
 *     requestBody:
 *       description: requiere campos para crear un nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       201:
 *         description: creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-register-201'
 *       409:
 *         description: llave duplicada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-register-409'
 * /api/v1/auth/login:
 *   post:
 *     summary: login
 *     tags: [auth]
 *     requestBody:
 *       description: requiere campos para hacer el logeo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-login-200'
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-login-400'
 * /api/v1/auth/forget-password:
 *   post:
 *     summary: forget-password
 *     tags: [auth]
 *     requestBody:
 *       description: requiere campos para hacer el cambio de contraseña
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forget-password'
 *     responses:
 *       200:
 *         description: creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-forget-password-200'
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-forget-password-400'
 * /api/v1/auth/change-password:
 *   post:
 *     summary: change-password
 *     tags: [auth]
 *     requestBody:
 *       description: requiere campos para hacer el cambio de contraseña
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/change-password'
 *     responses:
 *       200:
 *         description: creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-change-password-200'
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-change-password-400'
 * /api/v1/auth/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: el usario resive perfiles asociados a su cuenta
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-me-200'
 *       400:
 *         description: llave duplicada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-me-400'
 */


router.post('/login', logIn);

router.post('/sign-up', verifySchema(signupSchema, 'body'), signUp);

router.post('/forget-password', verifySchema(forgetPasswordSchema, 'body'), forgetPassword);

router.post('/change-password/:token', verifySchema(restorePasswordSchema, 'body'), restorePassword);



router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  userToken
); 

router.get(
  '/testing',
  passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
    try {
      return response.status(200).json({
        results: {
          user: request.user,
          isAuthenticated: request.isAuthenticated(),
          isUnauthenticated: request.isUnauthenticated(),
          _sessionManager: request._sessionManager,
          authInfo: request.authInfo,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
); 

module.exports = router
