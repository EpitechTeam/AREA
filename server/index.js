let server, serverHttp

let express    	= require("express")
let morgan     	= require("morgan")
let path				= require("path")

let app         = express()
let bodyParser  = require("body-parser")
let compression = require('compression')
let mongoose    = require("mongoose")
let https       = require("https")
let fs					= require("fs")

let users       = require('./routes/user')
let facebook       = require('./routes/facebook')
let calendar       = require('./routes/calendar')
let meteo       = require('./routes/meteo')
let intra       = require('./routes/intra')
let twitter       = require('./routes/twitter')
let lemonde       = require('./routes/lemonde')
let nasa       = require('./routes/nasa')
let outlook       = require('./routes/outlook')
let one_drive       = require('./routes/one-drive')
let office365       = require('./routes/office365')
let request			= require('request');
let Robot	= require('./services/user/robot')

let newRobot = new Robot.Robot()

setInterval(newRobot.refreshAllUser, 30000)

let config = require(path.resolve(path.resolve(__dirname)  + '/config/index.js'))
let port = config.PORT

// Connect to DB
try {
	mongoose.connect("mongodb://" + "fluorz:lecherbonnier1@ds349065.mlab.com:49065/area" , { useNewUrlParser: true })
}
catch (err) {
	console.log("Erreur of connection")
	stop();
}

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "dev-server") {
	server = app.listen(port, () => {console.log( "Express server listening on port " + port)})
} else {
	server = app.listen(process.env.PORT, () => {console.log( "Express server listening on port " + process.env.PORT)})
}

app.use(compression())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(morgan("tiny"))

app.use('/public/', express.static("./src/public/"));
app.use('/assets/', express.static("./src/assets/"));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
	next()
})

app.use('/', users)
app.use('/facebook', facebook)
app.use('/twitter', twitter)
app.use('/one_drive', one_drive)
app.use('/outlook', outlook)
app.use('/intra', intra)
app.use('/calendar', calendar)
app.use('/meteo', meteo)
app.use('/lemonde', lemonde)
app.use('/nasa', nasa)
app.use('/', office365)

process.on('uncaughtException', err => {
	console.log(err)
})

app.get('/', (req, res) => {
	res.json("AREA API V1.0")
})

function stop() {
    server.close()
}

module.exports = app
module.exports.stop = stop
