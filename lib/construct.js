// main lib
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

//construct = new Construct();
