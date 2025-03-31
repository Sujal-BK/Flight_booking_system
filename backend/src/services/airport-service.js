const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");

const airportRepository = new AirportRepository()

const createAirport = async(data)=>{
    try {
        const airport = await airportRepository.create(data)
        return airport
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explanation = []
            error.errors.forEach((err)=>{
                explanation.push(err)
            })
            throw new AppError('Cannot create a new Airport object', StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getAirports = async()=>{
    try {
        const airports = await airportRepository.getAll()
        return airports
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR)
  
    }
}

const getAirport = async(id)=>{
    try {
        const airport = await airportRepository.get(id)
        return airport
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not Found', error.statusCode)
          }
          throw new AppError('Cannot fetch data of the airport by it`s ID', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const destroyAirport = async (id) => {
    try {
      const response = await airportRepository.destroy(id);
      return response
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError('The airport you requested to delete is not Found', error.statusCode)
      }
      throw new AppError('Cannot delete data of airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
  
  
  const updateAirport = async(id,data)=>{
    try {
     
      const airport = await airportRepository.update(id,data)
      return airport
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError('The airport you requested to update is not Found', error.statusCode)
      }
      throw new AppError('Cannot update data of airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}