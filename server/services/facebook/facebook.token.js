var FB = require('fb'),

/*Get facebook application access token*/
FB.api('oauth/access_token', {
	client_id: 'app_id',
	client_secret: 'app_secret',
	grant_type: 'client_credentials'
	}, function (res) {
		if(!res || res.error) {
			console.log(!res ? 'error occurred' : res.error);
			return;
		}
		var accessToken = res.access_token;
});

/*Exchange code for access token*/
FB.api('oauth/access_token', {
	client_id: 'app_id',
	client_secret: 'app_secret',
	redirect_uri: 'http://yoururl.com/callback',
	code: 'code'
	}, function (res) {
		if(!res || res.error) {
			console.log(!res ? 'error occurred' : res.error);
			return;
		}

		var accessToken = res.access_token;
		var expires = res.expires ? res.expires : 0;
});
