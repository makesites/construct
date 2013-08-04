/* Helper methods */
/* consider prefixing with _  ? */


construct.loop = [];

// simple batch processor of all update events
construct.update = function( fn ){
	// stack middleware


};

// output status messages
// inspired by the l10n handlebars helper: https://gist.github.com/tracend/3261055
construct.log = function( type, key ){
	//prerequisites
	if(!type || !key) return;
	// find language
	// make this a config option? (to avoid repeat lookups)
	var lang = (navigator.language) ? navigator.language : navigator.userLanguage;

	// pick the right dictionary - rever to the passed type/key
	var string = locale[lang][type][key] || locale['en-US'][type][key] || type +": "+ key;

	// check if console.log exists first?

	//output
	console.log(string);

};


construct.promise = new Promise();
