
// Dependencies
construct.config = {
	"paths": {
		"jquery": [
			"//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min"
		],
		"json2": [
			"//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min"
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
		"three.js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/0.9.0/build/backbone.app-min"
		],
		"jquery.three": [
			"//rawgithub.com/makesites/jquery-three/master/build/jquery.three"
		]
	},
	"shim": {
		"jquery": {
			"deps": [
				"json2"
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
				"three.js"
			]
		},
		"construct.input": {
			"deps": [
				"construct"
			]
		},
		"construct.editor": {
			"deps": [
				"construct"
			]
		}
	}
};
