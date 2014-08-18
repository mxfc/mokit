/*csd*/define(function(require,exports,module){"use strict";exports.mokit={version:"2.0 Beta 31",author:"Houfeng"};var e=require("./console"),m=require("./route"),h=require("./event"),p=require("./utils"),j=require("./model"),q=require("./view"),f=require("./controller"),i=require("./language"),n=require("./style"),c=require("./ajax"),o=require("./transitions"),a=require("./jquery"),k=require("./navigation");exports.route=m;exports.language=i;exports.style=n;exports.console=e;exports.utils=p;exports.model=j;exports.view=q;exports.controller=f;exports.ajax=c;exports.onstart=h.create(exports,"onStart");var l=function(r){var s={"route":r};exports.onStart.trigger(s);return !s.cancel;};var g=null;var d=function(u,r,t){if(g){u.route.effect=u.route.effect||[0,0];var s=(t&&g)?g.route.effect[1]:u.route.effect[0];o.change(g.rootView,u.rootView,s,function(){g.rootView.remove();g.rootView=null;delete g.rootView;g=null;g=u;if(r){r();}},{container:q.rootContainer});}else{g=u;if(r){r();}}};var b=function(t,r){if(o.isAnimating()){return;}var s=m.getRoute(t);if(!s){return e.error(t+" not found");}if(!l(s)){return;}require(s.target,function(u){var v=new u();v.route=s;v.routeData=s.routeData;v.setView=function(y,w){var x=this;y.root=y;x.rootView=y;if(!x.rootView){return e.error(t+" rootView not found");}x.rootView.controller=x;x.rootView.render(null,function(){d(x,w,r);});};if(v.index){v.index({"routeData":v.routeData});}});};k.change(function(s,r){if(s){b(s,r);}});exports.start=function(r){if(r!=k.getUri()){k.setUri(r);}else{b(r);}};exports.back=k.back;exports.init=function(t){t=t||{};t.style=(t.style||n.currentName()||n.defaultName()||"default").toLowerCase();n.setStyle(t.style);t.language=(t.language||i.currentName()||i.defaultName()||"en-us").toLowerCase();var s=k.getUri();var r=function(){i.setLanguage(t.language,function(){exports.start(s||t.index);});};var u=function(){if(t.preInit){t.preInit(r);}else{r();}};if(t.splash){exports.start(t.splash);if(s==null||s==t.splash){s=t.index;}p.async(u,500);}else{u();}};});