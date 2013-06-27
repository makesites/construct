// Utils

// - Internal promise method...
var Promise = function(obj) {
	var args = null;
	var callbacks = [];
	var resolved = false;
	
	this.add = function(callback) {
		if (resolved) {
			callback.apply(obj, args);
		} else {
			callbacks.push(callback);
		}
	};
	
	this.resolve = function() {
		if (!resolved) {            
			args = arguments;
			resolved = true;
			
			var callback = callbacks.shift();
			while (callback) {
				callback.apply(obj, arguments);
				callback = callbacks.shift();
			}
			
			callbacks = null;
		}
	};
};
