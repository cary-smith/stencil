/*! Built with http://stenciljs.com */
App.loadBundle("chunk-7751c5cf.js",["exports"],function(t){window.App.h,t.formatCommitUrl=function(t,e){if(t&&t.startsWith("git+")){var i=t.substring(4);i.endsWith(".git")&&(i=i.substr(0,t.length-4)),i+="/commit/"+e}return""},t.formatDate=function(t){var e=new Date(t),i=e.getUTCFullYear()+"-";return i+=("0"+(e.getUTCMonth()+1)).slice(-2)+"-",i+=("0"+e.getUTCDate()).slice(-2)+" ",i+=("0"+e.getUTCHours()).slice(-2)+":",(i+=("0"+e.getUTCMinutes()).slice(-2)+":")+("0"+e.getUTCSeconds()).slice(-2)}});