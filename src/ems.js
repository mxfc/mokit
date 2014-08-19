/*csd*//**
 * emsjs v1.2.8
 * 作者：侯锋
 * 邮箱：admin@xhou.net
 * 网站：http://houfeng.net , http://houfeng.net/ems
 *
 * emsjs 是一个符合 AMD 规范的浏览器端 JavaScript 模块加载器，兼容主流浏览器。
 **/
 (function(p){var L=(p.ems=function(Z,Y,X){return L.require(Z,Y,X);});L.version="v1.2.8";L.author="Houfeng";function A(X){return(X===null)||(typeof X==="undefined");}function x(X){return !A(X)&&(X instanceof Array)||(X&&X.length&&X[0]);}function z(X){return !A(X)&&typeof(X)==="function";}function B(X){return !A(X)&&typeof(X)==="string";}function n(aa,X){if(!aa||!X){return;}if(x(aa)){var ab=aa.length;for(var Y=0;Y<ab;Y++){if(A(aa[Y])){continue;}var ac=X.call(aa[Y],Y,aa[Y]);if(!A(ac)){return ac;}}}else{for(var Z in aa){if(A(aa[Z])){continue;}var ad=X.call(aa[Z],Z,aa[Z]);if(!A(ad)){return ad;}}}}function T(X,Y){return !A(X)&&!A(Y)&&X.indexOf(Y)===0;}function i(X,Y){return !A(X)&&!A(Y)&&X.indexOf(Y)>-1;}function O(X,Y,Z){if(A(X)){return X;}return X.replace(new RegExp(Y,"g"),Z);}function f(X){setTimeout(X,13);}function W(X){if(A(X)){return[];}if((typeof X)=="string"){X=[X];}return X;}function N(X){return X.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,"\n").replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g,"\n");}function G(aa){aa=aa.replace(/\/\*[\w\W]*?\*\//gm,";").replace(/^\/\/.*/gi,";");aa=N(aa);var X=[];var Z=/require\s*\(\s*[\"|\'](.+?)[\"|\']\s*\)\s*[;|,|\n|\}|\{|\[|\]|\.|\)|\(|\||\&|\+|\-|\*|\/|\<|\>|\=|\?|\:|\%|\$|\_|\!|\"|\'|\~|\^]/gm;var Y=null;while(Y=Z.exec(aa)){if(Y&&Y[1]&&!i(Y[1],'"')&&!i(Y[1],"'")){X.push(Y[1]);}}return X;}L.matchRequire=G;function k(Y){var X=document.createElement("script");X.src=Y;X.async=true;X.defer=true;X.type="text/javascript";return X;}function l(Y){var X=document.createElement("link");X.href=Y;X.type="text/css";X.rel="stylesheet";return X;}function t(){return document.getElementsByTagName("script");}function r(){var X=t();return n(X,function(){return this.getAttribute("data-main");});}function q(){var X=t();return n(X,function(){if(this.readyState==="interactive"){return this;}});}var o=null;function d(X){if(!o){o=document.getElementsByTagName("head");o=o&&o[0]?o[0]:document.body;o=o||o.parent;}o.appendChild(X);}function g(X,Z,Y){if(X.addEventListener){X.addEventListener(Z,Y);}else{if(X.attachEvent){X.attachEvent("on"+Z,Y);}}}function h(X,Y){if(!X||!Y){return;}if((typeof HTMLLinkElement!=="undefined")&&(X instanceof HTMLLinkElement)){Y.apply(X,[{}]);return;}var Z=X.attachEvent?"readystatechange":"load";g(X,Z,function(){var aa=X.readyState||"loaded";if(aa=="loaded"||aa=="interactive"||aa=="complete"){Y.apply(X,arguments||[]);}});}var K=L.options={};K.extension=".js";K.maxLoadTime=10000;var c=L.alias=L.paths=K.alias=K.paths={};var M=L.packages=K.packages={};var R=L.shim=K.shim={};var S={};var J=L.modules={"require":{id:"require",loading:true,saved:true,loaded:true,executed:true,exports:{}},"exports":{id:"exports",loading:true,saved:true,loaded:true,executed:true,exports:{}},"module":{id:"module",loading:true,saved:true,loaded:true,executed:true,exports:{}}};L.config=function(X){if(X===null){return K;}X=X||{};X.alias=X.alias||X.paths||{};n(X.alias,function(Z,aa){var Y=aa.name||Z;c[Y]=aa;});X.shim=X.shim||{};n(X.shim,function(Z,aa){var Y=aa.name||Z;R[Y]=aa;});X.packages=X.packages||[];n(X.packages,function(Z,aa){var Y=aa.name||Z;M[Y]=aa;});K.extension=K.extension||X.extension;K.baseUri=K.baseUri||X.baseUri||X.baseUrl;K.maxLoadTime=K.maxLoadTime||X.maxLoadTime;};function C(X){return(X=="require"||X=="exports"||X=="module");}function V(Z){if(T(Z,"http://")||T(Z,"https://")||T(Z,"file://")){return true;}else{var X=/^\S+?:\//ig;var Y=/^\S+?:\\/ig;return X.test(Z)||Y.test(Z);}}function U(X){return T(X,"/")||T(X,"\\");}function b(aa,Y){if(A(aa)||A(Y)||V(aa)||U(aa)||C(aa)){return aa;}aa=O(aa,"\\\\","/");Y=O(Y,"\\\\","/");Y=Y.split("?")[0].split("#")[0];var X=Y.substring(0,Y.lastIndexOf("/"));var ac=aa.split("#")[0].split("/");var ab=aa.split("#")[1];var Z=X.length>0?X.split("/"):[];n(ac,function(ad,ae){if(ae==".."){Z.pop();}else{if(ae=="."){}else{Z.push(ae);}}});return Z.join("/")+(ab?"#"+ab:"");}function P(X,Y,Z){if(A(X)||A(Y)){return X;}var ab=X.split("!");var aa=[];n(ab,function(ac,ad){var ae=u(ad);ae=w(ae);ae=b(ae,Y);if(!Z){ae=v(ae);}aa.push(ae);});return aa.join("!");}function u(Z){if(C(Z)){return Z;}var X=c[Z]||Z;var Y=R[Z];if(Y!=null){S[Y.uri||X]=Y;}return X;}function v(Z){if(A(Z)||C(Z)){return Z;}var X=Z.substring(Z.lastIndexOf("/")+1,Z.length);var Y=A(X)||X==="";if(Y){return Z;}if(!i(Z,"?")&&!i(Z,"#")&&!i(X,".")){Z+=K.extension;}return Z;}function w(aa){if(C(aa)){return aa;}var X=aa.indexOf("/");if(X<0){X=aa.length;}var Y=aa.substr(0,X);var Z=aa.substr(X+1,aa.length);n(M,function(ab,ac){if(Y==ac.name){Y=ac.location||Y;Z=Z||ac.main||"";if(Y[Y.length-1]=="/"){Y=Y.substring(0,Y.lastIndexOf("/"));}if(Z[0]=="/"){Z=Z.substring(1,Z.length);}aa=Y+"/"+Z;}});return aa;}function m(Z,Y){Y=Y||K.baseUri||location.href;Z=W(Z);var X=[];n(Z,function(ab,aa){var ac=P(aa,Y);X.push(ac);});return X;}function e(Y,X){Y.id=X.id||Y.id;Y.deps=X.deps||Y.deps;Y.factory=X.factory||Y.factory||function(){};Y.factoryDeps=X.factoryDeps||Y.factoryDeps;Y.executed=false;X=null;return Y;}function Q(Z,X){var Y=J[Z];if(!Y){return;}e(Y,X);Y.saved=true;Y.execute=function(){if(!Y.executed&&z(Y.factory)){Y.executed=true;var ac=Y.depModules;var aa=[];for(var ad=0;ad<ac.length;ad++){var ab=ac[ad];if(ab.id=="require"){aa.push(Y.require);}else{if(ab.id=="exports"){aa.push(Y.exports);}else{if(ab.id=="module"){aa.push(Y);}else{ab.execute();aa.push(ab.exports);}}}}aa.push(Y.require);aa.push(Y.exports);aa.push(Y);var ae=Y.factory.apply(p,aa);Y.exports=ae||Y.exports;}return Y.exports;};Y.load(Y.deps,function(){Y.depModules=arguments||[];Y.load(Y.factoryDeps,function(){Y.factoryDepModules=arguments||[];Y.loaded=true;if(L.onLoad&&z(L.onLoad)){L.onLoad(Y);}if(Y.timer){clearTimeout(Y.timer);}n(Y.loadCallbacks,function(ab,aa){if(z(aa)){aa(Y);}});Y.loadCallbacks=null;});});}function a(aa,Y,X){J[aa]=J[aa]||new H(aa);var Z=J[aa];if(!A(Z)&&Z.loaded&&z(Y)){Y(Z);return;}if(y(aa,X)&&z(Y)){Y(Z);return;}if(!A(Z)&&x(Z.loadCallbacks)){Z.loadCallbacks.push(Y);return;}Z.loadCallbacks=[];Z.loadCallbacks.push(Y);Z.element=i(aa,".css")?l(aa):k(aa);if(K.maxLoadTime>0){Z.timer=setTimeout(function(){throw"加载 "+aa+' 超时,可能原因: "1.无法处理的循环依赖; 2.资源不存在; 3.脚本错误; 4.其它未知错误;".';},K.maxLoadTime);}h(Z.element,function(){if(!Z.loaded&&!Z.saved){var ab=D.shift();if(!A(ab)){Q(aa,ab);}else{if(!A(S[aa])){ab=S[aa];if(z(ab.exports)||z(ab.init)){var ac=ab.init||ab.exports||ab.factory;ab.factory=ac;}else{if(B(ab.exports)){var ad=ab.exports;ab.factory=function(){return p[ad];};}}ab.id=aa;Q(aa,ab);}else{Q(aa,{});}}}});Z.loading=true;d(Z.element);return;}function E(ad,Y,X){if(!i(ad,"!")){return a(ad,Y,X);}else{var ac=ad.lastIndexOf("!");var ab=ad.substring(0,ac);var aa=ad.substring(ac+1);var Z=J[aa];if(!A(Z)&&Z.loaded){if(Y){Y(Z);}return Z;}return E(ab,function(ah){if(ah&&z(ah.execute)){ah.execute();}var ag=ah.exports;if(A(ag)||!z(ag.load)){throw"插件 '"+ab+"' 存在错误.";}var ae=function(ai){var aj=J[aa]={exports:ai,executed:true,loaded:true,loading:true,saved:true};if(z(Y)){Y(aj);}};ae.fromText=ae;ae.error=ae;var af=J[X]||ah||L;ag.load(aa,af.require,ae,L.config());});}}L.load=function(Z,Y,X){var ac=m(Z,X);var ab=s(ac);var aa=0;if(ac&&ac.length>0){n(ac,function(ad,ae){E(ae,function(){aa++;if(aa<ac.length){return;}ab=s(ac)||ab;if(z(Y)){Y.apply(p,ab);}},X);});}else{if(z(Y)){Y.apply(p,ab);}}return ab;};function y(ac,X){var ab=false;X=X||K.baseUri||location.href;if(A(X)||A(ac)){ab=false;}if(ac==X){ab=true;}if(!ab){var aa=J[ac];if(!A(aa)){if(!ab&&aa.deps&&aa.deps.length>0){var Y=m(aa.deps,aa.uri);n(Y,function(ae,ad){if(ad==X||y(ad,X)){ab=true;return;}});}if(!ab&&aa.factoryDeps&&aa.factoryDeps.length>0){var Z=m(aa.factoryDeps,aa.uri);n(Z,function(ae,ad){if(ad==X||y(ad,X)){ab=true;return;}});}}else{ab=false;}}return ab;}L.unload=L.undef=function(Y,X){var Z=m(Y,X);n(Z,function(aa,ac){var ab=J[ac];if(ab){ab.element.parentNode.removeChild(ab.element);ab.element=null;ab=null;}});};function I(Y){var X=[];n(Y,function(Z,aa){if(aa&&z(aa.execute)){aa.execute();}X.push(aa.exports);});return X;}L.require=function(Z,Y,X){var ab=L.load(Z,function(){var ad=arguments;var ac=I(ad);if(z(Y)){Y.apply(p,ac);}},X);var aa=I(ab);return(aa&&aa.length==1)?aa[0]:aa;};function s(Y){var X=[];n(Y,function(Z,ac){var ab=ac.split("!")[1]||ac||"";var aa=J[ab];X.push(aa);});return X;}function H(Z){var Y=this;var X=Y.uri=Y.id=Z||"/";Y.resovleUri=function(aa,ab,ac){return P(aa,ab||X,ac);};Y.load=function(ab,aa){return L.load(ab,aa,Z);};Y.unload=Y.undef=function(aa){return L.unload(aa,Z);};Y.require=function(ab,aa){return L.require(ab,aa,Z);};Y.require.toUrl=Y.require.resovleUri=function(aa,ab,ac){return Y.resovleUri(aa,ab,ac);};Y.require.defined=function(aa){return J[aa].loaded;};Y.require.specified=function(aa){return J[aa].loaded||!A(J[aa].loadCallbacks);};Y.require.module=Y;Y.exports={};Y.factory=null;Y.deps=null;Y.factoryDeps=null;Y.loading=false;Y.loaded=false;Y.executed=false;Y.saved=false;}var D=[];function j(Z,X,Y){var aa=null;if(X&&Y){aa={"id":Z,"deps":X,"factory":Y};}else{if(Z&&X){aa={"deps":Z,"factory":X};}else{if(Z&&Y){aa={"id":Z,"deps":X,"factory":Y};}else{if(Z){aa={"factory":Z};}}}}return aa;}L.define=function(ac,Z,aa){var Y=j(ac,Z,aa);if(Y){if(!z(Y.factory)){var ae=Y.factory;Y.factory=function(){return ae;};}var X=Y.factory.toString();var ab=G(X);if(x(ab)&&ab.length>0){Y.factoryDeps=ab;}var ad=q();if(!A(ad)){var af=ad.getAttribute("src");Q(af,Y);}else{D.push(Y);}}};L.resovleUri=function(Z,X,Y){return P(Z,X||K.baseUri||location.href,Y);};L.define.amd={};L.define.amd.jQuery=true;var F=r();if(!A(F)&&F!==""){L.require(F);}p.define=L.define;p.require=L.require;})(this);