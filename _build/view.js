/*csd*/define(function(require,exports,module){"use strict";var a=require("./jquery"),b=require("./class"),x=require("./tp"),z=require("./utils"),d=require("./ajax"),l=require("./json"),c=require("./model"),u=require("./store"),f=require("./console"),m=require("./language"),g=require("./event");x.extend(z);var w=exports.templateType={uri:"uri",element:"element",content:"content"};var v=u.dataCache;var n=function(D,C,B){D=D||w.uri;if(!C||!B){return;}if(D==w.element){B(a(C).html());}else{if(D==w.uri){d.get({url:C,callback:B,dataType:"text"});}else{B(C);}}};var e=function(E,D,C){var B=D.split("?")[0].split("#")[0];if(v[B]){if(C){C(v[B]);}}else{n(E,D,function(F){v[B]=x.compile(F);if(C){C(v[B]);}});}};var h=function(D,C){if(!D||!C){return null;}var B=C.split(".");z.each(B,function(E,F){D=(F&&D[F])?D[F]:null;});return D;};var s=function(D,C,E){if(D===null||C===null||E===null){return;}var B=C.split(".");z.each(B,function(F,G){if(F<B.length-1){if(G&&!D[G]){D[G]=new c.Model();}D=D[G];}else{D[G]=E;}});};var q=function(C){var E={};var B=C.split(">");E.eventName=(B[0]||"");var D=(B[1]||"").split(":");E.methodName=(D[0]||"");E.methodArgs=(D[1]||"").split(",");if(z.contains(E.methodName,"!")){E.isViewMethod=true;E.methodName=E.methodName.toString().replace("!","");}return E;};var k=function(C){var B=C.ui.find("[data-event]");B.each(function(){var D=a(this);var E=D.attr("data-event");if(!E){return;}E=E.split(";");z.each(E,function(J,I){var H=q(I);var G=H.isViewMethod?C:C.controller;var F=G[H.methodName];if(F){D.on(H.eventName,function(K){var L=q(I);K.$element=D;K.element=D[0];K.view=C;K.routeData=C.controller.route.routeData;L.methodArgs.reverse();L.methodArgs.push(K);L.methodArgs.reverse();F.apply(G,L.methodArgs);L=null;});}else{f.error((H.isViewMethod?"method":"action")+' "'+H.methodName+'" not found');}H=null;});});};var p=function(D){var E={};var C=D.split("<");E.filedName=(C[1]||"");var B=(C[0]||"").split(":");E.attrName=(B[0]||"");E.attrArg=(B[1]||"");return E;};var i=function(C){var B=C.ui.find("[data-bind]");B.each(function(){var E=a(this);var D=E.attr("data-bind");if(!D){return;}D=D.split(";");z.each(D,function(H,F){F=p(F);if(E[F.attrName]){var G=h(C.model,F.filedName);if(F.attrName&&F.attrArg){E[F.attrName](F.attrArg,G);}else{E[F.attrName](G);}}});});};var y=function(C){if(!C||!C.ui){return;}var B=C.ui.find("[data-bind]");B.each(function(){var E=a(this);var D=E.attr("data-bind");if(!D){return;}D=D.split(";");z.each(D,function(G,F){F=p(F);if(E[F.attrName]){if(F.attrName&&F.attrArg){s(C.model,F.filedName,E[F.attrName](F.attrArg));}else{s(C.model,F.filedName,E[F.attrName]());}}});});return C.model;};var j=function(D){D.children=D.children||{};var B=D.ui.find("[data-view]");var C=0;B.each(function(){var E=a(this);var H=E.attr("data-view");if(!H){return;}var F=E.attr("id"),G=h(D.model,(E.attr("data-model")||""))||D.model;if(D.children[F]){D.children[F].render(E,function(){if(D.onChildRender){D.onChildRender();}});return;}require(module.resovleUri(H,D.template),function(I){D[F]=D.children[F]=new I({model:G,controller:D.controller});D.children[F].parent=D;D.children[F].root=D.root||D;D.children[F].render(E,function(){C++;if(D.onChildRender&&C>=B.length){D.onChildRender();}});});});};var t=function(C){if(!C||!C.ui){return;}if(C.ui.attr("data-role")!="page"){return;}var B=C.ui.attr("data-title");if(B){document.title=B;}};var o=function(B){if(!B||!B.ui||!B.elMap){return;}B.el={};z.each(B.elMap,function(C){B.el[C]=B.ui.find(B.elMap[C]);});};var r=exports.rootContainer=a(document.body);var A=exports.View=b.create(function(){this.template="";this.model=null;this.controller=null;this.ui=null;this.el=null;this.name="";this.container=null;this.initialize=function(B){var C=this;B=B||{};C.name=z.newGuid();C.model=B.model||C.model||{};C.controller=B.controller||C.controller||{};C.template=B.template||C.template||"";C.elMap=C.el;if(C.model.registerView){C.model.registerView(C);}};this.setModel=function(B){var C=this;C.model=B;};this.updateModel=function(){var B=this;return y(B);};this.render=function(C,B){var D=this;e(D.templateType,D.template,function(F){var E=D.ui;D.ui=a(a.trim(F(D.model,{lang:m.current(),self:D})));if(!D.ui||D.ui.length<1){return f.error(D.ui);}o(D);i(D);k(D);j(D);t(D);if(D.onInit){D.onInit();}if(E){E.remove();}D.container=C||D.container||r;D.container=z.isString(C)?a(D.container):D.container;if(D.container[0].tagName!=="LINK"){D.container.append(D.ui);}else{D.container.after(D.ui);}if(D.onRender){D.onRender();}if(B){B(D.ui);}});};this.remove=function(){var B=this;if(B.ui){B.ui.remove();}if(B.onRemove){B.onRemove();}if(B.model.removeView){B.model.removeView(B);}B.model=null;B.controller=null;B.ui=null;B.el=null;B.name=null;B.container=null;};this.hide=function(){var B=this;if(B.ui){return B.ui.hide();}};this.show=function(){var B=this;if(B.ui){return B.ui.show();}};});exports.create=function(B,C){if(!C){C=B;B=A;}return b.create(B,C);};});