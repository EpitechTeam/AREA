let config;

if (process.env.NODE_ENV === 'development') {
	config = {
			PORT: 8080,
			SESSION_HASH: "uNZdUB77c4pLHZ9cw283jQnrKy36z78T",
			JWT_HASH: "shhhhh",
			REDIS_DB: 1
		}
}
else if (process.env.NODE_ENV === 'production') {
	config = {
			PORT: 443,
			SESSION_HASH: "uNZdUB77c4pLHZ9cw283jQnrKy36z78T",
			JWT_HASH: "shhhhh",
			REDIS_DB: 1
		}
}
else if (process.env.NODE_ENV === 'test') {
	config = {
			PORT: 444,
			SESSION_HASH: "uNZdUB77c4pLHZ9cw283jQnrKy36z78T",
			JWT_HASH: "shhhhh",
			REDIS_DB: 1
		}
}

module.exports = config
