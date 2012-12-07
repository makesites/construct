/* 
 * Construct.js : Constructor
 * 
 * @author Makis Tracend
 * @cc_on Copyright © 2012 Makesites.org
 *
 * @license Dual-licensed under the MPL and AGPL: 
 * http://github.com/constructjs/construct/LICENSE
 */

(function(){
		
	config = {
		"callback": function(){ init();}, 
		"paths": {
			"jquery": [
				"http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
				"/assets/js/lib/5jquery.min"
			],
			"json2": [
				"http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.min",
				"/assets/js/lib/json2.min"
			],
			"underscore": [
				"http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min",
				"/assets/js/lib/underscore-min"
			],
			"handlebars": [
				"http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min",
				"/assets/js/lib/handlebars.min"
			],
			"backbone": [
				"http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min",
				"/assets/js/lib/backbone-min"
			],
			"backbone.app": [
				"/assets/js/libs/backbone.app-min"
			],
			"jquery.three": [
				"/assets/js/libs/jquery.three-min"
			],
			"dat.gui": [
				"http://cdn.kdi.co/js/dat.gui/0.5/dat.gui.min"
			],
			"dat.color": [
				"http://cdn.kdi.co/js/dat.gui/0.5/dat.color.min"
			]
		},
		"shim": {
			"backbone": {
				"deps": [
					"underscore",
					"jquery"
				],
				"exports": "Backbone"
			},
			"underscore": {
				"exports": "_"
			}, 
			"backbone.app": {
				"deps": [
					"backbone",
					"underscore",
					"jquery",
					"handlebars"
				]
			},
			"jquery.three": {
				"deps": [
					"jquery"
				]
			}
		},
		"deps": [
			"jquery",
			"json2",
			"underscore",
			"backbone",
			"handlebars",
			"showdown",
			"backbone.app",
			"jquery.three"
		]
	};

})()

(function (root, factory) {
  if (typeof exports === 'object') {

    var jquery_three = require('jquery.three');
    var backbone_app = require('backbone.app');

    module.exports = factory(jquery_three, backbone_app);

  } else if (typeof define === 'function' && define.amd) {

    define(['jquery.three', 'backbone.app'], factory);

  } 
}(this, function ($, _, Backbone) {
	


	construct = function( config ){
		// containers
		this.loop = [];
		
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
		//console.log(&quot;init&quot;);
		
		construct.callback = fn;
	};
		
	// stack middleware to be used
	construct.register = function( fn ){
		
		// add things in a the loop (if necessary)
		if(fn.update){
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
	
	//construct = new Construct();
	
//require([&quot;backbone.app&quot;, &quot;jquery.three&quot;], function(){ 

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

//require([&quot;backbone.app&quot;, &quot;jquery.three&quot;], function(){ 


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
		// attach dat.gui view if editable &amp; user has admin rights
	});
	
	
	
//});

//require([&quot;backbone.app&quot;, &quot;jquery.three&quot;], function(){ 

	APP.Routers.User = APP.Router.extend({
		initialize: function(){
		
		}
	});
	
//});


 }))($ || window.jQuery || window.ender, _, Backbone);
