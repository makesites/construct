(function(e,s){if("object"==typeof exports){var t=require("jquery.three"),n=require("backbone.app");module.exports=s(t,n)}else if("function"==typeof define&&define.amd)define(["jquery.three","backbone.app"],s);else{var r=$||e.jQuery||e.ender;s(r,e._,e.Backbone,e.APP)}})(this,function(e,s,t){APP.Meshes={},APP.Sprites={},construct=function(){this.loop=[],construct.callback&&construct.callback(),options.deps&&e.extend(!0,construct.config,options.deps),require.config(construct.config);var s=new APP;return window.app=s,t.history.start(),s},construct.init=function(e){construct.callback=e},construct.register=function(e){e&&e.update&&this.loop.push(e.update)},construct.configure=function(){},construct.update=function(){},construct.config={paths:{jquery:["//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min","/assets/js/lib/jquery.min"],json2:["//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.min","/assets/js/lib/json2.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min","/assets/js/lib/underscore-min"],handlebars:["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min","/assets/js/lib/handlebars.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min","/assets/js/lib/backbone-min"],"three.js":["//cdnjs.cloudflare.com/ajax/libs/three.js/r53/three.min","/assets/js/lib/three.min"],"backbone.app":["https://raw.github.com/makesites/backbone-app/master/build/backbone.app","/assets/js/lib/backbone.app"],"jquery.three":["https://raw.github.com/makesites/jquery-three/master/build/jquery.three","/assets/js/lib/jquery.three"]},shim:{jquery:{deps:["json2"]},underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},"backbone.app":{deps:["backbone","underscore","jquery"]},"jquery.three":{deps:["jquery","three.js"]},"construct.input":{deps:["construct"]},"construct.editor":{deps:["construct"]}}},APP.Models.User=APP.Model.extend({defaults:{admin:!0}}),APP.Models.Asset=APP.Model.extend({defaults:{x:0,y:0,editable:!0}}),APP.Collections.Users=APP.Collection.extend({}),APP.Collections.Assets=APP.Collection.extend({}),APP.Mesh=t.View.extend({preRender:function(){},render:function(){},postRender:function(){},update:function(){}}),APP.Meshes.Static=APP.Mesh.extend({}),APP.Meshes.Dynamic=APP.Meshes.Static.extend({}),APP.Meshes.Avatar=APP.Meshes.Dynamic.extend({}),APP.Meshes.NPC=APP.Meshes.Avatar.extend({}),APP.Meshes.Player=APP.Meshes.Avatar.extend({}),APP.Sprite=t.View.extend({}),APP.Sprites.Static=APP.Sprite.extend({}),APP.Sprites.Animated=APP.Sprite.extend({}),APP.Views.Asset=APP.View.extend({}),APP.Routers.User=APP.Router.extend({initialize:function(){}})});