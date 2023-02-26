const UsersService = require('../services/users.service'); 
const ProfilesService = require('../services/profiles.service'); 


const isAdmin = async (request, response, next) => {
  try {
    let { id } = request.user; 
    console.log(id);
    let existUser = await UsersService.getUser(id); // --> Si no existe, 404
    if (existUser) {
      let isSuperUser = await ProfilesService.isAdmin(id);
      if (isSuperUser.role_id===2) {
        return next();
      } else {
        response.status(401).json({
          error:'token invalid',
          message:'nesesitas ser administrador'
        })
      }
    }

  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
};
