var bustcachevar=0;var loadedobjects="";var rootdomain=location.protocol+window.location.hostname;var bustcacheparameter="";function loadajax(f,g){var h=false;if(window.XMLHttpRequest){h=new XMLHttpRequest()}else{if(window.ActiveXObject){try{h=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{h=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}}else{return false}}h.onreadystatechange=function(){loadpage(h,g)};if(bustcachevar){bustcacheparameter=(f.indexOf("?")!=-1)?"&"+new Date().getTime():"?"+new Date().getTime()}h.open("GET",f+bustcacheparameter,true);h.send(null)}function loadpage(c,d){if(c.readyState==4&&(c.status==200||window.location.href.indexOf("http")==-1)){document.getElementById(d).innerHTML=c.responseText}}function loadobjs(){if(!document.getElementById){return}for(i=0;i<arguments.length;i++){var d=arguments[i];var c="";if(loadedobjects.indexOf(d)==-1){if(d.indexOf(".js")!=-1){c=document.createElement("script");c.setAttribute("type","text/javascript");c.setAttribute("src",d)}else{if(d.indexOf(".css")!=-1){c=document.createElement("link");c.setAttribute("rel","stylesheet");c.setAttribute("type","text/css");c.setAttribute("href",d)}}}if(c!=""){document.getElementsByTagName("head").item(0).appendChild(c);loadedobjects+=d+" "}}}loadajax("../shoutcast/english.htm","shoutcast");loadobjs("../css/netfun.css");