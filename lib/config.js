
// Dependencies

construct.config = {
	"paths": {
		"jquery": [
			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"
		],
		"json3": [
			"//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
		],
		"three-js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/master/build/backbone.app"
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
			]
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
