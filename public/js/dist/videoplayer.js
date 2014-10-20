/*! 3drs-sedimentary 2014-10-20 */
function _handleMultipleEvents(a,b,c,d){vjs.arr.forEach(c,function(c){a(b,c,d)})}function _logType(a,b){var c,d,e;c=Array.prototype.slice.call(b),d=function(){},e=window.console||{log:d,warn:d,error:d},a?c.unshift(a.toUpperCase()+":"):a="log",vjs.log.history.push(c),c.unshift("VIDEOJS:"),e[a].apply?e[a].apply(e,c):e[a](c.join(" "))}document.createElement("video"),document.createElement("audio"),document.createElement("track");var vjs=function(a,b,c){var d;if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),vjs.players[a])return vjs.players[a];d=vjs.el(a)}else d=a;if(!d||!d.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return d.player||new vjs.Player(d,b,c)},videojs=window.videojs=vjs;vjs.CDN_VERSION="4.8",vjs.ACCESS_PROTOCOL="https:"==document.location.protocol?"https://":"http://",vjs.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],inactivityTimeout:2e3,children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{},errorDisplay:{}},language:document.getElementsByTagName("html")[0].getAttribute("lang")||navigator.languages&&navigator.languages[0]||navigator.userLanguage||navigator.language||"en",languages:{},notSupportedMessage:"No compatible source was found for this video."},"GENERATED_CDN_VSN"!==vjs.CDN_VERSION&&(videojs.options.flash.swf=vjs.ACCESS_PROTOCOL+"vjs.zencdn.net/"+vjs.CDN_VERSION+"/video-js.swf"),vjs.addLanguage=function(a,b){return vjs.options.languages[a]=void 0!==vjs.options.languages[a]?vjs.util.mergeOptions(vjs.options.languages[a],b):b,vjs.options.languages},vjs.players={},"function"==typeof define&&define.amd?define([],function(){return videojs}):"object"==typeof exports&&"object"==typeof module&&(module.exports=videojs),vjs.CoreObject=vjs.CoreObject=function(){},vjs.CoreObject.extend=function(a){var b,c;a=a||{},b=a.init||a.init||this.prototype.init||this.prototype.init||function(){},c=function(){b.apply(this,arguments)},c.prototype=vjs.obj.create(this.prototype),c.prototype.constructor=c,c.extend=vjs.CoreObject.extend,c.create=vjs.CoreObject.create;for(var d in a)a.hasOwnProperty(d)&&(c.prototype[d]=a[d]);return c},vjs.CoreObject.create=function(){var a=vjs.obj.create(this.prototype);return this.apply(a,arguments),a},vjs.on=function(a,b,c){if(vjs.obj.isArray(b))return _handleMultipleEvents(vjs.on,a,b,c);var d=vjs.getData(a);d.handlers||(d.handlers={}),d.handlers[b]||(d.handlers[b]=[]),c.guid||(c.guid=vjs.guid++),d.handlers[b].push(c),d.dispatcher||(d.disabled=!1,d.dispatcher=function(b){if(!d.disabled){b=vjs.fixEvent(b);var c=d.handlers[b.type];if(c)for(var e=c.slice(0),f=0,g=e.length;g>f&&!b.isImmediatePropagationStopped();f++)e[f].call(a,b)}}),1==d.handlers[b].length&&(a.addEventListener?a.addEventListener(b,d.dispatcher,!1):a.attachEvent&&a.attachEvent("on"+b,d.dispatcher))},vjs.off=function(a,b,c){if(vjs.hasData(a)){var d=vjs.getData(a);if(d.handlers){if(vjs.obj.isArray(b))return _handleMultipleEvents(vjs.off,a,b,c);var e=function(b){d.handlers[b]=[],vjs.cleanUpEvents(a,b)};if(b){var f=d.handlers[b];if(f){if(!c)return void e(b);if(c.guid)for(var g=0;g<f.length;g++)f[g].guid===c.guid&&f.splice(g--,1);vjs.cleanUpEvents(a,b)}}else for(var h in d.handlers)e(h)}}},vjs.cleanUpEvents=function(a,b){var c=vjs.getData(a);0===c.handlers[b].length&&(delete c.handlers[b],a.removeEventListener?a.removeEventListener(b,c.dispatcher,!1):a.detachEvent&&a.detachEvent("on"+b,c.dispatcher)),vjs.isEmpty(c.handlers)&&(delete c.handlers,delete c.dispatcher,delete c.disabled),vjs.isEmpty(c)&&vjs.removeData(a)},vjs.fixEvent=function(a){function b(){return!0}function c(){return!1}if(!a||!a.isPropagationStopped){var d=a||window.event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyboardEvent.keyLocation"!==e&&("returnValue"==e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||document),a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement,a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=!1,a.isDefaultPrevented=b,a.defaultPrevented=!0},a.isDefaultPrevented=c,a.defaultPrevented=!1,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=!0,a.isPropagationStopped=b},a.isPropagationStopped=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.isImmediatePropagationStopped=b,a.stopPropagation()},a.isImmediatePropagationStopped=c,null!=a.clientX){var f=document.documentElement,g=document.body;a.pageX=a.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,null!=a.button&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a},vjs.trigger=function(a,b){var c=vjs.hasData(a)?vjs.getData(a):{},d=a.parentNode||a.ownerDocument;if("string"==typeof b&&(b={type:b,target:a}),b=vjs.fixEvent(b),c.dispatcher&&c.dispatcher.call(a,b),d&&!b.isPropagationStopped()&&b.bubbles!==!1)vjs.trigger(d,b);else if(!d&&!b.defaultPrevented){var e=vjs.getData(b.target);b.target[b.type]&&(e.disabled=!0,"function"==typeof b.target[b.type]&&b.target[b.type](),e.disabled=!1)}return!b.defaultPrevented},vjs.one=function(a,b,c){if(vjs.obj.isArray(b))return _handleMultipleEvents(vjs.one,a,b,c);var d=function(){vjs.off(a,b,d),c.apply(this,arguments)};d.guid=c.guid=c.guid||vjs.guid++,vjs.on(a,b,d)};var hasOwnProp=Object.prototype.hasOwnProperty;vjs.createEl=function(a,b){var c;return a=a||"div",b=b||{},c=document.createElement(a),vjs.obj.each(b,function(a,b){-1!==a.indexOf("aria-")||"role"==a?c.setAttribute(a,b):c[a]=b}),c},vjs.capitalize=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},vjs.obj={},vjs.obj.create=Object.create||function(a){function b(){}return b.prototype=a,new b},vjs.obj.each=function(a,b,c){for(var d in a)hasOwnProp.call(a,d)&&b.call(c||this,d,a[d])},vjs.obj.merge=function(a,b){if(!b)return a;for(var c in b)hasOwnProp.call(b,c)&&(a[c]=b[c]);return a},vjs.obj.deepMerge=function(a,b){var c,d,e;a=vjs.obj.copy(a);for(c in b)hasOwnProp.call(b,c)&&(d=a[c],e=b[c],a[c]=vjs.obj.isPlain(d)&&vjs.obj.isPlain(e)?vjs.obj.deepMerge(d,e):b[c]);return a},vjs.obj.copy=function(a){return vjs.obj.merge({},a)},vjs.obj.isPlain=function(a){return!!a&&"object"==typeof a&&"[object Object]"===a.toString()&&a.constructor===Object},vjs.obj.isArray=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},vjs.isNaN=function(a){return a!==a},vjs.bind=function(a,b,c){b.guid||(b.guid=vjs.guid++);var d=function(){return b.apply(a,arguments)};return d.guid=c?c+"_"+b.guid:b.guid,d},vjs.cache={},vjs.guid=1,vjs.expando="vdata"+(new Date).getTime(),vjs.getData=function(a){var b=a[vjs.expando];return b||(b=a[vjs.expando]=vjs.guid++,vjs.cache[b]={}),vjs.cache[b]},vjs.hasData=function(a){var b=a[vjs.expando];return!(!b||vjs.isEmpty(vjs.cache[b]))},vjs.removeData=function(a){var b=a[vjs.expando];if(b){delete vjs.cache[b];try{delete a[vjs.expando]}catch(c){a.removeAttribute?a.removeAttribute(vjs.expando):a[vjs.expando]=null}}},vjs.isEmpty=function(a){for(var b in a)if(null!==a[b])return!1;return!0},vjs.addClass=function(a,b){-1==(" "+a.className+" ").indexOf(" "+b+" ")&&(a.className=""===a.className?b:a.className+" "+b)},vjs.removeClass=function(a,b){var c,d;if(-1!=a.className.indexOf(b)){for(c=a.className.split(" "),d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);a.className=c.join(" ")}},vjs.TEST_VID=vjs.createEl("video"),vjs.USER_AGENT=navigator.userAgent,vjs.IS_IPHONE=/iPhone/i.test(vjs.USER_AGENT),vjs.IS_IPAD=/iPad/i.test(vjs.USER_AGENT),vjs.IS_IPOD=/iPod/i.test(vjs.USER_AGENT),vjs.IS_IOS=vjs.IS_IPHONE||vjs.IS_IPAD||vjs.IS_IPOD,vjs.IOS_VERSION=function(){var a=vjs.USER_AGENT.match(/OS (\d+)_/i);return a&&a[1]?a[1]:void 0}(),vjs.IS_ANDROID=/Android/i.test(vjs.USER_AGENT),vjs.ANDROID_VERSION=function(){var a,b,c=vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);return c?(a=c[1]&&parseFloat(c[1]),b=c[2]&&parseFloat(c[2]),a&&b?parseFloat(c[1]+"."+c[2]):a?a:null):null}(),vjs.IS_OLD_ANDROID=vjs.IS_ANDROID&&/webkit/i.test(vjs.USER_AGENT)&&vjs.ANDROID_VERSION<2.3,vjs.IS_FIREFOX=/Firefox/i.test(vjs.USER_AGENT),vjs.IS_CHROME=/Chrome/i.test(vjs.USER_AGENT),vjs.TOUCH_ENABLED=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),vjs.setElementAttributes=function(a,b){vjs.obj.each(b,function(b,c){null===c||"undefined"==typeof c||c===!1?a.removeAttribute(b):a.setAttribute(b,c===!0?"":c)})},vjs.getElementAttributes=function(a){var b,c,d,e,f;if(b={},c=",autoplay,controls,loop,muted,default,",a&&a.attributes&&a.attributes.length>0){d=a.attributes;for(var g=d.length-1;g>=0;g--)e=d[g].name,f=d[g].value,("boolean"==typeof a[e]||-1!==c.indexOf(","+e+","))&&(f=null!==f?!0:!1),b[e]=f}return b},vjs.getComputedDimension=function(a,b){var c="";return document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(c=a["client"+b.substr(0,1).toUpperCase()+b.substr(1)]+"px"),c},vjs.insertFirst=function(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)},vjs.browser={},vjs.el=function(a){return 0===a.indexOf("#")&&(a=a.slice(1)),document.getElementById(a)},vjs.formatTime=function(a,b){b=b||a;var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||1/0===a)&&(e=d=c="-"),e=e>0||g>0?e+":":"",d=((e||f>=10)&&10>d?"0"+d:d)+":",c=10>c?"0"+c:c,e+d+c},vjs.blockTextSelection=function(){document.body.focus(),document.onselectstart=function(){return!1}},vjs.unblockTextSelection=function(){document.onselectstart=function(){return!0}},vjs.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")},vjs.round=function(a,b){return b||(b=0),Math.round(a*Math.pow(10,b))/Math.pow(10,b)},vjs.createTimeRange=function(a,b){return{length:1,start:function(){return a},end:function(){return b}}},vjs.get=function(a,b,c,d){var e,f,g,h,i;c=c||function(){},"undefined"==typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(c){}throw new Error("This browser does not support XMLHttpRequest.")}),f=new XMLHttpRequest,g=vjs.parseUrl(a),h=window.location,i=g.protocol+g.host!==h.protocol+h.host,!i||!window.XDomainRequest||"withCredentials"in f?(e="file:"==g.protocol||"file:"==h.protocol,f.onreadystatechange=function(){4===f.readyState&&(200===f.status||e&&0===f.status?b(f.responseText):c(f.responseText))}):(f=new window.XDomainRequest,f.onload=function(){b(f.responseText)},f.onerror=c,f.onprogress=function(){},f.ontimeout=c);try{f.open("GET",a,!0),d&&(f.withCredentials=!0)}catch(j){return void c(j)}try{f.send()}catch(j){c(j)}},vjs.setLocalStorage=function(a,b){try{var c=window.localStorage||!1;if(!c)return;c[a]=b}catch(d){22==d.code||1014==d.code?vjs.log("LocalStorage Full (VideoJS)",d):18==d.code?vjs.log("LocalStorage not allowed (VideoJS)",d):vjs.log("LocalStorage Error (VideoJS)",d)}},vjs.getAbsoluteURL=function(a){return a.match(/^https?:\/\//)||(a=vjs.createEl("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href),a},vjs.parseUrl=function(a){var b,c,d,e,f;e=["protocol","hostname","port","pathname","search","hash","host"],c=vjs.createEl("a",{href:a}),d=""===c.host&&"file:"!==c.protocol,d&&(b=vjs.createEl("div"),b.innerHTML='<a href="'+a+'"></a>',c=b.firstChild,b.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(b)),f={};for(var g=0;g<e.length;g++)f[e[g]]=c[e[g]];return d&&document.body.removeChild(b),f},vjs.log=function(){_logType(null,arguments)},vjs.log.history=[],vjs.log.error=function(){_logType("error",arguments)},vjs.log.warn=function(){_logType("warn",arguments)},vjs.findPosition=function(a){var b,c,d,e,f,g,h,i,j;return a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),b?(c=document.documentElement,d=document.body,e=c.clientLeft||d.clientLeft||0,f=window.pageXOffset||d.scrollLeft,g=b.left+f-e,h=c.clientTop||d.clientTop||0,i=window.pageYOffset||d.scrollTop,j=b.top+i-h,{left:vjs.round(g),top:vjs.round(j)}):{left:0,top:0}},vjs.arr={},vjs.arr.forEach=function(a,b,c){if(vjs.obj.isArray(a)&&b instanceof Function)for(var d=0,e=a.length;e>d;++d)b.call(c||vjs,a[d],d,a);return a},vjs.util={},vjs.util.mergeOptions=function(a,b){var c,d,e;a=vjs.obj.copy(a);for(c in b)b.hasOwnProperty(c)&&(d=a[c],e=b[c],a[c]=vjs.obj.isPlain(d)&&vjs.obj.isPlain(e)?vjs.util.mergeOptions(d,e):b[c]);return a},vjs.Component=vjs.CoreObject.extend({init:function(a,b,c){this.player_=a,this.options_=vjs.obj.copy(this.options_),b=this.options(b),this.id_=b.id||(b.el&&b.el.id?b.el.id:a.id()+"_component_"+vjs.guid++),this.name_=b.name||null,this.el_=b.el||this.createEl(),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.initChildren(),this.ready(c),b.reportTouchActivity!==!1&&this.enableTouchActivity()}}),vjs.Component.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var a=this.children_.length-1;a>=0;a--)this.children_[a].dispose&&this.children_[a].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),vjs.removeData(this.el_),this.el_=null},vjs.Component.prototype.player_=!0,vjs.Component.prototype.player=function(){return this.player_},vjs.Component.prototype.options_,vjs.Component.prototype.options=function(a){return void 0===a?this.options_:this.options_=vjs.util.mergeOptions(this.options_,a)},vjs.Component.prototype.el_,vjs.Component.prototype.createEl=function(a,b){return vjs.createEl(a,b)},vjs.Component.prototype.localize=function(a){var b=this.player_.language(),c=this.player_.languages();return c&&c[b]&&c[b][a]?c[b][a]:a},vjs.Component.prototype.el=function(){return this.el_},vjs.Component.prototype.contentEl_,vjs.Component.prototype.contentEl=function(){return this.contentEl_||this.el_},vjs.Component.prototype.id_,vjs.Component.prototype.id=function(){return this.id_},vjs.Component.prototype.name_,vjs.Component.prototype.name=function(){return this.name_},vjs.Component.prototype.children_,vjs.Component.prototype.children=function(){return this.children_},vjs.Component.prototype.childIndex_,vjs.Component.prototype.getChildById=function(a){return this.childIndex_[a]},vjs.Component.prototype.childNameIndex_,vjs.Component.prototype.getChild=function(a){return this.childNameIndex_[a]},vjs.Component.prototype.addChild=function(a,b){var c,d,e;return"string"==typeof a?(e=a,b=b||{},d=b.componentClass||vjs.capitalize(e),b.name=e,c=new window.videojs[d](this.player_||this,b)):c=a,this.children_.push(c),"function"==typeof c.id&&(this.childIndex_[c.id()]=c),e=e||c.name&&c.name(),e&&(this.childNameIndex_[e]=c),"function"==typeof c.el&&c.el()&&this.contentEl().appendChild(c.el()),c},vjs.Component.prototype.removeChild=function(a){if("string"==typeof a&&(a=this.getChild(a)),a&&this.children_){for(var b=!1,c=this.children_.length-1;c>=0;c--)if(this.children_[c]===a){b=!0,this.children_.splice(c,1);break}if(b){this.childIndex_[a.id]=null,this.childNameIndex_[a.name]=null;var d=a.el();d&&d.parentNode===this.contentEl()&&this.contentEl().removeChild(a.el())}}},vjs.Component.prototype.initChildren=function(){var a,b,c,d,e;if(a=this,b=this.options().children)if(vjs.obj.isArray(b))for(var f=0;f<b.length;f++)c=b[f],"string"==typeof c?(d=c,e={}):(d=c.name,e=c),a[d]=a.addChild(d,e);else vjs.obj.each(b,function(b,c){c!==!1&&(a[b]=a.addChild(b,c))})},vjs.Component.prototype.buildCSSClass=function(){return""},vjs.Component.prototype.on=function(a,b){return vjs.on(this.el_,a,vjs.bind(this,b)),this},vjs.Component.prototype.off=function(a,b){return vjs.off(this.el_,a,b),this},vjs.Component.prototype.one=function(a,b){return vjs.one(this.el_,a,vjs.bind(this,b)),this},vjs.Component.prototype.trigger=function(a){return vjs.trigger(this.el_,a),this},vjs.Component.prototype.isReady_,vjs.Component.prototype.isReadyOnInitFinish_=!0,vjs.Component.prototype.readyQueue_,vjs.Component.prototype.ready=function(a){return a&&(this.isReady_?a.call(this):(void 0===this.readyQueue_&&(this.readyQueue_=[]),this.readyQueue_.push(a))),this},vjs.Component.prototype.triggerReady=function(){this.isReady_=!0;var a=this.readyQueue_;if(a&&a.length>0){for(var b=0,c=a.length;c>b;b++)a[b].call(this);this.readyQueue_=[],this.trigger("ready")}},vjs.Component.prototype.addClass=function(a){return vjs.addClass(this.el_,a),this},vjs.Component.prototype.removeClass=function(a){return vjs.removeClass(this.el_,a),this},vjs.Component.prototype.show=function(){return this.el_.style.display="block",this},vjs.Component.prototype.hide=function(){return this.el_.style.display="none",this},vjs.Component.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},vjs.Component.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},vjs.Component.prototype.disable=function(){this.hide(),this.show=function(){}},vjs.Component.prototype.width=function(a,b){return this.dimension("width",a,b)},vjs.Component.prototype.height=function(a,b){return this.dimension("height",a,b)},vjs.Component.prototype.dimensions=function(a,b){return this.width(a,!0).height(b)},vjs.Component.prototype.dimension=function(a,b,c){if(void 0!==b)return(null===b||vjs.isNaN(b))&&(b=0),this.el_.style[a]=-1!==(""+b).indexOf("%")||-1!==(""+b).indexOf("px")?b:"auto"===b?"":b+"px",c||this.trigger("resize"),this;if(!this.el_)return 0;var d=this.el_.style[a],e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(this.el_["offset"+vjs.capitalize(a)],10)},vjs.Component.prototype.onResize,vjs.Component.prototype.emitTapEvents=function(){var a,b,c,d,e,f,g,h,i;a=0,b=null,i=22,this.on("touchstart",function(c){1===c.touches.length&&(b=c.touches[0],a=(new Date).getTime(),d=!0)}),this.on("touchmove",function(a){a.touches.length>1?d=!1:b&&(f=a.touches[0].pageX-b.pageX,g=a.touches[0].pageY-b.pageY,h=Math.sqrt(f*f+g*g),h>i&&(d=!1))}),e=function(){d=!1},this.on("touchleave",e),this.on("touchcancel",e),this.on("touchend",function(e){b=null,d===!0&&(c=(new Date).getTime()-a,250>c&&(e.preventDefault(),this.trigger("tap")))})},vjs.Component.prototype.enableTouchActivity=function(){var a,b,c;a=vjs.bind(this.player(),this.player().reportUserActivity),this.on("touchstart",function(){a(),clearInterval(b),b=setInterval(a,250)}),c=function(){a(),clearInterval(b)},this.on("touchmove",a),this.on("touchend",c),this.on("touchcancel",c)},vjs.Button=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),this.emitTapEvents(),this.on("tap",this.onClick),this.on("click",this.onClick),this.on("focus",this.onFocus),this.on("blur",this.onBlur)}}),vjs.Button.prototype.createEl=function(a,b){var c;return b=vjs.obj.merge({className:this.buildCSSClass(),role:"button","aria-live":"polite",tabIndex:0},b),c=vjs.Component.prototype.createEl.call(this,a,b),b.innerHTML||(this.contentEl_=vjs.createEl("div",{className:"vjs-control-content"}),this.controlText_=vjs.createEl("span",{className:"vjs-control-text",innerHTML:this.localize(this.buttonText)||"Need Text"}),this.contentEl_.appendChild(this.controlText_),c.appendChild(this.contentEl_)),c},vjs.Button.prototype.buildCSSClass=function(){return"vjs-control "+vjs.Component.prototype.buildCSSClass.call(this)},vjs.Button.prototype.onClick=function(){},vjs.Button.prototype.onFocus=function(){vjs.on(document,"keydown",vjs.bind(this,this.onKeyPress))},vjs.Button.prototype.onKeyPress=function(a){(32==a.which||13==a.which)&&(a.preventDefault(),this.onClick())},vjs.Button.prototype.onBlur=function(){vjs.off(document,"keydown",vjs.bind(this,this.onKeyPress))},vjs.Slider=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),this.bar=this.getChild(this.options_.barName),this.handle=this.getChild(this.options_.handleName),this.on("mousedown",this.onMouseDown),this.on("touchstart",this.onMouseDown),this.on("focus",this.onFocus),this.on("blur",this.onBlur),this.on("click",this.onClick),this.player_.on("controlsvisible",vjs.bind(this,this.update)),a.on(this.playerEvent,vjs.bind(this,this.update)),this.boundEvents={},this.boundEvents.move=vjs.bind(this,this.onMouseMove),this.boundEvents.end=vjs.bind(this,this.onMouseUp)}}),vjs.Slider.prototype.createEl=function(a,b){return b=b||{},b.className=b.className+" vjs-slider",b=vjs.obj.merge({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},b),vjs.Component.prototype.createEl.call(this,a,b)},vjs.Slider.prototype.onMouseDown=function(a){a.preventDefault(),vjs.blockTextSelection(),this.addClass("vjs-sliding"),vjs.on(document,"mousemove",this.boundEvents.move),vjs.on(document,"mouseup",this.boundEvents.end),vjs.on(document,"touchmove",this.boundEvents.move),vjs.on(document,"touchend",this.boundEvents.end),this.onMouseMove(a)},vjs.Slider.prototype.onMouseMove=function(){},vjs.Slider.prototype.onMouseUp=function(){vjs.unblockTextSelection(),this.removeClass("vjs-sliding"),vjs.off(document,"mousemove",this.boundEvents.move,!1),vjs.off(document,"mouseup",this.boundEvents.end,!1),vjs.off(document,"touchmove",this.boundEvents.move,!1),vjs.off(document,"touchend",this.boundEvents.end,!1),this.update()},vjs.Slider.prototype.update=function(){if(this.el_){var a,b=this.getPercent(),c=this.handle,d=this.bar;if(isNaN(b)&&(b=0),a=b,c){var e=this.el_,f=e.offsetWidth,g=c.el().offsetWidth,h=g?g/f:0,i=1-h,j=b*i;a=j+h/2,c.el().style.left=vjs.round(100*j,2)+"%"}d&&(d.el().style.width=vjs.round(100*a,2)+"%")}},vjs.Slider.prototype.calculateDistance=function(a){var b,c,d,e,f,g,h,i,j;if(b=this.el_,c=vjs.findPosition(b),f=g=b.offsetWidth,h=this.handle,this.options().vertical){if(e=c.top,j=a.changedTouches?a.changedTouches[0].pageY:a.pageY,h){var k=h.el().offsetHeight;e+=k/2,g-=k}return Math.max(0,Math.min(1,(e-j+g)/g))}if(d=c.left,i=a.changedTouches?a.changedTouches[0].pageX:a.pageX,h){var l=h.el().offsetWidth;d+=l/2,f-=l}return Math.max(0,Math.min(1,(i-d)/f))},vjs.Slider.prototype.onFocus=function(){vjs.on(document,"keyup",vjs.bind(this,this.onKeyPress))},vjs.Slider.prototype.onKeyPress=function(a){37==a.which||40==a.which?(a.preventDefault(),this.stepBack()):(38==a.which||39==a.which)&&(a.preventDefault(),this.stepForward())},vjs.Slider.prototype.onBlur=function(){vjs.off(document,"keyup",vjs.bind(this,this.onKeyPress))},vjs.Slider.prototype.onClick=function(a){a.stopImmediatePropagation(),a.preventDefault()},vjs.SliderHandle=vjs.Component.extend(),vjs.SliderHandle.prototype.defaultValue=0,vjs.SliderHandle.prototype.createEl=function(a,b){return b=b||{},b.className=b.className+" vjs-slider-handle",b=vjs.obj.merge({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},b),vjs.Component.prototype.createEl.call(this,"div",b)},vjs.Menu=vjs.Component.extend(),vjs.Menu.prototype.addItem=function(a){this.addChild(a),a.on("click",vjs.bind(this,function(){this.unlockShowing()}))},vjs.Menu.prototype.createEl=function(){var a=this.options().contentElType||"ul";this.contentEl_=vjs.createEl(a,{className:"vjs-menu-content"});var b=vjs.Component.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return b.appendChild(this.contentEl_),vjs.on(b,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),b},vjs.MenuItem=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b),this.selected(b.selected)}}),vjs.MenuItem.prototype.createEl=function(a,b){return vjs.Button.prototype.createEl.call(this,"li",vjs.obj.merge({className:"vjs-menu-item",innerHTML:this.options_.label},b))},vjs.MenuItem.prototype.onClick=function(){this.selected(!0)},vjs.MenuItem.prototype.selected=function(a){a?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-selected",!0)):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-selected",!1))},vjs.MenuButton=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b),this.menu=this.createMenu(),this.addChild(this.menu),this.items&&0===this.items.length&&this.hide(),this.on("keyup",this.onKeyPress),this.el_.setAttribute("aria-haspopup",!0),this.el_.setAttribute("role","button")}}),vjs.MenuButton.prototype.buttonPressed_=!1,vjs.MenuButton.prototype.createMenu=function(){var a=new vjs.Menu(this.player_);if(this.options().title&&a.contentEl().appendChild(vjs.createEl("li",{className:"vjs-menu-title",innerHTML:vjs.capitalize(this.options().title),tabindex:-1})),this.items=this.createItems(),this.items)for(var b=0;b<this.items.length;b++)a.addItem(this.items[b]);return a},vjs.MenuButton.prototype.createItems=function(){},vjs.MenuButton.prototype.buildCSSClass=function(){return this.className+" vjs-menu-button "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.MenuButton.prototype.onFocus=function(){},vjs.MenuButton.prototype.onBlur=function(){},vjs.MenuButton.prototype.onClick=function(){this.one("mouseout",vjs.bind(this,function(){this.menu.unlockShowing(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},vjs.MenuButton.prototype.onKeyPress=function(a){a.preventDefault(),32==a.which||13==a.which?this.buttonPressed_?this.unpressButton():this.pressButton():27==a.which&&this.buttonPressed_&&this.unpressButton()},vjs.MenuButton.prototype.pressButton=function(){this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-pressed",!0),this.items&&this.items.length>0&&this.items[0].el().focus()},vjs.MenuButton.prototype.unpressButton=function(){this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-pressed",!1)},vjs.MediaError=function(a){"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:"object"==typeof a&&vjs.obj.merge(this,a),this.message||(this.message=vjs.MediaError.defaultMessages[this.code]||"")},vjs.MediaError.prototype.code=0,vjs.MediaError.prototype.message="",vjs.MediaError.prototype.status=null,vjs.MediaError.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],vjs.MediaError.defaultMessages={1:"You aborted the video playback",2:"A network error caused the video download to fail part-way.",3:"The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",4:"The video could not be loaded, either because the server or network failed or because the format is not supported.",5:"The video is encrypted and we do not have the keys to decrypt it."};for(var errNum=0;errNum<vjs.MediaError.errorTypes.length;errNum++)vjs.MediaError[vjs.MediaError.errorTypes[errNum]]=errNum,vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]]=errNum;!function(){var a,b,c,d;for(vjs.browser.fullscreenAPI,a=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],b=a[0],d=0;d<a.length;d++)if(a[d][1]in document){c=a[d];break}if(c)for(vjs.browser.fullscreenAPI={},d=0;d<c.length;d++)vjs.browser.fullscreenAPI[b[d]]=c[d]}(),vjs.Player=vjs.Component.extend({init:function(a,b,c){this.tag=a,a.id=a.id||"vjs_video_"+vjs.guid++,this.tagAttributes=a&&vjs.getElementAttributes(a),b=vjs.obj.merge(this.getTagSettings(a),b),this.language_=b.language||vjs.options.language,this.languages_=b.languages||vjs.options.languages,this.cache_={},this.poster_=b.poster,this.controls_=b.controls,a.controls=!1,b.reportTouchActivity=!1,vjs.Component.call(this,this,b,c),this.addClass(this.controls()?"vjs-controls-enabled":"vjs-controls-disabled"),vjs.players[this.id_]=this,b.plugins&&vjs.obj.each(b.plugins,function(a,b){this[a](b)},this),this.listenForUserActivity()}}),vjs.Player.prototype.language_,vjs.Player.prototype.language=function(a){return void 0===a?this.language_:(this.language_=a,this)},vjs.Player.prototype.languages_,vjs.Player.prototype.languages=function(){return this.languages_},vjs.Player.prototype.options_=vjs.options,vjs.Player.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),vjs.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech&&this.tech.dispose(),vjs.Component.prototype.dispose.call(this)},vjs.Player.prototype.getTagSettings=function(a){var b={sources:[],tracks:[]};if(vjs.obj.merge(b,vjs.getElementAttributes(a)),a.hasChildNodes()){var c,d,e,f,g;for(c=a.childNodes,f=0,g=c.length;g>f;f++)d=c[f],e=d.nodeName.toLowerCase(),"source"===e?b.sources.push(vjs.getElementAttributes(d)):"track"===e&&b.tracks.push(vjs.getElementAttributes(d))}return b},vjs.Player.prototype.createEl=function(){var a,b=this.el_=vjs.Component.prototype.createEl.call(this,"div"),c=this.tag;if(c.removeAttribute("width"),c.removeAttribute("height"),c.hasChildNodes()){var d,e,f,g,h,i;for(d=c.childNodes,e=d.length,i=[];e--;)g=d[e],h=g.nodeName.toLowerCase(),"track"===h&&i.push(g);for(f=0;f<i.length;f++)c.removeChild(i[f])}return a=vjs.getElementAttributes(c),vjs.obj.each(a,function(c){b.setAttribute(c,a[c])}),c.id+="_html5_api",c.className="vjs-tech",c.player=b.player=this,this.addClass("vjs-paused"),this.width(this.options_.width,!0),this.height(this.options_.height,!0),c.parentNode&&c.parentNode.insertBefore(b,c),vjs.insertFirst(c,b),this.el_=b,this.on("loadstart",this.onLoadStart),this.on("waiting",this.onWaiting),this.on(["canplay","canplaythrough","playing","ended"],this.onWaitEnd),this.on("seeking",this.onSeeking),this.on("seeked",this.onSeeked),this.on("ended",this.onEnded),this.on("play",this.onPlay),this.on("firstplay",this.onFirstPlay),this.on("pause",this.onPause),this.on("progress",this.onProgress),this.on("durationchange",this.onDurationChange),this.on("fullscreenchange",this.onFullscreenChange),b},vjs.Player.prototype.loadTech=function(a,b){this.tech&&this.unloadTech(),"Html5"!==a&&this.tag&&(vjs.Html5.disposeMediaElement(this.tag),this.tag=null),this.techName=a,this.isReady_=!1;var c=function(){this.player_.triggerReady()},d=vjs.obj.merge({source:b,parentEl:this.el_},this.options_[a.toLowerCase()]);b&&(this.currentType_=b.type,b.src==this.cache_.src&&this.cache_.currentTime>0&&(d.startTime=this.cache_.currentTime),this.cache_.src=b.src),this.tech=new window.videojs[a](this,d),this.tech.ready(c)},vjs.Player.prototype.unloadTech=function(){this.isReady_=!1,this.tech.dispose(),this.tech=!1},vjs.Player.prototype.onLoadStart=function(){this.error(null),this.paused()?(this.hasStarted(!1),this.one("play",function(){this.hasStarted(!0)})):this.trigger("firstplay")},vjs.Player.prototype.hasStarted_=!1,vjs.Player.prototype.hasStarted=function(a){return void 0!==a?(this.hasStarted_!==a&&(this.hasStarted_=a,a?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):this.hasStarted_},vjs.Player.prototype.onLoadedMetaData,vjs.Player.prototype.onLoadedData,vjs.Player.prototype.onLoadedAllData,vjs.Player.prototype.onPlay=function(){this.removeClass("vjs-paused"),this.addClass("vjs-playing")},vjs.Player.prototype.onWaiting=function(){this.addClass("vjs-waiting")},vjs.Player.prototype.onWaitEnd=function(){this.removeClass("vjs-waiting")},vjs.Player.prototype.onSeeking=function(){this.addClass("vjs-seeking")},vjs.Player.prototype.onSeeked=function(){this.removeClass("vjs-seeking")
},vjs.Player.prototype.onFirstPlay=function(){this.options_.starttime&&this.currentTime(this.options_.starttime),this.addClass("vjs-has-started")},vjs.Player.prototype.onPause=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused")},vjs.Player.prototype.onTimeUpdate,vjs.Player.prototype.onProgress=function(){1==this.bufferedPercent()&&this.trigger("loadedalldata")},vjs.Player.prototype.onEnded=function(){this.options_.loop&&(this.currentTime(0),this.play())},vjs.Player.prototype.onDurationChange=function(){var a=this.techGet("duration");a&&(0>a&&(a=1/0),this.duration(a),1/0===a?this.addClass("vjs-live"):this.removeClass("vjs-live"))},vjs.Player.prototype.onVolumeChange,vjs.Player.prototype.onFullscreenChange=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},vjs.Player.prototype.cache_,vjs.Player.prototype.getCache=function(){return this.cache_},vjs.Player.prototype.techCall=function(a,b){if(this.tech&&!this.tech.isReady_)this.tech.ready(function(){this[a](b)});else try{this.tech[a](b)}catch(c){throw vjs.log(c),c}},vjs.Player.prototype.techGet=function(a){if(this.tech&&this.tech.isReady_)try{return this.tech[a]()}catch(b){throw void 0===this.tech[a]?vjs.log("Video.js: "+a+" method not defined for "+this.techName+" playback technology.",b):"TypeError"==b.name?(vjs.log("Video.js: "+a+" unavailable on "+this.techName+" playback technology element.",b),this.tech.isReady_=!1):vjs.log(b),b}},vjs.Player.prototype.play=function(){return this.techCall("play"),this},vjs.Player.prototype.pause=function(){return this.techCall("pause"),this},vjs.Player.prototype.paused=function(){return this.techGet("paused")===!1?!1:!0},vjs.Player.prototype.currentTime=function(a){return void 0!==a?(this.techCall("setCurrentTime",a),this):this.cache_.currentTime=this.techGet("currentTime")||0},vjs.Player.prototype.duration=function(a){return void 0!==a?(this.cache_.duration=parseFloat(a),this):(void 0===this.cache_.duration&&this.onDurationChange(),this.cache_.duration||0)},vjs.Player.prototype.remainingTime=function(){return this.duration()-this.currentTime()},vjs.Player.prototype.buffered=function(){var a=this.techGet("buffered");return a&&a.length||(a=vjs.createTimeRange(0,0)),a},vjs.Player.prototype.bufferedPercent=function(){var a,b,c=this.duration(),d=this.buffered(),e=0;if(!c)return 0;for(var f=0;f<d.length;f++)a=d.start(f),b=d.end(f),b>c&&(b=c),e+=b-a;return e/c},vjs.Player.prototype.bufferedEnd=function(){var a=this.buffered(),b=this.duration(),c=a.end(a.length-1);return c>b&&(c=b),c},vjs.Player.prototype.volume=function(a){var b;return void 0!==a?(b=Math.max(0,Math.min(1,parseFloat(a))),this.cache_.volume=b,this.techCall("setVolume",b),vjs.setLocalStorage("volume",b),this):(b=parseFloat(this.techGet("volume")),isNaN(b)?1:b)},vjs.Player.prototype.muted=function(a){return void 0!==a?(this.techCall("setMuted",a),this):this.techGet("muted")||!1},vjs.Player.prototype.supportsFullScreen=function(){return this.techGet("supportsFullScreen")||!1},vjs.Player.prototype.isFullscreen_=!1,vjs.Player.prototype.isFullscreen=function(a){return void 0!==a?(this.isFullscreen_=!!a,this):this.isFullscreen_},vjs.Player.prototype.isFullScreen=function(a){return vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'),this.isFullscreen(a)},vjs.Player.prototype.requestFullscreen=function(){var a=vjs.browser.fullscreenAPI;return this.isFullscreen(!0),a?(vjs.on(document,a.fullscreenchange,vjs.bind(this,function(){this.isFullscreen(document[a.fullscreenElement]),this.isFullscreen()===!1&&vjs.off(document,a.fullscreenchange,arguments.callee),this.trigger("fullscreenchange")})),this.el_[a.requestFullscreen]()):this.tech.supportsFullScreen()?this.techCall("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},vjs.Player.prototype.requestFullScreen=function(){return vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'),this.requestFullscreen()},vjs.Player.prototype.exitFullscreen=function(){var a=vjs.browser.fullscreenAPI;return this.isFullscreen(!1),a?document[a.exitFullscreen]():this.tech.supportsFullScreen()?this.techCall("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},vjs.Player.prototype.cancelFullScreen=function(){return vjs.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"),this.exitFullscreen()},vjs.Player.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=document.documentElement.style.overflow,vjs.on(document,"keydown",vjs.bind(this,this.fullWindowOnEscKey)),document.documentElement.style.overflow="hidden",vjs.addClass(document.body,"vjs-full-window"),this.trigger("enterFullWindow")},vjs.Player.prototype.fullWindowOnEscKey=function(a){27===a.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},vjs.Player.prototype.exitFullWindow=function(){this.isFullWindow=!1,vjs.off(document,"keydown",this.fullWindowOnEscKey),document.documentElement.style.overflow=this.docOrigOverflow,vjs.removeClass(document.body,"vjs-full-window"),this.trigger("exitFullWindow")},vjs.Player.prototype.selectSource=function(a){for(var b=0,c=this.options_.techOrder;b<c.length;b++){var d=vjs.capitalize(c[b]),e=window.videojs[d];if(e){if(e.isSupported())for(var f=0,g=a;f<g.length;f++){var h=g[f];if(e.canPlaySource(h))return{source:h,tech:d}}}else vjs.log.error('The "'+d+'" tech is undefined. Skipped browser support check for that tech.')}return!1},vjs.Player.prototype.src=function(a){return void 0===a?this.techGet("src"):(vjs.obj.isArray(a)?this.sourceList_(a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!window.videojs[this.techName].canPlaySource(a)?this.sourceList_([a]):(this.cache_.src=a.src,this.currentType_=a.type||"",this.ready(function(){this.techCall("src",a.src),"auto"==this.options_.preload&&this.load(),this.options_.autoplay&&this.play()}))),this)},vjs.Player.prototype.sourceList_=function(a){var b,c=this.selectSource(a);c?c.tech===this.techName?this.src(c.source):this.loadTech(c.tech,c.source):(b=setTimeout(vjs.bind(this,function(){this.error({code:4,message:this.localize(this.options().notSupportedMessage)})}),0),this.triggerReady(),this.on("dispose",function(){clearTimeout(b)}))},vjs.Player.prototype.load=function(){return this.techCall("load"),this},vjs.Player.prototype.currentSrc=function(){return this.techGet("currentSrc")||this.cache_.src||""},vjs.Player.prototype.currentType=function(){return this.currentType_||""},vjs.Player.prototype.preload=function(a){return void 0!==a?(this.techCall("setPreload",a),this.options_.preload=a,this):this.techGet("preload")},vjs.Player.prototype.autoplay=function(a){return void 0!==a?(this.techCall("setAutoplay",a),this.options_.autoplay=a,this):this.techGet("autoplay",a)},vjs.Player.prototype.loop=function(a){return void 0!==a?(this.techCall("setLoop",a),this.options_.loop=a,this):this.techGet("loop")},vjs.Player.prototype.poster_,vjs.Player.prototype.poster=function(a){return void 0===a?this.poster_:(this.poster_=a,this.techCall("setPoster",a),void this.trigger("posterchange"))},vjs.Player.prototype.controls_,vjs.Player.prototype.controls=function(a){return void 0!==a?(a=!!a,this.controls_!==a&&(this.controls_=a,a?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled")):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"))),this):this.controls_},vjs.Player.prototype.usingNativeControls_,vjs.Player.prototype.usingNativeControls=function(a){return void 0!==a?(a=!!a,this.usingNativeControls_!==a&&(this.usingNativeControls_=a,a?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):this.usingNativeControls_},vjs.Player.prototype.error_=null,vjs.Player.prototype.error=function(a){return void 0===a?this.error_:null===a?(this.error_=a,this.removeClass("vjs-error"),this):(this.error_=a instanceof vjs.MediaError?a:new vjs.MediaError(a),this.trigger("error"),this.addClass("vjs-error"),vjs.log.error("(CODE:"+this.error_.code+" "+vjs.MediaError.errorTypes[this.error_.code]+")",this.error_.message,this.error_),this)},vjs.Player.prototype.ended=function(){return this.techGet("ended")},vjs.Player.prototype.seeking=function(){return this.techGet("seeking")},vjs.Player.prototype.userActivity_=!0,vjs.Player.prototype.reportUserActivity=function(){this.userActivity_=!0},vjs.Player.prototype.userActive_=!0,vjs.Player.prototype.userActive=function(a){return void 0!==a?(a=!!a,a!==this.userActive_&&(this.userActive_=a,a?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech&&this.tech.one("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},vjs.Player.prototype.listenForUserActivity=function(){var a,b,c,d,e,f,g,h,i;a=vjs.bind(this,this.reportUserActivity),b=function(b){(b.screenX!=h||b.screenY!=i)&&(h=b.screenX,i=b.screenY,a())},c=function(){a(),clearInterval(d),d=setInterval(a,250)},e=function(){a(),clearInterval(d)},this.on("mousedown",c),this.on("mousemove",b),this.on("mouseup",e),this.on("keydown",a),this.on("keyup",a),f=setInterval(vjs.bind(this,function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),clearTimeout(g);var a=this.options().inactivityTimeout;a>0&&(g=setTimeout(vjs.bind(this,function(){this.userActivity_||this.userActive(!1)}),a))}}),250),this.on("dispose",function(){clearInterval(f),clearTimeout(g)})},vjs.Player.prototype.playbackRate=function(a){return void 0!==a?(this.techCall("setPlaybackRate",a),this):this.tech&&this.tech.featuresPlaybackRate?this.techGet("playbackRate"):1},vjs.ControlBar=vjs.Component.extend(),vjs.ControlBar.prototype.options_={loadEvent:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{}}},vjs.ControlBar.prototype.createEl=function(){return vjs.createEl("div",{className:"vjs-control-bar"})},vjs.LiveDisplay=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.LiveDisplay.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-live-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE"),"aria-live":"off"}),a.appendChild(this.contentEl_),a},vjs.PlayToggle=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b),a.on("play",vjs.bind(this,this.onPlay)),a.on("pause",vjs.bind(this,this.onPause))}}),vjs.PlayToggle.prototype.buttonText="Play",vjs.PlayToggle.prototype.buildCSSClass=function(){return"vjs-play-control "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.PlayToggle.prototype.onClick=function(){this.player_.paused()?this.player_.play():this.player_.pause()},vjs.PlayToggle.prototype.onPlay=function(){vjs.removeClass(this.el_,"vjs-paused"),vjs.addClass(this.el_,"vjs-playing"),this.el_.children[0].children[0].innerHTML=this.localize("Pause")},vjs.PlayToggle.prototype.onPause=function(){vjs.removeClass(this.el_,"vjs-playing"),vjs.addClass(this.el_,"vjs-paused"),this.el_.children[0].children[0].innerHTML=this.localize("Play")},vjs.CurrentTimeDisplay=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),a.on("timeupdate",vjs.bind(this,this.updateContent))}}),vjs.CurrentTimeDisplay.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"}),a.appendChild(this.contentEl_),a},vjs.CurrentTimeDisplay.prototype.updateContent=function(){var a=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Current Time")+"</span> "+vjs.formatTime(a,this.player_.duration())},vjs.DurationDisplay=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),a.on("timeupdate",vjs.bind(this,this.updateContent))}}),vjs.DurationDisplay.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00","aria-live":"off"}),a.appendChild(this.contentEl_),a},vjs.DurationDisplay.prototype.updateContent=function(){var a=this.player_.duration();a&&(this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> "+vjs.formatTime(a))},vjs.TimeDivider=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.TimeDivider.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},vjs.RemainingTimeDisplay=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),a.on("timeupdate",vjs.bind(this,this.updateContent))}}),vjs.RemainingTimeDisplay.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00","aria-live":"off"}),a.appendChild(this.contentEl_),a},vjs.RemainingTimeDisplay.prototype.updateContent=function(){this.player_.duration()&&(this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -"+vjs.formatTime(this.player_.remainingTime()))},vjs.FullscreenToggle=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b)}}),vjs.FullscreenToggle.prototype.buttonText="Fullscreen",vjs.FullscreenToggle.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.FullscreenToggle.prototype.onClick=function(){this.player_.isFullscreen()?(this.player_.exitFullscreen(),this.controlText_.innerHTML=this.localize("Fullscreen")):(this.player_.requestFullscreen(),this.controlText_.innerHTML=this.localize("Non-Fullscreen"))},vjs.ProgressControl=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.ProgressControl.prototype.options_={children:{seekBar:{}}},vjs.ProgressControl.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},vjs.SeekBar=vjs.Slider.extend({init:function(a,b){vjs.Slider.call(this,a,b),a.on("timeupdate",vjs.bind(this,this.updateARIAAttributes)),a.ready(vjs.bind(this,this.updateARIAAttributes))}}),vjs.SeekBar.prototype.options_={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"},vjs.SeekBar.prototype.playerEvent="timeupdate",vjs.SeekBar.prototype.createEl=function(){return vjs.Slider.prototype.createEl.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})},vjs.SeekBar.prototype.updateARIAAttributes=function(){var a=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("aria-valuenow",vjs.round(100*this.getPercent(),2)),this.el_.setAttribute("aria-valuetext",vjs.formatTime(a,this.player_.duration()))},vjs.SeekBar.prototype.getPercent=function(){return this.player_.currentTime()/this.player_.duration()},vjs.SeekBar.prototype.onMouseDown=function(a){vjs.Slider.prototype.onMouseDown.call(this,a),this.player_.scrubbing=!0,this.videoWasPlaying=!this.player_.paused(),this.player_.pause()},vjs.SeekBar.prototype.onMouseMove=function(a){var b=this.calculateDistance(a)*this.player_.duration();b==this.player_.duration()&&(b-=.1),this.player_.currentTime(b)},vjs.SeekBar.prototype.onMouseUp=function(a){vjs.Slider.prototype.onMouseUp.call(this,a),this.player_.scrubbing=!1,this.videoWasPlaying&&this.player_.play()},vjs.SeekBar.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},vjs.SeekBar.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},vjs.LoadProgressBar=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),a.on("progress",vjs.bind(this,this.update))}}),vjs.LoadProgressBar.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},vjs.LoadProgressBar.prototype.update=function(){var a,b,c,d,e=this.player_.buffered(),f=this.player_.duration(),g=this.player_.bufferedEnd(),h=this.el_.children,i=function(a,b){var c=a/b||0;return 100*c+"%"};for(this.el_.style.width=i(g,f),a=0;a<e.length;a++)b=e.start(a),c=e.end(a),d=h[a],d||(d=this.el_.appendChild(vjs.createEl())),d.style.left=i(b,g),d.style.width=i(c-b,g);for(a=h.length;a>e.length;a--)this.el_.removeChild(h[a-1])},vjs.PlayProgressBar=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.PlayProgressBar.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},vjs.SeekHandle=vjs.SliderHandle.extend({init:function(a,b){vjs.SliderHandle.call(this,a,b),a.on("timeupdate",vjs.bind(this,this.updateContent))}}),vjs.SeekHandle.prototype.defaultValue="00:00",vjs.SeekHandle.prototype.createEl=function(){return vjs.SliderHandle.prototype.createEl.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})},vjs.SeekHandle.prototype.updateContent=function(){var a=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.innerHTML='<span class="vjs-control-text">'+vjs.formatTime(a,this.player_.duration())+"</span>"},vjs.VolumeControl=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),a.tech&&a.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),a.on("loadstart",vjs.bind(this,function(){a.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}))}}),vjs.VolumeControl.prototype.options_={children:{volumeBar:{}}},vjs.VolumeControl.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},vjs.VolumeBar=vjs.Slider.extend({init:function(a,b){vjs.Slider.call(this,a,b),a.on("volumechange",vjs.bind(this,this.updateARIAAttributes)),a.ready(vjs.bind(this,this.updateARIAAttributes))}}),vjs.VolumeBar.prototype.updateARIAAttributes=function(){this.el_.setAttribute("aria-valuenow",vjs.round(100*this.player_.volume(),2)),this.el_.setAttribute("aria-valuetext",vjs.round(100*this.player_.volume(),2)+"%")},vjs.VolumeBar.prototype.options_={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"},vjs.VolumeBar.prototype.playerEvent="volumechange",vjs.VolumeBar.prototype.createEl=function(){return vjs.Slider.prototype.createEl.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})},vjs.VolumeBar.prototype.onMouseMove=function(a){this.player_.muted()&&this.player_.muted(!1),this.player_.volume(this.calculateDistance(a))},vjs.VolumeBar.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},vjs.VolumeBar.prototype.stepForward=function(){this.player_.volume(this.player_.volume()+.1)},vjs.VolumeBar.prototype.stepBack=function(){this.player_.volume(this.player_.volume()-.1)},vjs.VolumeLevel=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.VolumeLevel.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},vjs.VolumeHandle=vjs.SliderHandle.extend(),vjs.VolumeHandle.prototype.defaultValue="00:00",vjs.VolumeHandle.prototype.createEl=function(){return vjs.SliderHandle.prototype.createEl.call(this,"div",{className:"vjs-volume-handle"})},vjs.MuteToggle=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b),a.on("volumechange",vjs.bind(this,this.update)),a.tech&&a.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),a.on("loadstart",vjs.bind(this,function(){a.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}))}}),vjs.MuteToggle.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.localize("Mute")+"</span></div>"})},vjs.MuteToggle.prototype.onClick=function(){this.player_.muted(this.player_.muted()?!1:!0)},vjs.MuteToggle.prototype.update=function(){var a=this.player_.volume(),b=3;0===a||this.player_.muted()?b=0:.33>a?b=1:.67>a&&(b=2),this.player_.muted()?this.el_.children[0].children[0].innerHTML!=this.localize("Unmute")&&(this.el_.children[0].children[0].innerHTML=this.localize("Unmute")):this.el_.children[0].children[0].innerHTML!=this.localize("Mute")&&(this.el_.children[0].children[0].innerHTML=this.localize("Mute"));for(var c=0;4>c;c++)vjs.removeClass(this.el_,"vjs-vol-"+c);vjs.addClass(this.el_,"vjs-vol-"+b)},vjs.VolumeMenuButton=vjs.MenuButton.extend({init:function(a,b){vjs.MenuButton.call(this,a,b),a.on("volumechange",vjs.bind(this,this.update)),a.tech&&a.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),a.on("loadstart",vjs.bind(this,function(){a.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")})),this.addClass("vjs-menu-button")}}),vjs.VolumeMenuButton.prototype.createMenu=function(){var a=new vjs.Menu(this.player_,{contentElType:"div"}),b=new vjs.VolumeBar(this.player_,vjs.obj.merge({vertical:!0},this.options_.volumeBar));return a.addChild(b),a},vjs.VolumeMenuButton.prototype.onClick=function(){vjs.MuteToggle.prototype.onClick.call(this),vjs.MenuButton.prototype.onClick.call(this)},vjs.VolumeMenuButton.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.localize("Mute")+"</span></div>"})},vjs.VolumeMenuButton.prototype.update=vjs.MuteToggle.prototype.update,vjs.PlaybackRateMenuButton=vjs.MenuButton.extend({init:function(a,b){vjs.MenuButton.call(this,a,b),this.updateVisibility(),this.updateLabel(),a.on("loadstart",vjs.bind(this,this.updateVisibility)),a.on("ratechange",vjs.bind(this,this.updateLabel))}}),vjs.PlaybackRateMenuButton.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-playback-rate vjs-menu-button vjs-control",innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+this.localize("Playback Rate")+"</span></div>"});return this.labelEl_=vjs.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),a.appendChild(this.labelEl_),a},vjs.PlaybackRateMenuButton.prototype.createMenu=function(){var a=new vjs.Menu(this.player()),b=this.player().options().playbackRates;if(b)for(var c=b.length-1;c>=0;c--)a.addChild(new vjs.PlaybackRateMenuItem(this.player(),{rate:b[c]+"x"}));return a},vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},vjs.PlaybackRateMenuButton.prototype.onClick=function(){for(var a=this.player().playbackRate(),b=this.player().options().playbackRates,c=b[0],d=0;d<b.length;d++)if(b[d]>a){c=b[d];break}this.player().playbackRate(c)},vjs.PlaybackRateMenuButton.prototype.playbackRateSupported=function(){return this.player().tech&&this.player().tech.featuresPlaybackRate&&this.player().options().playbackRates&&this.player().options().playbackRates.length>0},vjs.PlaybackRateMenuButton.prototype.updateVisibility=function(){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},vjs.PlaybackRateMenuButton.prototype.updateLabel=function(){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},vjs.PlaybackRateMenuItem=vjs.MenuItem.extend({contentElType:"button",init:function(a,b){var c=this.label=b.rate,d=this.rate=parseFloat(c,10);b.label=c,b.selected=1===d,vjs.MenuItem.call(this,a,b),this.player().on("ratechange",vjs.bind(this,this.update))}}),vjs.PlaybackRateMenuItem.prototype.onClick=function(){vjs.MenuItem.prototype.onClick.call(this),this.player().playbackRate(this.rate)},vjs.PlaybackRateMenuItem.prototype.update=function(){this.selected(this.player().playbackRate()==this.rate)},vjs.PosterImage=vjs.Button.extend({init:function(a,b){vjs.Button.call(this,a,b),a.poster()&&this.src(a.poster()),a.poster()&&a.controls()||this.hide(),a.on("posterchange",vjs.bind(this,function(){this.src(a.poster())})),a.on("play",vjs.bind(this,this.hide))}});var _backgroundSizeSupported="backgroundSize"in vjs.TEST_VID.style;if(vjs.PosterImage.prototype.createEl=function(){var a=vjs.createEl("div",{className:"vjs-poster",tabIndex:-1});return _backgroundSizeSupported||a.appendChild(vjs.createEl("img")),a},vjs.PosterImage.prototype.src=function(a){var b=this.el();void 0!==a&&(_backgroundSizeSupported?b.style.backgroundImage='url("'+a+'")':b.firstChild.src=a)},vjs.PosterImage.prototype.onClick=function(){this.player().controls()&&this.player_.play()},vjs.LoadingSpinner=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b)}}),vjs.LoadingSpinner.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner"})},vjs.BigPlayButton=vjs.Button.extend(),vjs.BigPlayButton.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})},vjs.BigPlayButton.prototype.onClick=function(){this.player_.play()},vjs.ErrorDisplay=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),this.update(),a.on("error",vjs.bind(this,this.update))}}),vjs.ErrorDisplay.prototype.createEl=function(){var a=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-error-display"});return this.contentEl_=vjs.createEl("div"),a.appendChild(this.contentEl_),a},vjs.ErrorDisplay.prototype.update=function(){this.player().error()&&(this.contentEl_.innerHTML=this.localize(this.player().error().message))},vjs.MediaTechController=vjs.Component.extend({init:function(a,b,c){b=b||{},b.reportTouchActivity=!1,vjs.Component.call(this,a,b,c),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),this.initControlsListeners()}}),vjs.MediaTechController.prototype.initControlsListeners=function(){var a,b,c,d;b=this,a=this.player();var c=function(){a.controls()&&!a.usingNativeControls()&&b.addControlsListeners()};d=vjs.bind(b,b.removeControlsListeners),this.ready(c),a.on("controlsenabled",c),a.on("controlsdisabled",d),this.ready(function(){this.networkState&&this.networkState()>0&&this.player().trigger("loadstart")})},vjs.MediaTechController.prototype.addControlsListeners=function(){var a;this.on("mousedown",this.onClick),this.on("touchstart",function(){a=this.player_.userActive()}),this.on("touchmove",function(){a&&this.player().reportUserActivity()}),this.on("touchend",function(a){a.preventDefault()}),this.emitTapEvents(),this.on("tap",this.onTap)},vjs.MediaTechController.prototype.removeControlsListeners=function(){this.off("tap"),this.off("touchstart"),this.off("touchmove"),this.off("touchleave"),this.off("touchcancel"),this.off("touchend"),this.off("click"),this.off("mousedown")},vjs.MediaTechController.prototype.onClick=function(a){0===a.button&&this.player().controls()&&(this.player().paused()?this.player().play():this.player().pause())},vjs.MediaTechController.prototype.onTap=function(){this.player().userActive(!this.player().userActive())},vjs.MediaTechController.prototype.manualProgressOn=function(){this.manualProgress=!0,this.trackProgress()},vjs.MediaTechController.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress()},vjs.MediaTechController.prototype.trackProgress=function(){this.progressInterval=setInterval(vjs.bind(this,function(){var a=this.player().bufferedPercent();this.bufferedPercent_!=a&&this.player().trigger("progress"),this.bufferedPercent_=a,1===a&&this.stopTrackingProgress()}),500)},vjs.MediaTechController.prototype.stopTrackingProgress=function(){clearInterval(this.progressInterval)},vjs.MediaTechController.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.player().on("play",vjs.bind(this,this.trackCurrentTime)),this.player().on("pause",vjs.bind(this,this.stopTrackingCurrentTime)),this.one("timeupdate",function(){this.featuresTimeupdateEvents=!0,this.manualTimeUpdatesOff()})},vjs.MediaTechController.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},vjs.MediaTechController.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=setInterval(vjs.bind(this,function(){this.player().trigger("timeupdate")}),250)},vjs.MediaTechController.prototype.stopTrackingCurrentTime=function(){clearInterval(this.currentTimeInterval),this.player().trigger("timeupdate")},vjs.MediaTechController.prototype.dispose=function(){this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),clearInterval(this.currentTimeInterval),vjs.Component.prototype.dispose.call(this)},vjs.MediaTechController.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.player().trigger("timeupdate")},vjs.MediaTechController.prototype.setPoster=function(){},vjs.MediaTechController.prototype.featuresVolumeControl=!0,vjs.MediaTechController.prototype.featuresFullscreenResize=!1,vjs.MediaTechController.prototype.featuresPlaybackRate=!1,vjs.MediaTechController.prototype.featuresProgressEvents=!1,vjs.MediaTechController.prototype.featuresTimeupdateEvents=!1,vjs.media={},vjs.Html5=vjs.MediaTechController.extend({init:function(a,b,c){this.featuresVolumeControl=vjs.Html5.canControlVolume(),this.featuresPlaybackRate=vjs.Html5.canControlPlaybackRate(),this.movingMediaElementInDOM=!vjs.IS_IOS,this.featuresFullscreenResize=!0,this.featuresProgressEvents=!0,vjs.MediaTechController.call(this,a,b,c),this.setupTriggers();var d=b.source;d&&this.el_.currentSrc!==d.src&&(this.el_.src=d.src),vjs.TOUCH_ENABLED&&a.options().nativeControlsForTouch!==!1&&this.useNativeControls(),a.ready(function(){this.tag&&this.options_.autoplay&&this.paused()&&(delete this.tag.poster,this.play())}),this.triggerReady()}}),vjs.Html5.prototype.dispose=function(){vjs.Html5.disposeMediaElement(this.el_),vjs.MediaTechController.prototype.dispose.call(this)},vjs.Html5.prototype.createEl=function(){var a,b=this.player_,c=b.tag;c&&this.movingMediaElementInDOM!==!1||(c?(a=c.cloneNode(!1),vjs.Html5.disposeMediaElement(c),c=a,b.tag=null):(c=vjs.createEl("video"),vjs.setElementAttributes(c,vjs.obj.merge(b.tagAttributes||{},{id:b.id()+"_html5_api","class":"vjs-tech"}))),c.player=b,vjs.insertFirst(c,b.el()));
for(var d=["autoplay","preload","loop","muted"],e=d.length-1;e>=0;e--){var f=d[e],g={};"undefined"!=typeof b.options_[f]&&(g[f]=b.options_[f]),vjs.setElementAttributes(c,g)}return c},vjs.Html5.prototype.setupTriggers=function(){for(var a=vjs.Html5.Events.length-1;a>=0;a--)vjs.on(this.el_,vjs.Html5.Events[a],vjs.bind(this,this.eventHandler))},vjs.Html5.prototype.eventHandler=function(a){"error"==a.type&&this.error()?this.player().error(this.error().code):(a.bubbles=!1,this.player().trigger(a))},vjs.Html5.prototype.useNativeControls=function(){var a,b,c,d,e;a=this,b=this.player(),a.setControls(b.controls()),c=function(){a.setControls(!0)},d=function(){a.setControls(!1)},b.on("controlsenabled",c),b.on("controlsdisabled",d),e=function(){b.off("controlsenabled",c),b.off("controlsdisabled",d)},a.on("dispose",e),b.on("usingcustomcontrols",e),b.usingNativeControls(!0)},vjs.Html5.prototype.play=function(){this.el_.play()},vjs.Html5.prototype.pause=function(){this.el_.pause()},vjs.Html5.prototype.paused=function(){return this.el_.paused},vjs.Html5.prototype.currentTime=function(){return this.el_.currentTime},vjs.Html5.prototype.setCurrentTime=function(a){try{this.el_.currentTime=a}catch(b){vjs.log(b,"Video is not ready. (Video.js)")}},vjs.Html5.prototype.duration=function(){return this.el_.duration||0},vjs.Html5.prototype.buffered=function(){return this.el_.buffered},vjs.Html5.prototype.volume=function(){return this.el_.volume},vjs.Html5.prototype.setVolume=function(a){this.el_.volume=a},vjs.Html5.prototype.muted=function(){return this.el_.muted},vjs.Html5.prototype.setMuted=function(a){this.el_.muted=a},vjs.Html5.prototype.width=function(){return this.el_.offsetWidth},vjs.Html5.prototype.height=function(){return this.el_.offsetHeight},vjs.Html5.prototype.supportsFullScreen=function(){return"function"!=typeof this.el_.webkitEnterFullScreen||!/Android/.test(vjs.USER_AGENT)&&/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)?!1:!0},vjs.Html5.prototype.enterFullScreen=function(){var a=this.el_;a.paused&&a.networkState<=a.HAVE_METADATA?(this.el_.play(),setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},vjs.Html5.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},vjs.Html5.prototype.src=function(a){return void 0===a?this.el_.src:void(this.el_.src=a)},vjs.Html5.prototype.load=function(){this.el_.load()},vjs.Html5.prototype.currentSrc=function(){return this.el_.currentSrc},vjs.Html5.prototype.poster=function(){return this.el_.poster},vjs.Html5.prototype.setPoster=function(a){this.el_.poster=a},vjs.Html5.prototype.preload=function(){return this.el_.preload},vjs.Html5.prototype.setPreload=function(a){this.el_.preload=a},vjs.Html5.prototype.autoplay=function(){return this.el_.autoplay},vjs.Html5.prototype.setAutoplay=function(a){this.el_.autoplay=a},vjs.Html5.prototype.controls=function(){return this.el_.controls},vjs.Html5.prototype.setControls=function(a){this.el_.controls=!!a},vjs.Html5.prototype.loop=function(){return this.el_.loop},vjs.Html5.prototype.setLoop=function(a){this.el_.loop=a},vjs.Html5.prototype.error=function(){return this.el_.error},vjs.Html5.prototype.seeking=function(){return this.el_.seeking},vjs.Html5.prototype.ended=function(){return this.el_.ended},vjs.Html5.prototype.defaultMuted=function(){return this.el_.defaultMuted},vjs.Html5.prototype.playbackRate=function(){return this.el_.playbackRate},vjs.Html5.prototype.setPlaybackRate=function(a){this.el_.playbackRate=a},vjs.Html5.prototype.networkState=function(){return this.el_.networkState},vjs.Html5.isSupported=function(){try{vjs.TEST_VID.volume=.5}catch(a){return!1}return!!vjs.TEST_VID.canPlayType},vjs.Html5.canPlaySource=function(a){try{return!!vjs.TEST_VID.canPlayType(a.type)}catch(b){return""}},vjs.Html5.canControlVolume=function(){var a=vjs.TEST_VID.volume;return vjs.TEST_VID.volume=a/2+.1,a!==vjs.TEST_VID.volume},vjs.Html5.canControlPlaybackRate=function(){var a=vjs.TEST_VID.playbackRate;return vjs.TEST_VID.playbackRate=a/2+.1,a!==vjs.TEST_VID.playbackRate},function(){var a,b=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,c=/^video\/mp4/i;vjs.Html5.patchCanPlayType=function(){vjs.ANDROID_VERSION>=4&&(a||(a=vjs.TEST_VID.constructor.prototype.canPlayType),vjs.TEST_VID.constructor.prototype.canPlayType=function(c){return c&&b.test(c)?"maybe":a.call(this,c)}),vjs.IS_OLD_ANDROID&&(a||(a=vjs.TEST_VID.constructor.prototype.canPlayType),vjs.TEST_VID.constructor.prototype.canPlayType=function(b){return b&&c.test(b)?"maybe":a.call(this,b)})},vjs.Html5.unpatchCanPlayType=function(){var b=vjs.TEST_VID.constructor.prototype.canPlayType;return vjs.TEST_VID.constructor.prototype.canPlayType=a,a=null,b},vjs.Html5.patchCanPlayType()}(),vjs.Html5.Events="loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","),vjs.Html5.disposeMediaElement=function(a){if(a){for(a.player=null,a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src"),"function"==typeof a.load&&!function(){try{a.load()}catch(b){}}()}},vjs.Flash=vjs.MediaTechController.extend({init:function(a,b,c){vjs.MediaTechController.call(this,a,b,c);var d=b.source,e=b.parentEl,f=this.el_=vjs.createEl("div",{id:a.id()+"_temp_flash"}),g=a.id()+"_flash_api",h=a.options_,i=vjs.obj.merge({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:h.autoplay,preload:h.preload,loop:h.loop,muted:h.muted},b.flashVars),j=vjs.obj.merge({wmode:"opaque",bgcolor:"#000000"},b.params),k=vjs.obj.merge({id:g,name:g,"class":"vjs-tech"},b.attributes);if(d)if(d.type&&vjs.Flash.isStreamingType(d.type)){var l=vjs.Flash.streamToParts(d.src);i.rtmpConnection=encodeURIComponent(l.connection),i.rtmpStream=encodeURIComponent(l.stream)}else i.src=encodeURIComponent(vjs.getAbsoluteURL(d.src));vjs.insertFirst(f,e),b.startTime&&this.ready(function(){this.load(),this.play(),this.currentTime(b.startTime)}),vjs.IS_FIREFOX&&this.ready(function(){vjs.on(this.el(),"mousemove",vjs.bind(this,function(){this.player().trigger({type:"mousemove",bubbles:!1})}))}),a.on("stageclick",a.reportUserActivity),this.el_=vjs.Flash.embed(b.swf,f,i,j,k)}}),vjs.Flash.prototype.dispose=function(){vjs.MediaTechController.prototype.dispose.call(this)},vjs.Flash.prototype.play=function(){this.el_.vjs_play()},vjs.Flash.prototype.pause=function(){this.el_.vjs_pause()},vjs.Flash.prototype.src=function(a){if(void 0===a)return this.currentSrc();if(vjs.Flash.isStreamingSrc(a)?(a=vjs.Flash.streamToParts(a),this.setRtmpConnection(a.connection),this.setRtmpStream(a.stream)):(a=vjs.getAbsoluteURL(a),this.el_.vjs_src(a)),this.player_.autoplay()){var b=this;setTimeout(function(){b.play()},0)}},vjs.Flash.prototype.setCurrentTime=function(a){this.lastSeekTarget_=a,this.el_.vjs_setProperty("currentTime",a),vjs.MediaTechController.prototype.setCurrentTime.call(this)},vjs.Flash.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},vjs.Flash.prototype.currentSrc=function(){var a=this.el_.vjs_getProperty("currentSrc");if(null==a){var b=this.rtmpConnection(),c=this.rtmpStream();b&&c&&(a=vjs.Flash.streamFromParts(b,c))}return a},vjs.Flash.prototype.load=function(){this.el_.vjs_load()},vjs.Flash.prototype.poster=function(){this.el_.vjs_getProperty("poster")},vjs.Flash.prototype.setPoster=function(){},vjs.Flash.prototype.buffered=function(){return vjs.createTimeRange(0,this.el_.vjs_getProperty("buffered"))},vjs.Flash.prototype.supportsFullScreen=function(){return!1},vjs.Flash.prototype.enterFullScreen=function(){return!1},function(){function a(a){var b=a.charAt(0).toUpperCase()+a.slice(1);d["set"+b]=function(b){return this.el_.vjs_setProperty(a,b)}}function b(a){d[a]=function(){return this.el_.vjs_getProperty(a)}}var c,d=vjs.Flash.prototype,e="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),f="error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(",");for(c=0;c<e.length;c++)b(e[c]),a(e[c]);for(c=0;c<f.length;c++)b(f[c])}(),vjs.Flash.isSupported=function(){return vjs.Flash.version()[0]>=10},vjs.Flash.canPlaySource=function(a){var b;return a.type?(b=a.type.replace(/;.*/,"").toLowerCase(),b in vjs.Flash.formats||b in vjs.Flash.streamingFormats?"maybe":void 0):""},vjs.Flash.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},vjs.Flash.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},vjs.Flash.onReady=function(a){var b,c;b=vjs.el(a),c=b&&b.parentNode&&b.parentNode.player,c&&(b.player=c,vjs.Flash.checkReady(c.tech))},vjs.Flash.checkReady=function(a){a.el()&&(a.el().vjs_getProperty?a.triggerReady():setTimeout(function(){vjs.Flash.checkReady(a)},50))},vjs.Flash.onEvent=function(a,b){var c=vjs.el(a).player;c.trigger(b)},vjs.Flash.onError=function(a,b){var c=vjs.el(a).player,d="FLASH: "+b;c.error("srcnotfound"==b?{code:4,message:d}:d)},vjs.Flash.version=function(){var a="0,0,0";try{a=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},vjs.Flash.embed=function(a,b,c,d,e){var f=vjs.Flash.getEmbedCode(a,c,d,e),g=vjs.createEl("div",{innerHTML:f}).childNodes[0],h=b.parentNode;b.parentNode.replaceChild(g,b);var i=h.childNodes[0];return setTimeout(function(){i.style.display="block"},1e3),g},vjs.Flash.getEmbedCode=function(a,b,c,d){var e='<object type="application/x-shockwave-flash"',f="",g="",h="";return b&&vjs.obj.each(b,function(a,b){f+=a+"="+b+"&amp;"}),c=vjs.obj.merge({movie:a,flashvars:f,allowScriptAccess:"always",allowNetworking:"all"},c),vjs.obj.each(c,function(a,b){g+='<param name="'+a+'" value="'+b+'" />'}),d=vjs.obj.merge({data:a,width:"100%",height:"100%"},d),vjs.obj.each(d,function(a,b){h+=a+'="'+b+'" '}),e+h+">"+g+"</object>"},vjs.Flash.streamFromParts=function(a,b){return a+"&"+b},vjs.Flash.streamToParts=function(a){var b={connection:"",stream:""};if(!a)return b;var c,d=a.indexOf("&");return-1!==d?c=d+1:(d=c=a.lastIndexOf("/")+1,0===d&&(d=c=a.length)),b.connection=a.substring(0,d),b.stream=a.substring(c,a.length),b},vjs.Flash.isStreamingType=function(a){return a in vjs.Flash.streamingFormats},vjs.Flash.RTMP_RE=/^rtmp[set]?:\/\//i,vjs.Flash.isStreamingSrc=function(a){return vjs.Flash.RTMP_RE.test(a)},vjs.MediaLoader=vjs.Component.extend({init:function(a,b,c){if(vjs.Component.call(this,a,b,c),a.options_.sources&&0!==a.options_.sources.length)a.src(a.options_.sources);else for(var d=0,e=a.options_.techOrder;d<e.length;d++){var f=vjs.capitalize(e[d]),g=window.videojs[f];if(g&&g.isSupported()){a.loadTech(f);break}}}}),vjs.Player.prototype.textTracks_,vjs.Player.prototype.textTracks=function(){return this.textTracks_=this.textTracks_||[],this.textTracks_},vjs.Player.prototype.addTextTrack=function(a,b,c,d){var e=this.textTracks_=this.textTracks_||[];d=d||{},d.kind=a,d.label=b,d.language=c;var f=vjs.capitalize(a||"subtitles"),g=new window.videojs[f+"Track"](this,d);return e.push(g),g.dflt()&&this.ready(function(){setTimeout(function(){g.player().showTextTrack(g.id())},0)}),g},vjs.Player.prototype.addTextTracks=function(a){for(var b,c=0;c<a.length;c++)b=a[c],this.addTextTrack(b.kind,b.label,b.language,b);return this},vjs.Player.prototype.showTextTrack=function(a,b){for(var c,d,e,f=this.textTracks_,g=0,h=f.length;h>g;g++)c=f[g],c.id()===a?(c.show(),d=c):b&&c.kind()==b&&c.mode()>0&&c.disable();return e=d?d.kind():b?b:!1,e&&this.trigger(e+"trackchange"),this},vjs.TextTrack=vjs.Component.extend({init:function(a,b){vjs.Component.call(this,a,b),this.id_=b.id||"vjs_"+b.kind+"_"+b.language+"_"+vjs.guid++,this.src_=b.src,this.dflt_=b["default"]||b.dflt,this.title_=b.title,this.language_=b.srclang,this.label_=b.label,this.cues_=[],this.activeCues_=[],this.readyState_=0,this.mode_=0,this.player_.on("fullscreenchange",vjs.bind(this,this.adjustFontSize))}}),vjs.TextTrack.prototype.kind_,vjs.TextTrack.prototype.kind=function(){return this.kind_},vjs.TextTrack.prototype.src_,vjs.TextTrack.prototype.src=function(){return this.src_},vjs.TextTrack.prototype.dflt_,vjs.TextTrack.prototype.dflt=function(){return this.dflt_},vjs.TextTrack.prototype.title_,vjs.TextTrack.prototype.title=function(){return this.title_},vjs.TextTrack.prototype.language_,vjs.TextTrack.prototype.language=function(){return this.language_},vjs.TextTrack.prototype.label_,vjs.TextTrack.prototype.label=function(){return this.label_},vjs.TextTrack.prototype.cues_,vjs.TextTrack.prototype.cues=function(){return this.cues_},vjs.TextTrack.prototype.activeCues_,vjs.TextTrack.prototype.activeCues=function(){return this.activeCues_},vjs.TextTrack.prototype.readyState_,vjs.TextTrack.prototype.readyState=function(){return this.readyState_},vjs.TextTrack.prototype.mode_,vjs.TextTrack.prototype.mode=function(){return this.mode_},vjs.TextTrack.prototype.adjustFontSize=function(){this.el_.style.fontSize=this.player_.isFullscreen()?screen.width/this.player_.width()*1.4*100+"%":""},vjs.TextTrack.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-"+this.kind_+" vjs-text-track"})},vjs.TextTrack.prototype.show=function(){this.activate(),this.mode_=2,vjs.Component.prototype.show.call(this)},vjs.TextTrack.prototype.hide=function(){this.activate(),this.mode_=1,vjs.Component.prototype.hide.call(this)},vjs.TextTrack.prototype.disable=function(){2==this.mode_&&this.hide(),this.deactivate(),this.mode_=0},vjs.TextTrack.prototype.activate=function(){0===this.readyState_&&this.load(),0===this.mode_&&(this.player_.on("timeupdate",vjs.bind(this,this.update,this.id_)),this.player_.on("ended",vjs.bind(this,this.reset,this.id_)),("captions"===this.kind_||"subtitles"===this.kind_)&&this.player_.getChild("textTrackDisplay").addChild(this))},vjs.TextTrack.prototype.deactivate=function(){this.player_.off("timeupdate",vjs.bind(this,this.update,this.id_)),this.player_.off("ended",vjs.bind(this,this.reset,this.id_)),this.reset(),this.player_.getChild("textTrackDisplay").removeChild(this)},vjs.TextTrack.prototype.load=function(){0===this.readyState_&&(this.readyState_=1,vjs.get(this.src_,vjs.bind(this,this.parseCues),vjs.bind(this,this.onError)))},vjs.TextTrack.prototype.onError=function(a){this.error=a,this.readyState_=3,this.trigger("error")},vjs.TextTrack.prototype.parseCues=function(a){for(var b,c,d,e,f=a.split("\n"),g="",h=1,i=f.length;i>h;h++)if(g=vjs.trim(f[h])){for(-1==g.indexOf("-->")?(e=g,g=vjs.trim(f[++h])):e=this.cues_.length,b={id:e,index:this.cues_.length},c=g.split(/[\t ]+/),b.startTime=this.parseCueTime(c[0]),b.endTime=this.parseCueTime(c[2]),d=[];f[++h]&&(g=vjs.trim(f[h]));)d.push(g);b.text=d.join("<br/>"),this.cues_.push(b)}this.readyState_=2,this.trigger("loaded")},vjs.TextTrack.prototype.parseCueTime=function(a){var b,c,d,e,f,g=a.split(":"),h=0;return 3==g.length?(b=g[0],c=g[1],d=g[2]):(b=0,c=g[0],d=g[1]),d=d.split(/\s+/),e=d.splice(0,1)[0],e=e.split(/\.|,/),f=parseFloat(e[1]),e=e[0],h+=3600*parseFloat(b),h+=60*parseFloat(c),h+=parseFloat(e),f&&(h+=f/1e3),h},vjs.TextTrack.prototype.update=function(){if(this.cues_.length>0){var a=this.player_.options().trackTimeOffset||0,b=this.player_.currentTime()+a;if(void 0===this.prevChange||b<this.prevChange||this.nextChange<=b){var c,d,e,f,g=this.cues_,h=this.player_.duration(),i=0,j=!1,k=[];for(b>=this.nextChange||void 0===this.nextChange?f=void 0!==this.firstActiveIndex?this.firstActiveIndex:0:(j=!0,f=void 0!==this.lastActiveIndex?this.lastActiveIndex:g.length-1);;){if(e=g[f],e.endTime<=b)i=Math.max(i,e.endTime),e.active&&(e.active=!1);else if(b<e.startTime){if(h=Math.min(h,e.startTime),e.active&&(e.active=!1),!j)break}else j?(k.splice(0,0,e),void 0===d&&(d=f),c=f):(k.push(e),void 0===c&&(c=f),d=f),h=Math.min(h,e.endTime),i=Math.max(i,e.startTime),e.active=!0;if(j){if(0===f)break;f--}else{if(f===g.length-1)break;f++}}this.activeCues_=k,this.nextChange=h,this.prevChange=i,this.firstActiveIndex=c,this.lastActiveIndex=d,this.updateDisplay(),this.trigger("cuechange")}}},vjs.TextTrack.prototype.updateDisplay=function(){for(var a=this.activeCues_,b="",c=0,d=a.length;d>c;c++)b+='<span class="vjs-tt-cue">'+a[c].text+"</span>";this.el_.innerHTML=b},vjs.TextTrack.prototype.reset=function(){this.nextChange=0,this.prevChange=this.player_.duration(),this.firstActiveIndex=0,this.lastActiveIndex=0},vjs.CaptionsTrack=vjs.TextTrack.extend(),vjs.CaptionsTrack.prototype.kind_="captions",vjs.SubtitlesTrack=vjs.TextTrack.extend(),vjs.SubtitlesTrack.prototype.kind_="subtitles",vjs.ChaptersTrack=vjs.TextTrack.extend(),vjs.ChaptersTrack.prototype.kind_="chapters",vjs.TextTrackDisplay=vjs.Component.extend({init:function(a,b,c){vjs.Component.call(this,a,b,c),a.options_.tracks&&a.options_.tracks.length>0&&this.player_.addTextTracks(a.options_.tracks)}}),vjs.TextTrackDisplay.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"})},vjs.TextTrackMenuItem=vjs.MenuItem.extend({init:function(a,b){var c=this.track=b.track;b.label=c.label(),b.selected=c.dflt(),vjs.MenuItem.call(this,a,b),this.player_.on(c.kind()+"trackchange",vjs.bind(this,this.update))}}),vjs.TextTrackMenuItem.prototype.onClick=function(){vjs.MenuItem.prototype.onClick.call(this),this.player_.showTextTrack(this.track.id_,this.track.kind())},vjs.TextTrackMenuItem.prototype.update=function(){this.selected(2==this.track.mode())},vjs.OffTextTrackMenuItem=vjs.TextTrackMenuItem.extend({init:function(a,b){b.track={kind:function(){return b.kind},player:a,label:function(){return b.kind+" off"},dflt:function(){return!1},mode:function(){return!1}},vjs.TextTrackMenuItem.call(this,a,b),this.selected(!0)}}),vjs.OffTextTrackMenuItem.prototype.onClick=function(){vjs.TextTrackMenuItem.prototype.onClick.call(this),this.player_.showTextTrack(this.track.id_,this.track.kind())},vjs.OffTextTrackMenuItem.prototype.update=function(){for(var a,b=this.player_.textTracks(),c=0,d=b.length,e=!0;d>c;c++)a=b[c],a.kind()==this.track.kind()&&2==a.mode()&&(e=!1);this.selected(e)},vjs.TextTrackButton=vjs.MenuButton.extend({init:function(a,b){vjs.MenuButton.call(this,a,b),this.items.length<=1&&this.hide()}}),vjs.TextTrackButton.prototype.createItems=function(){var a,b=[];b.push(new vjs.OffTextTrackMenuItem(this.player_,{kind:this.kind_}));for(var c=0;c<this.player_.textTracks().length;c++)a=this.player_.textTracks()[c],a.kind()===this.kind_&&b.push(new vjs.TextTrackMenuItem(this.player_,{track:a}));return b},vjs.CaptionsButton=vjs.TextTrackButton.extend({init:function(a,b,c){vjs.TextTrackButton.call(this,a,b,c),this.el_.setAttribute("aria-label","Captions Menu")}}),vjs.CaptionsButton.prototype.kind_="captions",vjs.CaptionsButton.prototype.buttonText="Captions",vjs.CaptionsButton.prototype.className="vjs-captions-button",vjs.SubtitlesButton=vjs.TextTrackButton.extend({init:function(a,b,c){vjs.TextTrackButton.call(this,a,b,c),this.el_.setAttribute("aria-label","Subtitles Menu")}}),vjs.SubtitlesButton.prototype.kind_="subtitles",vjs.SubtitlesButton.prototype.buttonText="Subtitles",vjs.SubtitlesButton.prototype.className="vjs-subtitles-button",vjs.ChaptersButton=vjs.TextTrackButton.extend({init:function(a,b,c){vjs.TextTrackButton.call(this,a,b,c),this.el_.setAttribute("aria-label","Chapters Menu")}}),vjs.ChaptersButton.prototype.kind_="chapters",vjs.ChaptersButton.prototype.buttonText="Chapters",vjs.ChaptersButton.prototype.className="vjs-chapters-button",vjs.ChaptersButton.prototype.createItems=function(){for(var a,b=[],c=0;c<this.player_.textTracks().length;c++)a=this.player_.textTracks()[c],a.kind()===this.kind_&&b.push(new vjs.TextTrackMenuItem(this.player_,{track:a}));return b},vjs.ChaptersButton.prototype.createMenu=function(){for(var a,b,c=this.player_.textTracks(),d=0,e=c.length,f=this.items=[];e>d;d++)if(a=c[d],a.kind()==this.kind_){if(0!==a.readyState()){b=a;break}a.load(),a.on("loaded",vjs.bind(this,this.createMenu))}var g=this.menu;if(void 0===g&&(g=new vjs.Menu(this.player_),g.contentEl().appendChild(vjs.createEl("li",{className:"vjs-menu-title",innerHTML:vjs.capitalize(this.kind_),tabindex:-1}))),b){var h,i,j=b.cues_;for(d=0,e=j.length;e>d;d++)h=j[d],i=new vjs.ChaptersTrackMenuItem(this.player_,{track:b,cue:h}),f.push(i),g.addChild(i);this.addChild(g)}return this.items.length>0&&this.show(),g},vjs.ChaptersTrackMenuItem=vjs.MenuItem.extend({init:function(a,b){var c=this.track=b.track,d=this.cue=b.cue,e=a.currentTime();b.label=d.text,b.selected=d.startTime<=e&&e<d.endTime,vjs.MenuItem.call(this,a,b),c.on("cuechange",vjs.bind(this,this.update))}}),vjs.ChaptersTrackMenuItem.prototype.onClick=function(){vjs.MenuItem.prototype.onClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},vjs.ChaptersTrackMenuItem.prototype.update=function(){var a=this.cue,b=this.player_.currentTime();this.selected(a.startTime<=b&&b<a.endTime)},vjs.obj.merge(vjs.ControlBar.prototype.options_.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}}),vjs.JSON,"undefined"!=typeof window.JSON&&"function"===window.JSON.parse)vjs.JSON=window.JSON;else{vjs.JSON={};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;vjs.JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")}}vjs.autoSetup=function(){var a,b,c,d=document.getElementsByTagName("video");if(d&&d.length>0)for(var e=0,f=d.length;f>e;e++){if(b=d[e],!b||!b.getAttribute){vjs.autoSetupTimeout(1);break}void 0===b.player&&(a=b.getAttribute("data-setup"),null!==a&&(a=vjs.JSON.parse(a||"{}"),c=videojs(b,a)))}else vjs.windowLoaded||vjs.autoSetupTimeout(1)},vjs.autoSetupTimeout=function(a){setTimeout(vjs.autoSetup,a)},"complete"===document.readyState?vjs.windowLoaded=!0:vjs.one(window,"load",function(){vjs.windowLoaded=!0}),vjs.autoSetupTimeout(1),vjs.plugin=function(a,b){vjs.Player.prototype[a]=b};
/*
* videojs-ga - v0.4.1 - 2014-06-06
* Copyright (c) 2014 Michael Bensoussan
* Licensed MIT
*/
(function(){var a=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};videojs.plugin("ga",function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;null==b&&(b={}),c={},this.options()["data-setup"]&&(l=JSON.parse(this.options()["data-setup"]),l.ga&&(c=l.ga)),d=["loaded","percentsPlayed","start","end","seek","play","pause","resize","volumeChange","error","fullscreen"],i=b.eventsToTrack||c.eventsToTrack||d,o=b.percentsPlayedInterval||c.percentsPlayedInterval||10,g=b.eventCategory||c.eventCategory||"Video",h=b.eventLabel||c.eventLabel,n=[],s=r=0,t=!1,k=function(){h||(h=this.currentSrc().split("/").slice(-1)[0].replace(/\.(\w{3,4})(\?.*)?$/i,"")),a.call(i,"loadedmetadata")>=0&&u("loadedmetadata",!0)},v=function(){var b,c,d,e,f;for(b=Math.round(this.currentTime()),c=Math.round(this.duration()),e=Math.round(b/c*100),d=f=0;99>=f;d=f+=o)e>=d&&a.call(n,d)<0&&(a.call(i,"start")>=0&&0===d&&e>0?u("start",!0):a.call(i,"percentsPlayed")>=0&&0!==e&&u("percent played",!0,d),e>0&&n.push(d));a.call(i,"seek")>=0&&(s=r,r=b,Math.abs(s-r)>1&&(t=!0,u("seek start",!1,s),u("seek end",!1,r)))},e=function(){u("end",!0)},p=function(){var a;a=Math.round(this.currentTime()),u("play",!0,a),t=!1},m=function(){var a,b;a=Math.round(this.currentTime()),b=Math.round(this.duration()),a===b||t||u("pause",!1,a)},w=function(){var a;a=this.muted()===!0?0:this.volume(),u("volume change",!1,a)},q=function(){u("resize - "+this.width()+"*"+this.height(),!0)},f=function(){var a;a=Math.round(this.currentTime()),u("error",!0,a)},j=function(){var a;a=Math.round(this.currentTime()),("function"==typeof this.isFullscreen?this.isFullscreen():void 0)||("function"==typeof this.isFullScreen?this.isFullScreen():void 0)?u("enter fullscreen",!1,a):u("exit fullscreen",!1,a)},u=function(a,b,c){window.ga?ga("send","event",{eventCategory:g,eventAction:a,eventLabel:h,eventValue:c,nonInteraction:b}):window._gaq?_gaq.push(["_trackEvent",g,a,h,c,b]):console.log("Google Analytics not detected")},this.ready(function(){return this.on("loadedmetadata",k),this.on("timeupdate",v),a.call(i,"end")>=0&&this.on("ended",e),a.call(i,"play")>=0&&this.on("play",p),a.call(i,"pause")>=0&&this.on("pause",m),a.call(i,"volumeChange")>=0&&this.on("volumechange",w),a.call(i,"resize")>=0&&this.on("resize",q),a.call(i,"error")>=0&&this.on("error",f),a.call(i,"fullscreen")>=0?this.on("fullscreenchange",j):void 0})})}).call(this);
(function(window, document, vjs) {
"use strict";
  //cookie functions from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
  var
  getCookieItem = function(sKey) {
    if (!sKey || !hasCookieItem(sKey)) { return null; }
    var reg_ex = new RegExp(
      "(?:^|.*;\\s*)" +
      window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
    );
    return window.unescape(document.cookie.replace(reg_ex,"$1"));
  },

  setCookieItem = function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toGMTString();
          break;
      }
    }
    document.cookie =
      window.escape(sKey) + "=" +
      window.escape(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
  },

  hasCookieItem = function(sKey) {
    return (new RegExp(
      "(?:^|;\\s*)" +
      window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\=")
    ).test(document.cookie);
  },

  hasLocalStorage = function() {
    try {
      window.localStorage.setItem('persistVolume', 'persistVolume');
      window.localStorage.removeItem('persistVolume');
      return true;
    } catch(e) {
      return false;
    }
  },
  getStorageItem = function(key) {
    return hasLocalStorage() ? window.localStorage.getItem(key) : getCookieItem(key);
  },
  setStorageItem = function(key, value) {
    return hasLocalStorage() ? window.localStorage.setItem(key, value) : setCookieItem(key, value, Infinity, '/');
  },

  extend = function(obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  defaults = {
    namespace: ""
  },

  volumePersister = function(options) {
    var player = this;
    var settings = extend({}, defaults, options || {});

    var key = settings.namespace + '-' + 'volume';
    var muteKey = settings.namespace + '-' + 'mute';
    
    player.on("volumechange", function() {
      setStorageItem(key, player.volume());
      setStorageItem(muteKey, player.muted());
    });

    var persistedVolume = getStorageItem(key);
    if(persistedVolume !== null){
      player.volume(persistedVolume);
    }
    
    var persistedMute = getStorageItem(muteKey);
    if(persistedMute !== null){
      player.muted('true' === persistedMute);
    }
  };

  vjs.plugin("persistvolume", volumePersister);

})(window, document, videojs);

/*! videojs-seek - v0.1.2 - 2014-08-14
* Copyright (c) 2014 Adam Ervans; Licensed MIT */
(function(){videojs.plugin("seek",function(a){var b,c,d,e;return null==a&&(a={}),b=function(a){var b;return b=RegExp("[?&]"+a+"=([^&]*)").exec(window.location.search),b&&decodeURIComponent(b[1].replace(/\+/g," "))},c=a.seek_param||JSON.parse(null!=(e=this.options()["data-setup"])?e:"{}").seek_param||"t",d=parseInt(b(c)),d?this.ready(function(){return this.one("playing",function(){return this.currentTime(d)})}):void 0})}).call(this);
// Resolution switching support for videojs
//
// In this plugin I'm really going out of my way to *not* override the
// core videojs namespace and to *not* change the core API.  As a
// result this plugin is not as efficient as it might be.  It
// initializes itself *for each player* as scoped variables inside the
// plugin closure and grafts itself on to *the instance on which it was
// called* rather than on the videojs player prototype.  I don't expect
// this to be a big deal for anybody.
videojs.plugin('resolutions', function(options) {
  var player = this;

  // 'reduce' utility method
  // @param {Array} array to iterate over
  // @param {Function} iterator function for collector
  // @param {Array|Object|Number|String} initial collector
  // @return collector
  vjs.reduce = function(arr, fn, init, n) {
    if (!arr || arr.length === 0) { return; }
    for (var i=0,j=arr.length; i<j; i++) {
      init = fn.call(arr, init, arr[i], i);
    }
    return init;
  };

  this.resolutions_ = {
    options_: {},

    // takes an existing stream and stops the download entirely
    // without killing the player or disposing of the tech
    stopStream: function(){
      switch(player.techName){
      case "Html5":
        break;
      case "Flash":
        player.tech.el_.vjs_stop();
        break;
      }

      // this may cause flash or the native player to emit errors but
      // they are harmless
      player.src("");
    },

    // it is necessary to remove the sources from the DOM after
    // parsing them because otherwise the native player may be
    // inclined to stream both sources
    removeSources: function(el){
      var videoEl = player.el_.getElementsByTagName("video")[0];

      if (player.techName !== "Html5" || !videoEl) return;

      var srcs = videoEl.getElementsByTagName("source");
      for(var i=0;i<srcs.length;i++){
        videoEl.removeChild(srcs[i]);
      }
    },

    // buckets all parsed sources by their type ("video/mp4", for example)
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return sources grouped by type:
    // {
    //   "video/mp4": [
    //       {
    //           "data-res": "HD",
    //           "type": "video/mp4",
    //           "src": "http://some_video_url_hd"
    //       },
    //       {
    //           "data-default": "true",
    //           "data-res": "SD",
    //           "type": "video/mp4",
    //           "src": "http://some_video_url_sd"
    //       }
    //   ]
    //   "video/ogv": [
    //       {
    //           "data-res": "SD",
    //           "type": "video/ogv",
    //           "src": "http://some_video_url_sd"
    //       }
    //   ]
    // }
    bucketByTypes: function(sources){
      return vjs.reduce(sources, function(init, val, i){
        (init[val.type] = init[val.type] || []).push(val);
        return init;
      }, {}, player);
    },

    // takes parsed sources and selects the most appropriate source
    // taking into account resolution, technology support, and the
    // user's previous selections.  also indexes the sources
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} single source:
    // {
    //  "data-res": "HD",
    //  "type": "video/mp4",
    //  "src": "http://some_video_url_jd",
    //  "index": 0
    // }
    selectSource: function(sources){
      this.removeSources();

      var sourcesByType = this.bucketByTypes(sources);
      var typeAndTech   = this.selectTypeAndTech(sources);

      if (!typeAndTech) return false;

      // even though we choose the best resolution for the user here, we
      // should remember the resolutions so that we can potentially
      // change resolution later
      this.options_['sourceResolutions'] = sourcesByType[typeAndTech.type];

      return this.selectResolution(this.options_['sourceResolutions']);
    },

    // takes parsed sources and returns the most appropriate
    // technology and video type
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} type/tech:
    // {
    //  "type": "video/ogv",
    //  "tech": "Html5"
    // }
    selectTypeAndTech: function(sources) {
      var techName;
      var tech;

      for (var i=0,j=player.options_['techOrder'];i<j.length;i++) {
        techName = videojs.capitalize(j[i]);
        tech     = window['videojs'][techName];

        // Check if the browser supports this technology
        if (tech.isSupported()) {
          // Loop through each source object
          for (var a=0,b=sources;a<b.length;a++) {
            var source = b[a];
            // Check if source can be played with this technology
            if (tech['canPlaySource'](source)) {
              return { type: source.type, tech: techName };
            }
          }
        }
      }
    },

    // takes an array of sources of homogeneous type (ie. a complete
    // "bucket" from the output of bucketByTypes) and returns the best
    // source, taking into account the user's previous preferences
    // stored in local storage
    // @param {Array} homogeneous sources:
    // [
    //   {
    //       "data-res": "HD",
    //       "type": "video/mp4",
    //       "src": "http://some_video_url_hd"
    //   },
    //   {
    //       "data-default": "true",
    //       "data-res": "SD",
    //       "type": "video/mp4",
    //       "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} singular best source:
    // {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //     "index": 1
    // }
    selectResolution: function(typeSources) {
      var defaultRes = 0;
      var supportsLocalStorage = !!window.localStorage;

      // check to see if any sources are marked as default
      videojs.obj.each(typeSources, function(i, s){
        // add the index here so we can reference it later
        s.index = parseInt(i, 10);

        if (s['data-default']) defaultRes = s.index;
      }, player);

      // if the user has previously selected a preference, check if
      // that preference is available. if not, use the source marked
      // default
      var preferredRes = defaultRes;

      // trying to follow the videojs code conventions of if statements
      if (supportsLocalStorage){
        var storedRes = parseInt(window.localStorage.getItem('videojs_preferred_res'), 10);

        if (!isNaN(storedRes))
          preferredRes = storedRes;
      }

      var maxRes    = (typeSources.length - 1);
      var actualRes = preferredRes > maxRes ? maxRes : preferredRes;

      return typeSources[actualRes];
    }
  };

  // convenience method
  // @return {String} cached resolution label:
  // "SD"
  player.resolution = function(){
      return this.cache_.src.res;
  };

  // takes a source and switches the player's stream to it on the fly
  // @param {Object} singular source:
  // {
  //     "data-default": "true",
  //    "data-res": "SD",
  //     "type": "video/mp4",
  //     "src": "http://some_video_url_sd"
  // }
  player.changeResolution = function(new_source){
    // has the exact same source been chosen?
    if (this.cache_.src === new_source.src){
      this.trigger('resolutionchange');
      return this; // basically a no-op
    }

    // remember our position and playback state
    var curTime      = this.currentTime();
    var remainPaused = this.paused();

    // pause playback
    this.pause();

    // attempts to stop the download of the existing video
    this.resolutions_.stopStream();

    // HTML5 tends to not recover from reloading the tech but it can
    // generally handle changing src.  Flash generally cannot handle
    // changing src but can reload its tech.
    if (this.techName === "Html5"){
      this.src(new_source.src);
    } else {
      this.loadTech(this.techName, {src: new_source.src});
    }

    // when the technology is re-started, kick off the new stream
    this.ready(function() {
      this.one('loadeddata', vjs.bind(this, function() {
        this.currentTime(curTime);
      }));

      this.trigger('resolutionchange');

      if (!remainPaused) {
        this.load();
        this.play();
      }

      // remember this selection
      vjs.setLocalStorage('videojs_preferred_res', parseInt(new_source.index, 10));
    });
  };

  /* Resolution Menu Items
  ================================================================================ */
  var ResolutionMenuItem = videojs.MenuItem.extend({
    init: function(player, options){
      // Modify options for parent MenuItem class's init.
      options['label'] = options.source['data-res'];
      videojs.MenuItem.call(this, player, options);

      this.source = options.source;
      this.resolution = options.source['data-res'];

      this.player_.one('loadstart', vjs.bind(this, this.update));
      this.player_.on('resolutionchange', vjs.bind(this, this.update));
    }
  });

  ResolutionMenuItem.prototype.onClick = function(){
    videojs.MenuItem.prototype.onClick.call(this);
    this.player_.changeResolution(this.source);
  };

  ResolutionMenuItem.prototype.update = function(){
    var player = this.player_;
    if ((player.cache_['src'] === this.source.src)) {
      this.selected(true);
    } else {
      this.selected(false);
    }
  };

  /* Resolutions Button
  ================================================================================ */
  var ResolutionButton = videojs.MenuButton.extend({
    init: function(player, options) {
      videojs.MenuButton.call(this, player, options);

      if (this.items.length <= 1) {
        this.hide();
      }
    }
  });

  ResolutionButton.prototype.sourceResolutions_;

  ResolutionButton.prototype.sourceResolutions = function() {
    return this.sourceResolutions_;
  };

  ResolutionButton.prototype.onClick = function(e){
    // Only proceed if the target of the click was a DIV (just the button and its inner div, not the menu)
    // This prevents the menu from opening and closing when one of the menu items is clicked.
    if (e.target.className.match(/vjs-control-content/)) {

      // Toggle the 'touched' class
      this[this.el_.className.match(/touched/) ? "removeClass" : "addClass"]("touched");
    } else {

      // Remove the 'touched' class from all control bar buttons with menus to hide any already visible...
      var buttons = document.getElementsByClassName('vjs-menu-button');
      for(var i=0;i<buttons.length;i++){
        videojs.removeClass(buttons[i], 'touched');
      }

      this.removeClass('touched');
    }
  };

  ResolutionButton.prototype.createItems = function(){
    var resolutions = this.sourceResolutions_ = this.player_.resolutions_.options_['sourceResolutions'];
    var items = [];
    for (var i = 0; i < resolutions.length; i++) {
      items.push(new ResolutionMenuItem(this.player_, {
        'source': this.sourceResolutions_[i]
      }));
    }
    return items;
  };

  /**
   * @constructor
   */
  ResolutionsButton = ResolutionButton.extend({
    /** @constructor */
    init: function(player, options, ready){
      ResolutionButton.call(this, player, options, ready);
      this.el_.setAttribute('aria-label','Resolutions Menu');
      this.el_.setAttribute('id',"vjs-resolutions-button");
    }
  });

  ResolutionsButton.prototype.kind_ = 'resolutions';
  ResolutionsButton.prototype.buttonText = 'Resolutions';
  ResolutionsButton.prototype.className = 'vjs-resolutions-button';

  // let's get the party started!
  // we have to grab the parsed sources and select the source with our
  // resolution-aware source selector
  var source = player.resolutions_.selectSource(player.options_['sources']);

  // when the player is ready, add the resolution button to the control bar
  // https://github.com/guru-zoomforth/video-js-resolutions/commit/c0f1e9573820c72b0079200d73195ed396dd5bb6
  player.ready(function(){
    // Add Button to controlBar
    videojs.obj.merge(player.controlBar.options_['children'], {
      'resolutionsButton': {}
    });

    player.changeResolution(source);
    var button = new ResolutionsButton(player);
    player.controlBar.addChild(button);
    player.on('dispose', function() {
      player.controlBar.removeChild(button);
      delete player.controlBar.options_['children']['resolutionsButton']
    });
  });
});
var VimeoState={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3};
videojs.Vimeo=videojs.MediaTechController.extend({init:function(a,d,e){videojs.MediaTechController.call(this,a,d,e);this.player_=a;this.player_el_=document.getElementById(this.player_.id());this.player_.controls(!1);this.id_=this.player_.id()+"_vimeo_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});this.player_el_.insertBefore(this.el_,
this.player_el_.firstChild);this.baseUrl="https"==document.location.protocol?"https://secure.vimeo.com/video/":"http://player.vimeo.com/video/";this.vimeo={};this.vimeoInfo={};var h=this;this.el_.onload=function(){h.onLoad()};this.startMuted=a.options().muted;this.src(a.options().src)}});videojs.Vimeo.prototype.dispose=function(){this.vimeo.api("unload");delete this.vimeo;this.el_.parentNode.removeChild(this.el_);videojs.MediaTechController.prototype.dispose.call(this)};
videojs.Vimeo.prototype.src=function(a){this.isReady_=!1;if(a=a.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/))this.videoId=a[5];a={api:1,byline:0,portrait:0,show_title:0,show_byline:0,show_portait:0,fullscreen:1,player_id:this.id_,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0};this.el_.src=this.baseUrl+this.videoId+"?"+videojs.Vimeo.makeQueryString(a)};videojs.Vimeo.prototype.load=function(){};
videojs.Vimeo.prototype.play=function(){this.vimeo.api("play")};videojs.Vimeo.prototype.pause=function(){this.vimeo.api("pause")};videojs.Vimeo.prototype.paused=function(){return this.lastState!==VimeoState.PLAYING&&this.lastState!==VimeoState.BUFFERING};videojs.Vimeo.prototype.currentTime=function(){return this.vimeoInfo.time||0};videojs.Vimeo.prototype.setCurrentTime=function(a){this.vimeo.api("seekTo",a);this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.duration=function(){return this.vimeoInfo.duration||0};videojs.Vimeo.prototype.buffered=function(){return videojs.createTimeRange(0,this.vimeoInfo.buffered||0)};videojs.Vimeo.prototype.volume=function(){return this.vimeoInfo.muted?this.vimeoInfo.muteVolume:this.vimeoInfo.volume};videojs.Vimeo.prototype.setVolume=function(a){this.vimeo.api("setvolume",a);this.vimeoInfo.volume=a;this.player_.trigger("volumechange")};
videojs.Vimeo.prototype.muted=function(){return this.vimeoInfo.muted||!1};videojs.Vimeo.prototype.setMuted=function(a){a?(this.vimeoInfo.muteVolume=this.vimeoInfo.volume,this.setVolume(0)):this.setVolume(this.vimeoInfo.muteVolume);this.vimeoInfo.muted=a;this.player_.trigger("volumechange")};videojs.Vimeo.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.startMuted&&(this.setMuted(!0),this.startMuted=!1)};
videojs.Vimeo.prototype.onLoad=function(){this.vimeo.api&&(this.vimeo.api("unload"),delete this.vimeo);this.vimeo=$f(this.el_);this.vimeoInfo={state:VimeoState.UNSTARTED,volume:1,muted:!1,muteVolume:1,time:0,duration:0,buffered:0,url:this.baseUrl+this.videoId,error:null};var a=this;this.vimeo.addEvent("ready",function(d){a.onReady()});this.vimeo.addEvent("loadProgress",function(d,e){a.onLoadProgress(d)});this.vimeo.addEvent("playProgress",function(d,e){a.onPlayProgress(d)});this.vimeo.addEvent("play",
function(d){a.onPlay()});this.vimeo.addEvent("pause",function(d){a.onPause()});this.vimeo.addEvent("finish",function(d){a.onFinish()});this.vimeo.addEvent("seek",function(d,e){a.onSeek(d)})};videojs.Vimeo.prototype.onLoadProgress=function(a){var d=!this.vimeoInfo.duration;this.vimeoInfo.duration=a.duration;this.vimeoInfo.buffered=a.percent;this.player_.trigger("progress");d&&this.player_.trigger("durationchange")};videojs.Vimeo.prototype.onPlayProgress=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.onPlay=function(){this.vimeoInfo.state=VimeoState.PLAYING;this.player_.trigger("play")};videojs.Vimeo.prototype.onPause=function(){this.vimeoInfo.state=VimeoState.PAUSED;this.player_.trigger("pause")};videojs.Vimeo.prototype.onFinish=function(){this.vimeoInfo.state=VimeoState.ENDED;this.player_.trigger("ended")};videojs.Vimeo.prototype.onSeek=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate");this.player_.trigger("seeked")};
videojs.Vimeo.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};videojs.Vimeo.isSupported=function(){return!0};videojs.Vimeo.prototype.supportsFullScreen=function(){return!1};videojs.Vimeo.canPlaySource=function(a){return"video/vimeo"==a.type};videojs.Vimeo.makeQueryString=function(a){var d=[],e;for(e in a)a.hasOwnProperty(e)&&d.push(encodeURIComponent(e)+"="+encodeURIComponent(a[e]));return d.join("&")};
var Froogaloop=function(){function a(m){return new a.fn.init(m)}function d(a,c,b){if(!b.contentWindow.postMessage)return!1;var d=b.getAttribute("src").split("?")[0];a=JSON.stringify({method:a,value:c});"//"===d.substr(0,2)&&(d=window.location.protocol+d);b.contentWindow.postMessage(a,d)}function e(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(d){}"ready"!=b||k||(k=!0);if(a.origin!=l)return!1;a=c.value;var e=c.data,g=""===g?null:c.player_id;c=g?f[g][b]:f[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function h(a,c,b){b?(f[b]||(f[b]={}),f[b][a]=c):f[a]=c}var f={},k=!1,l="";a.fn=a.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);a=a.split("/");for(var c="",b=0,d=a.length;b<d;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}l=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,e=""!==b.id?b.id:null,f=c&&c.constructor&&c.call&&c.apply?null:c,g=c&&c.constructor&&c.call&&c.apply?c:null;g&&h(a,g,e);d(a,f,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,e=""!==b.id?b.id:null;h(a,c,e);"ready"!=a?d("addEventListener",a,b):"ready"==a&&k&&c.call(null,e);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b=""!==c.id?c.id:null;a:{if(b&&f[b]){if(!f[b][a]){b=!1;break a}f[b][a]=null}else{if(!f[a]){b=
!1;break a}f[a]=null}b=!0}"ready"!=a&&b&&d("removeEventListener",a,c)}};a.fn.init.prototype=a.fn;window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e);return window.Froogaloop=window.$f=a}();
!function(){function addEventListener(element,event,cb){element.addEventListener?element.addEventListener(event,cb,!0):element.attachEvent(event,cb)}function setInnerText(element,text){if("undefined"==typeof element)return!1;var textProperty="innerText"in element?"innerText":"textContent";try{element[textProperty]=text}catch(anException){element.setAttribute("innerText",text)}}videojs.Youtube=videojs.MediaTechController.extend({init:function(player,options,ready){if(this.featuresProgressEvents=!1,this.featuresTimeupdateEvents=!1,videojs.MediaTechController.call(this,player,options,ready),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),this.isAndroid=/(Android)/g.test(navigator.userAgent),this.playVideoIsAllowed=!(this.isIos||this.isAndroid),"undefined"!=typeof options.source)for(var key in options.source)options.source.hasOwnProperty(key)&&(player.options()[key]=options.source[key]);this.userQuality=videojs.Youtube.convertQualityName(player.options().quality),this.player_=player,this.playerEl_=document.getElementById(player.id()),this.playerEl_.className+=" vjs-youtube",this.qualityButton=document.createElement("div"),this.qualityButton.setAttribute("class","vjs-quality-button vjs-menu-button vjs-control"),this.qualityButton.setAttribute("tabindex",0);var qualityContent=document.createElement("div");this.qualityButton.appendChild(qualityContent),this.qualityTitle=document.createElement("span"),qualityContent.appendChild(this.qualityTitle),"undefined"!==player.options().quality&&setInnerText(this.qualityTitle,player.options().quality||"auto");var qualityMenu=document.createElement("div");if(qualityMenu.setAttribute("class","vjs-menu"),this.qualityButton.appendChild(qualityMenu),this.qualityMenuContent=document.createElement("ul"),this.qualityMenuContent.setAttribute("class","vjs-menu-content"),qualityMenu.appendChild(this.qualityMenuContent),this.id_=this.player_.id()+"_youtube_api",this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0}),this.el_.setAttribute("allowFullScreen",""),this.playerEl_.insertBefore(this.el_,this.playerEl_.firstChild),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var ieVersion=Number(RegExp.$1);this.addIframeBlocker(ieVersion)}else/(iPad|iPhone|iPod|android)/g.test(navigator.userAgent)||(this.el_.className+=" onDesktop",this.addIframeBlocker());this.parseSrc(player.options().src),this.playOnReady=this.player_.options().autoplay||!1,this.forceSSL=!("undefined"!=typeof this.player_.options().forceSSL&&this.player_.options().forceSSL!==!0),this.forceHTML5=!("undefined"!=typeof this.player_.options().forceHTML5&&this.player_.options().forceHTML5!==!0),this.updateIframeSrc();var self=this;player.ready(function(){var controlBar=self.playerEl_.querySelectorAll(".vjs-control-bar")[0];controlBar.appendChild(self.qualityButton),self.playOnReady&&!self.player_.options().ytcontrols&&("undefined"!=typeof self.player_.loadingSpinner&&self.player_.loadingSpinner.show(),"undefined"!=typeof self.player_.bigPlayButton&&self.player_.bigPlayButton.hide()),player.trigger("loadstart")}),this.on("dispose",function(){this.ytplayer&&this.ytplayer.destroy(),this.player_.options().ytcontrols||this.player_.off("waiting",this.bindedWaiting),this.playerEl_.querySelectorAll(".vjs-poster")[0].style.backgroundImage="none",this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),this.qualityButton.parentNode&&this.qualityButton.parentNode.removeChild(this.qualityButton),"undefined"!=typeof this.player_.loadingSpinner&&this.player_.loadingSpinner.hide(),"undefined"!=typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.hide(),this.iframeblocker&&this.playerEl_.removeChild(this.iframeblocker)})}}),videojs.Youtube.prototype.updateIframeSrc=function(){var params={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),disablekb:1,wmode:"transparent",controls:this.player_.options().ytcontrols?1:0,html5:this.player_.options().forceHTML5?1:null,playsinline:this.player_.options().playsInline?1:0,showinfo:0,rel:0,autoplay:this.playOnReady?1:0,loop:this.player_.options().loop?1:0,list:this.playlistId,vq:this.userQuality,origin:window.location.protocol+"//"+window.location.host};"file:"===window.location.protocol&&delete params.origin;for(var prop in params)!params.hasOwnProperty(prop)||"undefined"!=typeof params[prop]&&null!==params[prop]||delete params[prop];var self=this;if(null===this.videoId)this.el_.src="about:blank",setTimeout(function(){self.triggerReady()},500);else if(this.el_.src=(this.forceSSL||"file:"===window.location.protocol?"https:":window.location.protocol)+"//www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(params),this.player_.options().ytcontrols?this.player_.controls(!1):"undefined"==typeof this.player_.poster()&&setTimeout(function(){var posterEl=self.playerEl_.querySelectorAll(".vjs-poster")[0];posterEl.style.backgroundImage="url(https://img.youtube.com/vi/"+self.videoId+"/0.jpg)",posterEl.style.display=""},100),this.bindedWaiting=function(){self.onWaiting()},this.player_.on("waiting",this.bindedWaiting),videojs.Youtube.apiReady)this.loadYoutube();else if(videojs.Youtube.loadingQueue.push(this),!videojs.Youtube.apiLoading){var tag=document.createElement("script");tag.onerror=function(e){self.onError(e)},tag.src=this.forceSSL||"file:"===window.location.protocol?"https://www.youtube.com/iframe_api":"//www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag),videojs.Youtube.apiLoading=!0}},videojs.Youtube.prototype.onWaiting=function(){this.player_.bigPlayButton.hide()},videojs.Youtube.prototype.addIframeBlocker=function(ieVersion){this.iframeblocker=videojs.Component.prototype.createEl("div"),this.iframeblocker.className="iframeblocker",this.iframeblocker.style.position="absolute",this.iframeblocker.style.left=0,this.iframeblocker.style.right=0,this.iframeblocker.style.top=0,this.iframeblocker.style.bottom=0,this.iframeblocker.style.zIndex=9999,ieVersion&&9>ieVersion?this.iframeblocker.style.opacity=.01:this.iframeblocker.style.background="rgba(255, 255, 255, 0.01)";var self=this;addEventListener(this.iframeblocker,"mousemove",function(e){self.player_.userActive()||self.player_.userActive(!0),e.stopPropagation(),e.preventDefault()}),addEventListener(this.iframeblocker,"click",function(){self.paused()?self.play():self.pause()}),this.playerEl_.insertBefore(this.iframeblocker,this.el_.nextSibling)},videojs.Youtube.prototype.parseSrc=function(src){if(this.srcVal=src,src){var regId=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,match=src.match(regId);this.videoId=match&&11===match[2].length?match[2]:null;var regPlaylist=/[?&]list=([^#\&\?]+)/;match=src.match(regPlaylist),null!==match&&match.length>1?this.playlistId=match[1]:this.playlistId&&delete this.playlistId;var regVideoQuality=/[?&]vq=([^#\&\?]+)/;match=src.match(regVideoQuality),null!==match&&match.length>1&&(this.userQuality=match[1],setInnerText(this.qualityTitle,videojs.Youtube.parseQualityName(this.userQuality)))}},videojs.Youtube.prototype.src=function(src){if("undefined"!=typeof src){if(this.parseSrc(src),"about:blank"===this.el_.src)return void this.updateIframeSrc();delete this.defaultQuality,null!==this.videoId&&(this.player_.options().autoplay&&this.playVideoIsAllowed?this.ytplayer.loadVideoById({videoId:this.videoId,suggestedQuality:this.userQuality}):this.ytplayer.cueVideoById({videoId:this.videoId,suggestedQuality:this.userQuality}),this.playerEl_.querySelectorAll(".vjs-poster")[0].style.backgroundImage="url(https://img.youtube.com/vi/"+this.videoId+"/0.jpg)",this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg"))}return this.srcVal},videojs.Youtube.prototype.load=function(){},videojs.Youtube.prototype.play=function(){null!==this.videoId&&(this.player_.options().ytcontrols||this.player_.trigger("waiting"),this.isReady_?(this.ytplayer.setVolume(100*this.player_.volume()),this.volumeVal>0?this.ytplayer.unMute():this.ytplayer.mute(),this.playVideoIsAllowed&&this.ytplayer.playVideo()):this.playOnReady=!0)},videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo()},videojs.Youtube.prototype.paused=function(){return this.ytplayer?this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING:!0},videojs.Youtube.prototype.currentTime=function(){return this.ytplayer&&this.ytplayer.getCurrentTime?this.ytplayer.getCurrentTime():0},videojs.Youtube.prototype.setCurrentTime=function(seconds){this.ytplayer.seekTo(seconds,!0),this.player_.trigger("timeupdate")},videojs.Youtube.prototype.duration=function(){return this.ytplayer&&this.ytplayer.getDuration?this.ytplayer.getDuration():0},videojs.Youtube.prototype.currentSrc=function(){return this.srcVal},videojs.Youtube.prototype.ended=function(){return this.ytplayer?this.lastState===YT.PlayerState.ENDED:!1},videojs.Youtube.prototype.volume=function(){return this.ytplayer&&isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100,this.player_.volume(this.volumeVal)),this.volumeVal},videojs.Youtube.prototype.setVolume=function(percentAsDecimal){"undefined"!=typeof percentAsDecimal&&percentAsDecimal!==this.volumeVal&&(this.ytplayer.setVolume(100*percentAsDecimal),this.volumeVal=percentAsDecimal,this.player_.trigger("volumechange"))},videojs.Youtube.prototype.muted=function(){return this.mutedVal},videojs.Youtube.prototype.setMuted=function(muted){muted?(this.storedVolume=this.volumeVal,this.ytplayer.mute(),this.player_.volume(0)):(this.ytplayer.unMute(),this.player_.volume(this.storedVolume)),this.mutedVal=muted,this.player_.trigger("volumechange")},videojs.Youtube.prototype.buffered=function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var loadedBytes=this.ytplayer.getVideoBytesLoaded(),totalBytes=this.ytplayer.getVideoBytesTotal();if(!loadedBytes||!totalBytes)return 0;var duration=this.ytplayer.getDuration(),secondsBuffered=loadedBytes/totalBytes*duration,secondsOffset=this.ytplayer.getVideoStartBytes()/totalBytes*duration;return videojs.createTimeRange(secondsOffset,secondsOffset+secondsBuffered)}return videojs.createTimeRange(0,0)},videojs.Youtube.prototype.supportsFullScreen=function(){return"function"!=typeof this.el_.webkitEnterFullScreen||!/Android/.test(videojs.USER_AGENT)&&/Chrome|Mac OS X 10.5/.test(videojs.USER_AGENT)?!1:!0},videojs.Youtube.isSupported=function(){return!0},videojs.Youtube.canPlaySource=function(srcObj){return"video/youtube"===srcObj.type},videojs.Youtube.canControlVolume=function(){return!0},videojs.Youtube.loadingQueue=[],videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(e){e.target.vjsTech.onReady()},onStateChange:function(e){e.target.vjsTech.onStateChange(e.data)},onPlaybackQualityChange:function(e){e.target.vjsTech.onPlaybackQualityChange(e.data)},onError:function(e){e.target.vjsTech.onError(e.data)}}}),this.ytplayer.vjsTech=this},videojs.Youtube.makeQueryString=function(args){var array=["modestbranding=1"];for(var key in args)args.hasOwnProperty(key)&&array.push(key+"="+args[key]);return array.join("&")},window.onYouTubeIframeAPIReady=function(){for(var yt;yt=videojs.Youtube.loadingQueue.shift();)yt.loadYoutube();videojs.Youtube.loadingQueue=[],videojs.Youtube.apiReady=!0},videojs.Youtube.prototype.onReady=function(){this.isReady_=!0,this.triggerReady(),this.player_.trigger("loadedmetadata"),this.player_.trigger("durationchange"),this.player_.trigger("timeupdate"),"undefined"==typeof this.player_.loadingSpinner||this.isIos||this.isAndroid||this.player_.loadingSpinner.hide(),this.player_.options().muted&&this.setMuted(!0),this.playOnReady&&(this.playOnReady=!1,this.play())},videojs.Youtube.prototype.updateQualities=function(){function setupEventListener(el){addEventListener(el,"click",function(){var quality=this.getAttribute("data-val");self.ytplayer.setPlaybackQuality(quality),self.userQuality=quality,setInnerText(self.qualityTitle,videojs.Youtube.parseQualityName(quality));var selected=self.qualityMenuContent.querySelector(".vjs-selected");selected&&videojs.Youtube.removeClass(selected,"vjs-selected"),videojs.Youtube.addClass(this,"vjs-selected")})}var qualities=this.ytplayer.getAvailableQualityLevels(),self=this;if(qualities.indexOf(this.userQuality)<0&&setInnerText(self.qualityTitle,videojs.Youtube.parseQualityName(this.defaultQuality)),0===qualities.length)this.qualityButton.style.display="none";else{for(this.qualityButton.style.display="";this.qualityMenuContent.hasChildNodes();)this.qualityMenuContent.removeChild(this.qualityMenuContent.lastChild);for(var i=0;i<qualities.length;++i){var el=document.createElement("li");el.setAttribute("class","vjs-menu-item"),setInnerText(el,videojs.Youtube.parseQualityName(qualities[i])),el.setAttribute("data-val",qualities[i]),qualities[i]===this.quality&&videojs.Youtube.addClass(el,"vjs-selected"),setupEventListener(el),this.qualityMenuContent.appendChild(el)}}},videojs.Youtube.prototype.onStateChange=function(state){if(state!==this.lastState){switch(state){case-1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:this.player_.options().ytcontrols||(this.playerEl_.querySelectorAll(".vjs-poster")[0].style.display="block","undefined"!=typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.show()),this.player_.trigger("ended");break;case YT.PlayerState.PLAYING:this.playVideoIsAllowed=!0,this.updateQualities(),this.player_.trigger("timeupdate"),this.player_.trigger("durationchange"),this.player_.trigger("playing"),this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.options().ytcontrols||this.player_.trigger("waiting");break;case YT.PlayerState.CUED:}this.lastState=state}},videojs.Youtube.convertQualityName=function(name){switch(name){case"144p":return"tiny";case"240p":return"small";case"360p":return"medium";case"480p":return"large";case"720p":return"hd720";case"1080p":return"hd1080"}return"auto"},videojs.Youtube.parseQualityName=function(name){switch(name){case"tiny":return"144p";case"small":return"240p";case"medium":return"360p";case"large":return"480p";case"hd720":return"720p";case"hd1080":return"1080p"}return"auto"},videojs.Youtube.prototype.onPlaybackQualityChange=function(quality){if("undefined"!=typeof this.defaultQuality||(this.defaultQuality=quality,"undefined"==typeof this.userQuality)){switch(this.quality=quality,setInnerText(this.qualityTitle,videojs.Youtube.parseQualityName(quality)),quality){case"medium":this.player_.videoWidth=480,this.player_.videoHeight=360;break;case"large":this.player_.videoWidth=640,this.player_.videoHeight=480;break;case"hd720":this.player_.videoWidth=960,this.player_.videoHeight=720;break;case"hd1080":this.player_.videoWidth=1440,this.player_.videoHeight=1080;break;case"highres":this.player_.videoWidth=1920,this.player_.videoHeight=1080;break;case"small":this.player_.videoWidth=320,this.player_.videoHeight=240;break;case"tiny":this.player_.videoWidth=144,this.player_.videoHeight=108;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")}},videojs.Youtube.prototype.onError=function(error){this.player_.error(error),(100===error||101===error||150===error)&&(this.player_.bigPlayButton.hide(),this.player_.loadingSpinner.hide(),this.player_.posterImage.hide())},videojs.Youtube.addClass=function(element,classToAdd){-1===(" "+element.className+" ").indexOf(" "+classToAdd+" ")&&(element.className=""===element.className?classToAdd:element.className+" "+classToAdd)},videojs.Youtube.removeClass=function(element,classToRemove){var classNames,i;if(-1!==element.className.indexOf(classToRemove)){for(classNames=element.className.split(" "),i=classNames.length-1;i>=0;i--)classNames[i]===classToRemove&&classNames.splice(i,1);element.className=classNames.join(" ")}};var style=document.createElement("style"),def=" .vjs-youtube .vjs-poster { background-size: 100%!important; }.vjs-youtube .vjs-poster, .vjs-youtube .vjs-loading-spinner, .vjs-youtube .vjs-big-play-button, .vjs-youtube .vjs-text-track-display{ pointer-events: none !important; }.vjs-youtube.vjs-user-active .iframeblocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-tech.onDesktop { pointer-events: none; }.vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }";style.setAttribute("type","text/css"),document.getElementsByTagName("head")[0].appendChild(style),style.styleSheet?style.styleSheet.cssText=def:style.appendChild(document.createTextNode(def)),Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=0>from?Math.ceil(from):Math.floor(from),0>from&&(from+=len);len>from;from++)if(from in this&&this[from]===elt)return from;return-1})}();
/*
 * Video.js Hotkeys
 * https://github.com/ctd1500/videojs-hotkeys
 *
 * Copyright (c) 2014 Chris Dougherty
 * Licensed under the Apache-2.0 license.
 */

(function(window, videojs) {
  'use strict';

  var hotkeys = function(options) {
    var player = this;
    var def_options = {
      volumeStep: 0.1,
      seekStep: 5,
      enableMute: true,
      enableFullscreen: true
    };
    options = options || {};

    // Set default player tabindex to handle keydown events
    if (!player.el().hasAttribute('tabIndex')) {
      player.el().setAttribute('tabIndex', '-1');
    }

    player.on('play', function() {
      // Fix allowing the YouTube plugin to have hotkey support.
      var ifblocker = player.el().querySelector('.iframeblocker');
      if (ifblocker &&
          ifblocker.style.display == "") {
        ifblocker.style.display = "block";
        ifblocker.style.bottom = "39px";
      }
    });

    var keyDown = function(event) {
      var volumeStep = options.volumeStep || def_options.volumeStep;
      var seekStep = options.seekStep || def_options.seekStep;
      var enableMute = options.enableMute || def_options.enableMute;
      var enableFull = options.enableFullscreen || def_options.enableFullscreen;

      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch keys if any control buttons are focused
        var activeEl = document.activeElement;
        if (activeEl == player.el() ||
            activeEl == player.el().querySelector('.vjs-tech') ||
            activeEl == player.el().querySelector('.vjs-control-bar') ||
            activeEl == player.el().querySelector('.iframeblocker')) {

          // Spacebar toggles play/pause
          if (event.which === 32) {
            event.preventDefault();
            if (player.paused()) {
              player.play();
            } else {
              player.pause();
            }
          }

          // Seeking with the left/right arrow keys
          else if (event.which === 37) { // Left Arrow
            event.preventDefault();
            var curTime = player.currentTime() - seekStep;

            // The flash player tech will allow you to seek into negative
            // numbers and break the seekbar, so try to prevent that.
            if (player.currentTime() <= seekStep) {
              curTime = 0;
            }
            player.currentTime(curTime);
          } else if (event.which === 39) { // Right Arrow
            event.preventDefault();
            player.currentTime(player.currentTime() + seekStep);
          }

          // Volume control with the up/down arrow keys
          else if (event.which === 40) { // Down Arrow
            event.preventDefault();
            player.volume(player.volume() - volumeStep);
          } else if (event.which === 38) { // Up Arrow
            event.preventDefault();
            player.volume(player.volume() + volumeStep);
          }

          // Toggle Mute with the M key
          else if (event.which === 77) {
            if (enableMute) {
              if (player.muted()) {
                console.log(player.muted(false));
              } else {
                console.log(player.muted(true));
              }
            }
          }

          // Toggle Fullscreen with the F key
          else if (event.which === 70) {
            if (enableFull) {
              if (player.isFullscreen()) {
                player.exitFullscreen();
              } else {
                player.requestFullscreen();
              }
            }
          }
        }
      }
    };

    player.on('keydown', keyDown);

    return this;
  };

  videojs.plugin('hotkeys', hotkeys);

})(window, window.videojs);

(function(vjs) {
  var
  extend = function(obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  defaults = {
    showOnPause: false,
    shareUrl: window.location,
    facebook: function(settings){
        return "https://www.facebook.com/sharer/sharer.php?u=" + settings.shareUrl;
    },
    twitter: function(settings){
        return "https://twitter.com/share?url=" + settings.shareUrl;
    }
  },

  shareTools = function(options) {
    var player = this;
    var settings = extend({}, defaults, options || {});

    var shareButton = document.createElement("div");
    shareButton.className = "vjs-sharetools-button vjs-control";
    shareButton.innerHTML = '<div><span class="vjs-control-text">Share</span></div>';
    player.controlBar.el().appendChild(shareButton);

    shareButton.open = false;

    if (settings.showOnPause) {
      player.on('pause', function() {
        if (!player.seeking() && !player.ended() && !shareTools.open) {
          shareTools.setup();
        }
      });
    }

    player.on('play', function() {
      shareTools.teardown();
    });

    shareButton.onclick = function(e) {
      if (shareTools.open) {
        shareTools.teardown();
      } else {
        shareTools.setup();
      }
    };

    shareTools.setup = function() {
      shareTools.open = true;
      if (!player.paused()) {
        player.pause();
      }

      var overlay = document.createElement("div");
      overlay.className = "sharetools-overlay";
      overlay.innerHTML = "<div class=\"sharetool\"><span class=\"text\">Share this video</span></div><a class=\"close\"></a>";

      var shareTool = overlay.getElementsByTagName("div")[0];
      if(settings.facebook) {
        var facebook = document.createElement('a');
        facebook.className = "fb";
        facebook.target = "_blank";
        facebook.href = settings.facebook(settings);
        facebook.innerHTML = "<span>Facebook</span>";
        shareTool.appendChild(facebook);
      }
      if(settings.twitter) {
        var twitter = document.createElement('a');
        twitter.className = "tw";
        twitter.target = "_blank";
        twitter.href = settings.twitter(settings);
        twitter.innerHTML = "<span>Twitter</span>";
        shareTool.appendChild(twitter);
      }
      if(settings.embed) {
        var embed = document.createElement('a');
        embed.className = "em";
        embed.innerHTML = "<span>Embed</span>";
        shareTool.appendChild(embed);

        var embedDiv = document.createElement('div');

        embedDiv.className = "embedtool";
        embedDiv.innerHTML = "<textarea class=\"textarea\"></textarea>";
        embedDiv.style.display = "none";
        overlay.appendChild(embedDiv);

        embed.onclick = function(e){
          var textArea = embedDiv.children[0];
          shareTool.style.display = "none";
          embedDiv.style.display = "block";
          textArea.appendChild(document.createTextNode(settings.embed(settings)));
          textArea.select();
        };
      }

      overlay.onclick = shareTools.overlayClick;
      document.addEventListener('keyup', shareTools.keyUp, false);
      player.el().insertBefore(overlay, player.controlBar.el());
    };

    shareTools.keyUp = function(e) {
      if (e.keyCode === 27) {
        shareTools.teardown();
      }
    };

    shareTools.overlayClick = function(e) {
      var c_name = e.target.className;
      if (c_name === "sharetools-overlay") {
        shareTools.teardown();
      }
      if (c_name === "close") {
        shareTools.teardown(false);
      }
    };

    shareTools.teardown = function(unpause) {
      if (unpause === undefined) {
        unpause = true;
      }
      var overlays = player.el().getElementsByClassName('sharetools-overlay');
      if (overlays.length > 0) {
        document.removeEventListener('keyup', shareTools.keyUp);
        player.el().removeChild(overlays[0]);
        if (player.paused() && unpause) {
          player.play();
        }
      }
      shareTools.open = false;
    };
  };

  vjs.plugin('sharetools', shareTools);
}(window.videojs));