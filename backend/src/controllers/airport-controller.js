const { AirportService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

const createAirport = async(req, res)=> {

    try {
        const airport = await AirportService.createAirport({
           name : req.body.name,
           code : req.body.code,
           address : req.body.address,
           cityId : req.body.cityId
        })
        SuccessResponse.data = airport
        return res.status(StatusCodes.CREATED).json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)

    }
}

const getAirports = async(req,res)=>{
    try {
        const airports = await AirportService.getAirports()
        SuccessResponse.data = airports
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const getAirport = async(req,res)=>{
    try {
        const {id} = req.params
        const airport = await AirportService.getAirport(id)
        SuccessResponse.data = airport
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


const destroyAirport = async(req,res)=>{
    try {
        const {id} = req.params
        const response = await AirportService.destroyAirport(id)
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const updateAirport = async(req,res)=>{
    try {
        const {id} = req.params
        const airport = await AirportService.updateAirport(id,{
            name : req.body.name,
            code : req.body.code,
            address : req.body.address,
            cityId : req.body.cityId
            
        })
        
        
        SuccessResponse.data = airport
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}