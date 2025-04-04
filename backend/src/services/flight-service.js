const { StatusCodes } = require("http-status-codes")
const { FlightRepository } = require("../repositories")
const AppError = require("../utils/errors/app.error")
const { Op } = require('sequelize')


const flightRepository = new FlightRepository()

const createFlight = async (data) => {
    try {
        const flight = await flightRepository.create(data)
        return flight
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            throw new AppError('Cannot create a new Flight object', StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getAllFlights = async (query) => {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice === undefined) ? 20000 : maxPrice)]
        }

    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map((param)=>param.split('_'));
        sortFilter =  sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter)
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getFlight = async(id)=>{
    try {
        const flight = await flightRepository.get(id)
        return flight
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not Found', error.statusCode)
          }
          throw new AppError('Cannot fetch data of the flight by it`s ID', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}