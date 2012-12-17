/* 
 * Construct.js : Constructor
 * 
 * @author Makis Tracend
 * @cc_on Copyright © 2012 Makesites.org
 *
 * @license Dual-licensed under the MPL and AGPL: 
 * http://github.com/constructjs/construct/LICENSE
 */

(function (root, factory) {
	if (typeof exports === 'object') {
		
		var jquery_three = require('jquery.three');
		var backbone_app = require('backbone.app');
		
		module.exports = factory(jquery_three, backbone_app);
		
	} else if (typeof define === 'function' && define.amd) {
	
		define(['jquery.three', 'backbone.app'], factory);

	} else {
		var jquery = $ || root.jQuery || root.ender;
		// Browser globals
		factory(jquery, root._, root.Backbone, root.APP);
	}
}(this, function ($, _, Backbone) {


// extend APP namespace 
APP.Meshes = {};
APP.Sprites = {};
APP.Actors = {};


	construct = function( options ){
		// containers
		this.loop = [];
		
		// extend default config with supplied config
		if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
		 
		require.config( construct.config );
		
		// execute any config options passed in the init()
		if( construct.callback ) construct.callback();
		
		// initialize APP
		var app = new APP();
		window.app = app;
		// start backbone history
		Backbone.history.start();
		
		return app;
			
	};
	
	construct.init = function(fn){
		// execute when construct is initialized
		//console.log("init");
		
		construct.callback = fn;
	};
		
	// stack middleware to be used
	construct.register = function( fn ){
		
		// add things in a the loop (if necessary)
		if(fn && fn.update){
			this.loop.push( fn.update );
		}
		
	};
	
	construct.configure = function(){
		// initial setup
		
	};
	
	// simple batch processor of all update events
	construct.update = function( fn ){
		// stack middleware
		
		
	};
	
	// Dependencies
	construct.config = {
		"paths": {
			"jquery": [
				"//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
				"/assets/js/lib/jquery.min"
			],
			"json2": [
				"//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.min",
				"/assets/js/lib/json2.min"
			],
			"underscore": [
				"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min",
				"/assets/js/lib/underscore-min"
			],
			"handlebars": [
				"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min",
				"/assets/js/lib/handlebars.min"
			],
			"backbone": [
				"//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min",
				"/assets/js/lib/backbone-min"
			],
			"three.js": [
				"//cdnjs.cloudflare.com/ajax/libs/three.js/r53/three.min",
				"/assets/js/lib/three.min"
			],
			"backbone.app": [
				"https://raw.github.com/makesites/backbone-app/master/build/backbone.app", 
				"/assets/js/lib/backbone.app"
			],
			"jquery.three": [
				"https://raw.github.com/makesites/jquery-three/master/build/jquery.three", 
				"/assets/js/lib/jquery.three"
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
	
	//construct = new Construct();
	
//require(["backbone.app", "jquery.three"], function(){ 

	APP.Models.User = APP.Model.extend({
		defaults: {
			admin : true
		}
	});
	
	APP.Models.Asset = APP.Model.extend({
		defaults: {
			x : 0,
			y : 0, 
			editable : true
		}
	});
	
	APP.Collections.Users = APP.Collection.extend({
	});
	
	APP.Collections.Assets = APP.Collection.extend({
	});
	
//});

//require(["backbone.app", "jquery.three"], function(){ 


	APP.Mesh = Backbone.View.extend({ 
	
		preRender: function(){
			
		}, 
		render: function(){
			
		}, 
		postRender: function(){
			
		}, 
		update: function(){
			// executed on every tick 
			
		}
		
	});
	
	/* extending Mesh */
	APP.Meshes.Static = APP.Mesh.extend({
	});
	
	APP.Meshes.Dynamic = APP.Meshes.Static.extend({
		
	});
	
	
	APP.Meshes.Avatar = APP.Meshes.Dynamic.extend({
	});
	
	
	/* extending Avatar */
	APP.Meshes.NPC = APP.Meshes.Avatar.extend({
	});
	
	
	APP.Meshes.Player = APP.Meshes.Avatar.extend({
	});
	
	
	APP.Sprite = Backbone.View.extend({
	});
	
	
	/* extending Sprite */
	APP.Sprites.Static = APP.Sprite.extend({
	});
	
	APP.Sprites.Animated = APP.Sprite.extend({
	});
	
	
	
	
	APP.Views.Asset = APP.View.extend({
	
		// user jquery-three for rendering
		// attach dat.gui view if editable & user has admin rights
	});
	
	
	
//});

//require(["backbone.app", "jquery.three"], function(){ 
	
	
	/*
	APP.Routers.User = APP.Router.extend({
		initialize: function(){
		
		}
	});
	*/
	
//});


}));
