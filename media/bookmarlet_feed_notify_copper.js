async function fetchData() {
    const res=await fetch('https://app.copper.com/api/v1/companies/190749/feed/?activity_type_id=-1&version=2&view=slim&limit=11&offset=0', {
					  "headers": {
						"accept": "application/json, text/javascript",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
						 "mode": "no-cors",
						  "Access-Control-Allow-Origin": "*"
					},
					  "body": null,
					  "method": "GET"
				}
		)

   const record =await res.json();
	//version to change at update
	console.log("Version 1.3 ");

	//hide right bar
	for (const elements of document.querySelectorAll('.feedActions')) {
		  elements.style.display = 'none';
	}
	
	if(record.logs[0].target ==null){
		var subject = undefined;
		}else{
		var subject = record.logs[0].target.subject;
	}
	var d = new Date();

	//check answers by ADE on ast feed items:
	let arrname=[];
	for (let i = 0; i < record.logs.length; i++) { arrname[i] = record.logs[i].actor.display_name;} 

	function count(arrname, element) {
		return arrname.reduce((ele, arrayEle) =>
		(arrayEle == element ? ele + 1 : ele), 0);
	};
	
	document.getElementsByClassName("feed-welcome_message")[0].innerHTML="ACTIVITY : "+count(arrname, "ADE")+" /11";
	
	if(localStorage.getItem('lastfeedCopper')==undefined || subject==undefined){
			localStorage.setItem('lastfeedCopper', subject);
			console.log("not an email ");
			document.getElementsByClassName("feed-welcome_title")[0].innerHTML="no new email, checked at "+d.toLocaleString();
		}else{
		if(localStorage.getItem('lastfeedCopper')==subject){
			console.log("same one");
				if( d.getMinutes() > 55){
					//add sound for a break
						var audio = new Audio('https://adegard.github.io/markdown-cv/media/ping-82822.mp3');
						audio.addEventListener('canplay', () =>{
							audio.play();
						});
					document.getElementsByClassName("feed-welcome_title")[0].innerHTML="time to move our body! ";
				}else{
					document.getElementsByClassName("feed-welcome_title")[0].innerHTML="no new email, checked at "+d.toLocaleString();
				}	
			}else{
				localStorage.setItem('lastfeedCopper', subject);
				//window.location.href = 'https://app.copper.com/companies/190749/app#/feed';
				console.log("updated");
				document.getElementsByClassName("feed-welcome_title")[0].innerHTML="new email! 📨, updated at "+d.toLocaleString();
				//add sound
 					var audio = new Audio('https://adegard.github.io/markdown-cv/media/ding-126626.mp3');
					audio.addEventListener('canplay', () =>{
						audio.play();
					}); 
				//change tab title
				window.document.title= record.logs[0].source.name;
			}
	}
}

fetchData(); setInterval(fetchData, 180000);


/**
Add this to Bokmarklet:

javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://adegard.github.io/markdown-cv/media/bookmarlet_feed_notify_copper.js' })();

Notify if new items in feed Copper
1. open https://app.copper.com/companies/<comany number>/app#/feed
2. activate bookmarklet

*/
