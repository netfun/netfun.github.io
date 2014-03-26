//Stylesheet
var $ = document; // shortcut
var netfun = 'css';  // you could encode the css path itself to generate id..
if (!$.getElementById(netfun)) {
  var head  = $.getElementsByTagName('head')[0];
  var link  = $.createElement('link');
  link.id   = netfun;
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css/netfun.css';
  link.media = 'all';
  head.appendChild(link);
}
//Collapsible 3-Column Layout Javascript by Mike Foster (Cross-Browser.com)
function toggleAlpha() {
  if (!enabled) return;
  var d, m, e, a, i;
  if (alphaVisible) {
    d = 'none';
    m = '0px';
  } else {
    d = 'block';
    m = '170px';
  }
  e = xGetElementById('navAlpha');
  e.style.display = d;
  a = xGetElementsByClassName('content');
  for (i = 0; i < a.length; ++i) {
    a[i].style.marginLeft = m;
  }
  alphaVisible = !alphaVisible;
}
function toggleBeta() {
  if (!enabled) return;
  var d, m, e, a, i;
  if (betaVisible) {
    d = 'none';
    m = '0px';
  }
  else {
    d = 'block';
    m = '210px';
  }
  e = xGetElementById('navBeta');
  e.style.display = d;
  a = xGetElementsByClassName('content');
  for (i = 0; i < a.length; ++i) {
    a[i].style.marginRight = m;
  }
  betaVisible = !betaVisible;
}
function xDef(){for(var b=0,a=arguments.length;b<a;++b){if(typeof(arguments[b])==="undefined"){return false}}return true}function xGetElementById(a){if(typeof(a)=="string"){if(document.getElementById){a=document.getElementById(a)}else{if(document.all){a=document.all[a]}else{a=null}}}return a}function xGetElementsByTagName(a,c){var b=null;a=a||"*";c=xGetElementById(c)||document;if(typeof c.getElementsByTagName!="undefined"){b=c.getElementsByTagName(a);if(a=="*"&&(!b||!b.length)){b=c.all}}else{if(a=="*"){b=c.all}else{if(c.all&&c.all.tags){b=c.all.tags(a)}}}return b||[]}function xGetElementsByClassName(k,b,n,h){var a=[],m,j,g,d;m=new RegExp("(^|\\s)"+k+"(\\s|$)");j=xGetElementsByTagName(n,b);for(g=0,d=j.length;g<d;++g){if(m.test(j[g].className)){a[a.length]=j[g];if(h){h(j[g])}}}return a};var enabled=false;var alphaVisible=true;var betaVisible=true;
window.onload = function() {
  var e = xGetElementById('navAlpha');
  if (e && xDef(e.style) && document.getElementsByTagName) {
    enabled = true;
  }
	toggleBeta();
}