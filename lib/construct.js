// main lib

construct = function( options ){
	
	// extend default config with supplied config
	if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
	 
	require.config( construct.config );
	
	// execute any config options passed in the init()
	construct.promise.resolve();
	//if( construct.callback ) construct.init();
	
	// initialize APP
	var app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();
	
	return app;
		
};

construct.loop = [];

construct.init = function(){
	// execute when construct is initialized
	console.log("init");
	
	construct.promise.resolve();
};
	
// stack middleware to be used
construct.register = function( fn ){
	
	// add things in the loop (if necessary)
	if(fn && fn.update){
		construct.loop.push( fn.update );
	}
	
};

// initial setup
construct.configure = function( fn ){
	
	// validate function? 
	construct.promise.add( fn );
	
};

// simple batch processor of all update events
construct.update = function( fn ){
	// stack middleware
	
	
};

construct.promise = new Promise();
