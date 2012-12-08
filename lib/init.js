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

	} else {
		var jquery = $ || root.jQuery || root.ender;
		// Browser globals
		factory(jquery, root._, root.Backbone, root.APP);
	}
}(this, function ($, _, Backbone) {

{{{lib}}}

}));
