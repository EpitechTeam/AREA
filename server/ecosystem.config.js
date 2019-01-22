module.exports = {
	apps : [
		{
			name: "AREA",
			script: "./index.js",
			env_production: {
				"NODE_ENV": "production",
				"PORT": 443
			},
			env_dev: {
				"NODE_ENV": "development",
				"PORT": 8080
			},
		},
	]
}
