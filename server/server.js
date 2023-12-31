require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const {jsdocConfig} = require('./config/jsdocConfig')
const mongoose = require('mongoose')
const swaggerUI = require("swagger-ui-express")

const PORT = process.env.PORT || 3500

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(jsdocConfig));

app.use('/', express.static(path.join(__dirname, 'public')))

//All the route lists
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/problems', require('./routes/problemRoutes'))
app.use('/competitions', require('./routes/competitionRoutes'))
app.use('/translation', require('./routes/translationRoutes'))
app.use('/submissions', require('./routes/submissionRoutes'))
app.use('/announcements', require('./routes/announcementRoutes'))
app.use('/scoreboard', require('./routes/scoreboardRoutes'))

//404 not found
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}\nSwagger UI is running on http://localhost:3500/api-docs'`));
   
})

  

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
