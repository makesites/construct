
// stack middleware to be used
construct.register = function( fn ){

	//fn();
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
