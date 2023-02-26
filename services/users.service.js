/* eslint-disable no-useless-catch */
const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');

class UsersService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { id } = query;
    if (id) {
      options.where.id = id;
    }

    const { name } = query;
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` };
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true;

    const users = await models.Users.findAndCountAll(options);
    return users;
  }

  async createAuthUser(obj) {
    const transaction = await models.sequelize.transaction();
    try {
      obj.id = uuid4();
      obj.password = hashPassword(obj.password);
      let newUser = await models.Users.create(obj, {
        transaction,
        fields: [
          'id',
          'first_name',
          'last_name',
          'password',
          'email',
          'username',
        ],
      });

      let publicRole = await models.Roles.findOne(
        { where: { name: 'public' } },
        { raw: true }
      );

      let newUserProfile = await models.Profiles.create(
        { user_id: newUser.id, role_id: publicRole.id },
        { transaction }
      );

      await transaction.commit();
      return newUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAuthUserOr404(id) {
    let user = await models.Users.scope('auth_flow').findByPk(id, {
      raw: true,
    });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }
  // /:id
  static async getUserByToken(token){
    try {
      const result = await models.Users.findOne({
        where:{
          token:token
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserFromAnotherUser(id) {
    let user = await models.Users.findByPk(id, {
      attributes: ['first_name', 'last_name', 'image_url'],
    });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }
  
  static async getUserById(id){
    let user = await models.Users.findByPk(id, {
      attributes: {
        exclude:['token','password']
      }
    });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }


  // static async getVotesUser(id){
  //   let user = await models.Votes.findAll({
   
  //   })
  //   if (!user) throw new CustomError('Not found User', 404, 'Not Found');
  //   return user;
  // }

  static async getVotesUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await models.Votes.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await models.Users.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async filterUserByFirstName(first_name) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          first_name: first_name,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async filterUserByLastName(last_name) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          last_name: last_name,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async filterUserByEmail(email) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          email: email,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async filterUserByUsername(username) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          username: username,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async filterUserByCreatedAt(created_at) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          created_at: created_at,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async filterUserByUpdatedAt(updated_at) {
    // eslint-disable-next-line no-useless-catch
    try {
      let users = await models.Users.findAll({
        where: {
          updated_at: updated_at,
        },
        attributes: {
          exclude: [
            'password',
            'email_verified',
            'token',
            'code_phone',
            'phone',
            'country_id',
            'image_url',
          ],
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  async findUserByEmailOr404(email) {
    if (!email) throw new CustomError('Email not given', 400, 'Bad Request');
    let user = await models.Users.findOne({ where: { email } }, { raw: true });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }

  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let updatedUser = await user.update(obj, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      await user.destroy({ transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async setTokenUser(id, token) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let updatedUser = await user.update({ token }, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeTokenUser(id) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      await user.update({ token: null }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async verifiedTokenUser(id, token, exp) {
    const transaction = await models.sequelize.transaction();
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request');
      if (!token)
        throw new CustomError('Not token provided', 400, 'Bad Request');
      if (!exp) throw new CustomError('Not exp exist', 400, 'Bad Request');

      let user = await models.Users.findOne({
        where: {
          id,
          token,
        },
      });
      if (!user)
        throw new CustomError(
          'The user associated with the token was not found',
          400,
          'Invalid Token'
        );
      if (Date.now() > exp * 1000)
        throw new CustomError(
          'The token has expired, the 15min limit has been exceeded',
          401,
          'Unauthorized'
        );
      await user.update({ token: null }, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updatePassword(id, newPassword) {
    const transaction = await models.sequelize.transaction();
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request');
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let restoreUser = await user.update(
        { password: hashPassword(newPassword) },
        { transaction }
      );
      await transaction.commit();
      return restoreUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UsersService;
