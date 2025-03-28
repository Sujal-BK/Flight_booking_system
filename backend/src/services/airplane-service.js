const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app.error');

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    const airplane = await airplaneRepository.create(data)
    return airplane;
  } catch (error) {
    if (error.name == 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError('Cannot create a new Airplane object', StatusCodes.BAD_REQUEST)
    }
    throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR)

  }
}

const getAirplanes = async () => {
  try {
    const airplanes = await airplaneRepository.getAll()
    return airplanes;
  } catch (error) {
    throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getAirplane = async (id) => {
  try {
    const airplane = await airplaneRepository.get(id)

    return airplane
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError('The airplane you requested is not Found', error.statusCode)
    }
    throw new AppError('Cannot fetch data of the airplane by it`s ID', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}


const destroyAirplane = async (id) => {
  try {
    const response = await airplaneRepository.destroy(id);
    return response
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError('The airplane you requested to delete is not Found', error.statusCode)
    }
    throw new AppError('Cannot delete data of airplane', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}


const updateAirplane = async(id,data)=>{
  try {
   
    const airplane = await airplaneRepository.update(id,data)
    return airplane
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError('The airplane you requested to update is not Found', error.statusCode)
    }
    throw new AppError('Cannot update data of airplane', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
}