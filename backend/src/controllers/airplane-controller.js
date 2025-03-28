const { AirplaneService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

const createAirplane = async(req, res)=> {

    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.data = airplane
        return res.status(StatusCodes.CREATED).json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)

    }
}

const getAirplanes = async(req,res)=>{
    try {
        const airplanes = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplanes
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const getAirplane = async(req,res)=>{
    try {
        const {id} = req.params
        const airplane = await AirplaneService.getAirplane(id)
        SuccessResponse.data = airplane
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


const destroyAirplane = async(req,res)=>{
    try {
        const {id} = req.params
        const response = await AirplaneService.destroyAirplane(id)
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const updateAirplane = async(req,res)=>{
    try {
        const {id} = req.params
        const airplane = await AirplaneService.updateAirplane(id,{
            modelNumber : req.body.modelNumber,
            capacity: req.body.capacity,
            
        })
        
        
        SuccessResponse.data = airplane
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}