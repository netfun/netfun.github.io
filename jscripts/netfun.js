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

