
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
		//console.log("init");
		
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
	