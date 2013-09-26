// main lib

construct = function( options, callback ){

	// extend default config with supplied config
	//if( options.require ) construct.config = $.extend( true, options.deps, construct.config);
	if( options.libs ) Object.extend(construct.config, options.libs);

	if( callback ) construct.callback = callback;

	if(typeof require != "undefined"){
		require.config( construct.config );
		require( construct.config.deps, construct.init);
		// set the init method
		//construct.config.init = construct.init;
	} else {
		// #9 proceeed if Require.js is not available...
		// prerequisites
		if( typeof Backbone == "undefined" ) return construct.log("error", "no-backbone");
		if( typeof jQuery == "undefined" ) return construct.log("error", "no-jquery");
		if( typeof jQuery.fn.three == "undefined" ) return construct.log("error", "no-jquery-three");
		// initiate
		construct.init();
	}

};

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");
	// execute any config options passed in the init()
	construct.promise.resolve();

	// initialize APP
	var app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();

	if( construct.callback ) construct.callback( app );
	//return app;

};
