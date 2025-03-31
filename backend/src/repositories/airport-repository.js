const CrudRepository = require('./CRUD-repository')
const {Airport} = require('../models')

class AirportRepository extends CrudRepository {
    constructor(){
        super(Airport)
    }
}

module.exports = AirportRepository