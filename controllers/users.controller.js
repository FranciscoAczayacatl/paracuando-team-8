const UsersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  try {
    //requerimos de los querys params para hacer el filtrado
    const {first_name,last_name, email, username, created_at, updated_at} = req.query;
    // setencia if para ver que query requerimos
    if (first_name) {
      //buscamos en nombre y utilizamos el servicio para ello 
      const findByFirstName= await UsersService.filterUserByFirstName(first_name);
      //conteo de los resultados
      const count=findByFirstName.length;
      //repuesta
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByFirstName
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    } else if (last_name){
      const findByLastName= await UsersService.filterUserByLastName(last_name);
      const count=findByLastName.length;
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByLastName
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    }else if (email){
      const findByEmail= await UsersService.filterUserByEmail(email);
      const count=findByEmail.length;
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByEmail
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    }
    else if (username){
      const findByUsername= await UsersService.filterUserByUsername(username);
      const count=findByUsername.length;
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByUsername
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    }
    else if (created_at){
      const findByCreatedAt= await UsersService.filterUserByCreatedAt(created_at);
      const count=findByCreatedAt.length;
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByCreatedAt
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    }else if (updated_at){
      const findByUpdatedAt= await UsersService.filterUserByUpdatedAt(updated_at);
      const count=findByUpdatedAt.length;
      if (count>0) {
        res.status(200).json(
          {
            results:{
              count:count,
              totalPages:null,
              currentPage:null,
              results: findByUpdatedAt
            }
          });
      } else {
        res.status(404).json(
          {
            error: 'Not Found',
            message: 'User Not Found'
          });
      }
    }else{
      res.status(400).json(
        {
          error: 'Not Found',
          message: 'not Fount'
        });
    }
    // res.status(200).json(findByFirstName);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user=req.user.id;
    if(id===user){
      const result = await UsersService.getUserById(id);
      res.status(200).json(result);
    }else{
      const result = await UsersService.getUserFromAnotherUser(id);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getVotes = async ( req, res) => {
  try {
      const result = await UsersService.getVotesUser();
      res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getVotes,
};
