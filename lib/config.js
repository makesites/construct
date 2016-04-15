
// setup custom config
construct.config = function( custom ){
	utils.extend(config, custom);
};

var config = {
	init: {
		router: false
	},
	/* dependency loader */
	require: {
		deps: []
	}
};

/* OLD: config:
{
	"paths": {
		"jquery": [
			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery"
		],
		"json3": [
			"//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone"
		],
		"three-js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/0.9.4/build/backbone.app"
		],
		"jquery.three": [
			"//rawgithub.com/makesites/jquery-three/master/build/jquery.three"
		]
	},
	"shim": {
		"jquery": {
			"deps": [
				"json3"
			]
		},
		"underscore": {
			"exports": "_"
		},
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"backbone.app": {
			"deps": [
				"backbone",
				"underscore",
				"jquery"
			],
			"exports": "APP"
		},
		"three-js": {
			"exports": "THREE"
		},
		"jquery.three": {
			"deps": [
				"jquery",
				"three-js"
			]
		}
	},
	"deps": ["backbone.app", "jquery.three", "handlebars"]

};
*/
