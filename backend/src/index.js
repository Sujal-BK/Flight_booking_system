const express = require('express')

const { ServerConfig,Logger } = require('./config')

const app = express()

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is listening on port ${ServerConfig.PORT}`);
    
})