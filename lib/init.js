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
		console.log("init");
		
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
	