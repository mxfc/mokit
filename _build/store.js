/*csd*/define(function(require,exports,module){"use strict";var a=require("./json");exports.dataCache={};exports.temp={set:function(b,c){exports.dataCache[b]=c;},get:function(b){return exports.dataCache[b];},remove:function(b){exports.dataCache[b]=null;},clear:function(){exports.dataCache={};}};exports.session={set:function(b,c){if(typeof sessionStorage!=="undefined"){sessionStorage.setItem(b,a.stringify(c));}exports.temp.set("sessionData:"+b,c);},get:function(b){var c=exports.temp.get(b);if(c==null){c=a.parse(sessionStorage.getItem(b));}return c;},remove:function(b){if(typeof sessionStorage!=="undefined"){sessionStorage.removeItem(b);}exports.temp.remove("sessionData:"+b);},clear:function(){if(typeof sessionStorage!=="undefined"){sessionStorage.clear();}exports.temp.clear();}};exports.local={set:function(b,c){if(typeof localStorage!=="undefined"){localStorage.setItem(b,a.stringify(c));}exports.temp.set("localData:"+b,c);},get:function(b){var c=exports.temp.get(b);if(c==null){c=a.parse(localStorage.getItem(b));}return c;},remove:function(b){if(typeof localStorage!=="undefined"){localStorage.removeItem(b);}exports.temp.remove("localData:"+b);},clear:function(){if(typeof localStorage!=="undefined"){localStorage.clear();}exports.temp.clear();}};});