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
let outlook       = require('./routes/outlook')
let one_drive       = require('./routes/one-drive')

let config = require(path.resolve(path.resolve(__dirname)  + '/config/index.js'))
let port = config.PORT

// Connect to DB
try {
	mongoose.connect("mongodb://" + "fluorz:lecherbonnier1@ds127321.mlab.com:27321/area" , { useNewUrlParser: true })
}
catch (err) {
	console.log("Erreur of connection")
	stop();
}

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "dev-server") {
	server = app.listen(port, () => {console.log( "Express server listening on port " + port)})
} else {
	app.get("/", (req, res) => {
		res.redirect('https://' + req.headers.host + req.url)
	})

	const privateKey 	= fs.readFileSync('/etc/letsencrypt/live/leo-lecherbonnier.fr/privkey.pem', 'utf8')
	const certificate 	= fs.readFileSync('/etc/letsencrypt/live/leo-lecherbonnier.fr/cert.pem', 'utf8')
	const ca 			= fs.readFileSync('/etc/letsencrypt/live/leo-lecherbonnier.fr/fullchain.pem', 'utf8')

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	}

	const server = https.createServer(credentials, app)

	server.listen(port || 443, () => {
		console.log('HTTPS Server running on port 443')
	})
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
app.use('/', facebook)
app.use('/', twitter)
app.use('/', one_drive)
app.use('/', outlook)
app.use('/', intra)
app.use('/', calendar)
app.use('/', meteo)

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
