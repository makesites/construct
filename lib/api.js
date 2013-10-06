
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

// extend language support
construct.lang = function( language ){
	// check language structure first...
	Object.extend(locale, language);
};

// options passed in construct through initialization or plugins
construct.options = {};