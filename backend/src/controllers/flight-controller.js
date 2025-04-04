const { StatusCodes } = require("http-status-codes")
const { SuccessResponse,ErrorResponse } = require("../utils/common")
const { FlightService } = require("../services")

const createFlight = async (req, res) => {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        })
        SuccessResponse.data = flight
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const getAllFlights = async(req,res)=>{
    try {
        const flights = await FlightService.getAllFlights(req.query)
        SuccessResponse.data = flights
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const getFlight = async(req,res)=>{
    try {
        const {id} = req.params
        const flight = await FlightService.getFlight(id)
        SuccessResponse.data = flight
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}


