const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app.error');

const cityRepository = new CityRepository()

const createCity = async (data) => {
    try {
        const city = await cityRepository.create(data)
        return city;
    } catch (error) {
       
        if (error.name === 'SequelizeValidationError'||error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


const destroyCity = async(id) =>{
  try {
    const response = await cityRepository.destroy(id)
    return response

  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError('The city you requested to delete is not Found', error.statusCode)
      }
      throw new AppError('Cannot delete data of city', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}


const updateCity = async(id,data)=>{
    try {
    const city = await cityRepository.update(id,data)
    return city
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update is not Found', error.statusCode)
          }
          throw new AppError('Cannot update data of city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createCity,
    destroyCity,
    updateCity
}