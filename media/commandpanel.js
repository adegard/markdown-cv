// From Localhost:
//  document.body.appendChild(document.createElement('script')).src='http://localhost:8000/commandpanel.js';

// Inject the Jquery Into the Page
// document.body.appendChild(document.createElement('script')).src='http://code.jquery.com/jquery-1.7.2.min.js';

function create_tag(tag){
    return document.createElement(tag);
};

function create_text(text){
    return document.createTextNode(text);
};

function hyperlink(label, url, onclick){
    var a = create_tag("a") ;
    //a.href = url ;
    a.innerHTML = label;
    
    if (typeof url == "function"){
    
        a.href = func2JSurl(url);
    }else{
        a.href = url ;
    };
        
    //if(onclick !=undefined) a.onclick = onclick ;
    return a;
};

UL = create_tag("ul");
UL.className = "bookmarklets" ;
UL.style="list-style-type:disc";

function add_mark(label, url, onclick){
  var il = create_tag("il");
  var a = hyperlink(label, url, onclick);
  
  a.style.display = "block" ;
  il.appendChild(a) ;
  UL.appendChild(il);
  
};

function add_label(label){
  var il = create_tag("il");
  var t = create_text(label);
  // t.style.display = "block" ;
  il.appendChild(t) ;
  UL.appendChild(il);
  
};

function func2JSurl(func){
    var code = func.toString();
    var url = "javascript:(function()" + code.replace(/function.*\(\)/, '').replace(/\/\/.*/,"") + ")();";
    return url ;
};  


//--------------------------------------------------------------------//

function showAllLinks(){
    var a = '';
    for (var ln = 0; ln < document.links.length; ln++) {
        var lk = document.links[ln];
        a += ln + ': <a href=\'' + lk + '\' title=\'' + lk.text + '\'>' + lk + '</a><br>\n';
    };
    w = window.open('', 'Links', 'scrollbars,resizable,width=400,height=600');
    w.document.write(a);    
    //w.document.body.innerHTML = a ;
};

function fullUrls() {
/* Changes the text of links to match their absolute urls. */
    var i, c, x, h;
    for (i = 0; x = document.links[i]; ++i) {
        h = x.href;
        x.title += " " + x.innerHTML;
        while (c = x.firstChild) x.removeChild(c);
        x.appendChild(document.createTextNode(h));
    };
    panel.remove();
 
}


/* Credits: http://www.xinotes.net/notes/note/219/ */
function ShowCookies(){

     if (!window.hhhgewrt34frdki) {
     window.hhhgewrt34frdki = true;
     $c = document.createElement('DIV');
     $c.style.cssText = 'position:absolute;border:1px solid #6A8080;display:block;color:black;background:#FFF;z-index:1000000;height:auto;width:auto';
     document.body.appendChild($c);
     oldscroll = window.onscroll;
     window.onscroll = function() {
         $c.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + 5 + 'px';
         if (oldscroll) {
             oldscroll();
         };
     };


     $tbl = '<table style=\'background:#A9CCCC;font-family:sans-serif;font-size:0.9em;margin:0;padding:0\' cellspacing=\'1\' cellpadding=\'4\' border=\'0\'>';
     if (document.cookie) {
         $tbl += '<tr><th style=\'background:#6A8080;color:#FFF;\'>Cookie</th><th style=\'background:#6A8080;color:#FFF;\'><div style=\'display:block;float:right;cursor:pointer;width:auto\' onclick=\'document.body.removeChild($c);  window.onscroll = oldscroll;  window.hhhgewrt34frdki = null;\'>x</div>ValueÂ Â </th></tr>';
         $cc = document.cookie.split('; ');
         for ($i = 0; $i < $cc.length; $i++) {
             $c0 = $cc[$i];
             $ci = $c0.indexOf('=');
             if ($ci < 0) {
                 $ci = $c0.length;
             };
             $tbl += '<tr><td style=\'background:#FFF;text-align:left\'>' + $c0.substr(0, $ci) + '</td><td style=\'background:#FFF;text-align:left\'>' + unescape($c0.substr($ci + 1)) + '</td></tr>';
         };
     } else {
         $tbl += '<tr><th style=\'background:#6A8080;color:#FFF;width:200px\'><div style=\'display:block;float:right;cursor:pointer;width:auto\' onclick=\'document.body.removeChild($c);  window.onscroll = oldscroll;  window.hhhgewrt34frdki = null;\'>x</div>Cookies</th></tr>' + '<tr><td style=\'text-align:center;background:#FFF\'>None</td></tr>';
     };
     $tbl += '</table>';
     $c.innerHTML = $tbl;
     $c.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + 5 + 'px';
     $c.style.left = '5px';
     void(x = 3);
 };
};


function remove_panel(){
    panel.remove();
};

function hide_panel(){
    if (subpanel.hidden ==false){
        subpanel.hidden = true;
    }else{
        subpanel.hidden = false;
    }
};

panel = create_tag("div")

panelbar = create_tag("div")

//panelbar.innerHTML = "<a href='#' onclick='hide_panel()' id='panel_switch' >Hide Panel<a>"
panelbar.innerHTML = "JS PANEL" ;

// panelbar.style.position = "fixed"
panelbar.style.height = "20px";
panelbar.style["background-color"] = "yellow";
panelbar.style["z-index"] = 10e5;
panelbar.onclick = hide_panel ;

subpanel = create_tag("div")


panel.id = "InjectorPanel";
panel.style.position = "fixed";
panel.style.width = "150px";
//panel.style.height = "500px";
panel.style.top = "0px";
panel.style["background-color"] = "lightblue";


panel.appendChild(panelbar);
panel.appendChild(subpanel);

document.querySelector("body").appendChild(panel);

add_mark("QR Code", "javascript:(function(){if(document.getElementById){var x=document.body;var o=document.createElement('script');if(typeof(o)!='object') o=document.standardCreateElement('script');o.setAttribute('src','http://qrbookmarklet.googlecode.com/svn/trunk/qr.js');o.setAttribute('type','text/javascript');x.appendChild(o);}})();");
add_mark("NightView", "javascript:(function () { var css = 'html {-webkit-filter: invert(100%);' + '-moz-filter: invert(100%);' + '-o-filter: invert(100%);' + '-ms-filter: invert(100%); } img {-webkit-filter: invert(100%);' + '-moz-filter: invert(100%);' + '-o-filter: invert(100%);' + '-ms-filter: invert(100%); } video {-webkit-filter: invert(100%);' + '-moz-filter: invert(100%);' + '-o-filter: invert(100%);' + '-ms-filter: invert(100%); } html { background-color: transparent; }'; var head = document.getElementsByTagName('head')[0]; var style = document.createElement('style'); if (!window.counter) { window.counter = 1; } else { window.counter++; if (window.counter % 2 == 0) { var css = 'html{-webkit-filter:invert(0%);-moz-filter:invert(0%);-o-filter:invert(0%);-ms-filter:invert(0%);}img{-webkit-filter:invert(0%);-moz-filter:invert(0%);-o-filter:invert(0%);-ms-filter:invert(0%);}video{-webkit-filter:invert(0%);-moz-filter:invert(0%);-o-filter:invert(0%);-ms-filter:invert(0%);}html{background-color:transparent;}' } } style.type = 'text/css'; if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); document.body.style.backgroundColor='#111';%20}());");

add_mark("Show All Links", showAllLinks)

add_mark("Show Cookies", ShowCookies) ;

add_mark("Remove Ads", "javascript:(function(){    /* Ad-B-Gone: The simple bookmarklet that removes ads from web pages! Made by 3kh0. */    var selectors = [    /* By ID: */    '#sidebar-wrap',%20'#advert',%20'#xrail',%20'#middle-article-advert-container',%20%20%20%20'#sponsored-recommendations',%20'#around-the-web',%20'#sponsored-recommendations',%20%20%20%20'#taboola-content',%20'#taboola-below-taboola-native-thumbnails',%20'#inarticle_wrapper_div',%20%20%20%20'#rc-row-container',%20'#ads',%20'#at-share-dock',%20'#at4-share',%20'#at4-follow',%20'#right-ads-rail',%20%20%20%20'div#ad-interstitial',%20'div#advert-article',%20'div#ac-lre-player-ph',%20%20%20%20/*%20By%20Class:%20*/%20%20%20%20'.ad',%20'.avert',%20'.avert__wrapper',%20'.middle-banner-ad',%20'.advertisement',%20%20%20%20'.GoogleActiveViewClass',%20'.advert',%20'.cns-ads-stage',%20'.teads-inread',%20'.ad-banner',%20%20%20%20'.ad-anchored',%20'.js_shelf_ads',%20'.ad-slot',%20'.antenna',%20'.xrail-content',%20%20%20%20'.advertisement__leaderboard',%20'.ad-leaderboard',%20'.trc_rbox_outer',%20'.ks-recommended',%20%20%20%20'.article-da',%20'div.sponsored-stories-component',%20'div.addthis-smartlayers',%20%20%20%20'div.article-adsponsor',%20'div.signin-prompt',%20'div.article-bumper',%20'div.video-placeholder',%20%20%20%20'div.top-ad-container',%20'div.header-ad',%20'div.ad-unit',%20'div.demo-block',%20'div.OUTBRAIN',%20%20%20%20'div.ob-widget',%20'div.nwsrm-wrapper',%20'div.announcementBar',%20'div.partner-resources-block',%20%20%20%20'div.arrow-down',%20'div.m-ad',%20'div.story-interrupt',%20'div.taboola-recommended',%20%20%20%20'div.ad-cluster-container',%20'div.ctx-sidebar',%20'div.incognito-modal',%20'.OUTBRAIN',%20'.subscribe-button',%20%20%20%20'.ads9',%20'.leaderboards',%20'.GoogleActiveViewElement',%20'.mpu-container',%20'.ad-300x600',%20'.tf-ad-block',%20%20%20%20'.sidebar-ads-holder-top',%20'.ads-one',%20'.FullPageModal__scroller',%20%20%20%20'.content-ads-holder',%20'.widget-area',%20'.social-buttons',%20'.ac-player-ph',%20%20%20%20/*%20Other:%20*/%20%20%20%20'script',%20'iframe',%20'video',%20'aside#sponsored-recommendations',%20'aside[role="banner"]',%20'aside',%20%20%20%20'amp-ad',%20'span[id^=ad_is_]',%20'div[class*="indianapolis-optin"]',%20'div[id^=google_ads_iframe]',%20%20%20%20'div[data-google-query-id]',%20'section[data-response]',%20'ins.adsbygoogle',%20'div[data-google-query-id]',%20%20%20%20'div[data-test-id="fullPageSignupModal"]',%20'div[data-test-id="giftWrap"]'%20];%20%20%20%20for(let%20i%20in%20selectors)%20{%20%20%20%20%20%20%20%20let%20nodesList%20=%20document.querySelectorAll(selectors[i]);%20%20%20%20%20%20%20%20for(let%20i%20=%200;%20i%20<%20nodesList.length;%20i++)%20{%20%20%20%20%20%20%20%20%20%20%20%20let%20el%20=%20nodesList[i];%20%20%20%20%20%20%20%20%20%20%20%20if(el%20&&%20el.parentNode)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20el.parentNode.removeChild(el);%20%20%20%20%20%20%20%20}%20%20%20%20}})();");
add_mark("Unsticky", "javascript:(function()%7Blet%20elements%20%3D%20document.querySelectorAll('body%20*')%3B%0A%0Alet%20found%20%3D%200%3B%0A%0Afor%20(let%20i%20%3D%200%3B%20i%20%3C%20elements.length%3B%20i%2B%2B)%20%7B%0A%20%20%20%20let%20pos%20%3D%20getComputedStyle(elements%5Bi%5D).position%3B%0A%20%20%20%20if%20(%5B%22sticky%22%2C%22fixed%22%5D.indexOf(pos)%3E-1)%20%7B%0A%20%20%20%20%20%20%20%20elements%5Bi%5D.style.visibility%3D%22hidden%22%3B%0A%20%20%20%20%20%20%20%20found%2B%2B%3B%0A%20%20%20%20%7D%0A%7D%0A%0Aif%20(!found)%20alert(%22No%20sticky%20elements%20on%20this%20page%22)%3B%7D)()");
add_mark("MRR_B/W", "javascript:(function(){readConvertLinksToFootnotes=true;readStyle='style-apertura';readSize='size-medium';readMargin='margin-medium';mcr_script=document.createElement('SCRIPT');mcr_script.type='text/javascript';mcr_script.src='//anoved.github.io/mcreadability/readability.js?x='+(Math.random());document.getElementsByTagName('head')[0].appendChild(mcr_script);mcr_stylesheet=document.createElement('LINK');mcr_stylesheet.rel='stylesheet';mcr_stylesheet.href='//anoved.github.io/mcreadability/mcreadability.css';mcr_stylesheet.type='text/css';mcr_stylesheet.media='all';document.getElementsByTagName('head')[0].appendChild(mcr_stylesheet);s=document.createElement('SCRIPT');s.type='text/javascript';s.src='//anoved.github.io/mcreadability/scroll-converter.js';if (s.addEventListener) {s.addEventListener('load',function(){scrollConverter.activate();});} else if (s.readyState) {s.onreadystatechange = function(){scrollConverter.activate();};} else {s.onload = function(){scrollConverter.activate();};};document.getElementsByTagName('head')[0].appendChild(s);})();");

add_mark("Full URLs", fullUrls)

//===================
//add_label("Updates");
//add_mark("Bookmarklets", "http://caiorss.github.io/bookmarklets.html");

add_mark("Close", remove_panel)


subpanel.appendChild(UL);
