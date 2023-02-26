const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, getVotes } = require('../controllers/users.controller');
const {isAdmin} = require('../middlewares/role.middleware');
const passport = require('../libs/passport');

//const authMiddleware = require('../middlwares/auth.middleware');

/**
 * @openapi
 * /api/v1/users/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: filtrar usuarios
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: busqueda por nombre 
 *       - in: query
 *         name: last_name
 *         schema:
 *           type: string
 *         description: busqueda por apellido
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: busqueda por email
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: busqueda por username
 *       - in: query
 *         name: created_at
 *         schema:
 *           type: string
 *         description: busqueda por dia de creado
 *       - in: query
 *         name: updated_at
 *         schema:
 *           type: string
 *         description: busqueda por dia de creado
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getUserByFirstName'
 *       401:
 *         description: error de autorizacion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       404:
 *         description: error de autorizacion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userNotFound'
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: buscar usuario por id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: busqueda por ID
 *     responses:
 *       200:
 *         description: respuesta si es el mismo usuario es que consulta la informacion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-ID-200-by-user'
 *       207:
 *         description: respuesta si otro usuario consulta la informacion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-ID-200-by-other-user'
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response-login-400'
 */

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getAllUsers);

router.get('/:id'  , passport.authenticate('jwt', { session: false }),getUserById);

router.get('/:id/votes',  getVotes);

//router.get('/:id/publications',  getUserById);

//router.put("/users/:id", authMiddleware, updateUser);



module.exports = router;