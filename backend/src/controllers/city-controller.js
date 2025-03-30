const { StatusCodes } = require("http-status-codes")
const { CityService } = require("../services")
const { SuccessResponse,ErrorResponse } = require("../utils/common")

const createCity = async (req, res) => {
    try {

        const city = await CityService.createCity({
            name: req.body.name
        })
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED).json(SuccessResponse)

    } catch (error) {

        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

const destroyCity = async(req,res)=>{
    try {
        const {id} = req.params
        const response = await CityService.destroyCity(id)
        SuccessResponse.data = response
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


const updateCity = async(req,res)=>{
    try {
        const {id} = req.params
        const city = await CityService.updateCity(id,{
            name : req.body.name
            
        })
        
        
        SuccessResponse.data = city
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
}