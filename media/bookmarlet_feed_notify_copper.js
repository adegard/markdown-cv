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
	
	console.log("check ADE items ");
	document.getElementsByClassName("feed-welcome_message")[0].innerHTML="ACTIVITY : "+count(arrname, "ADE")+" /11";
	
	
	if(localStorage.getItem('lastfeedCopper')==undefined || subject==undefined){
			localStorage.setItem('lastfeedCopper', subject);
			console.log("not an email");
			document.getElementsByClassName("feed-welcome_title")[0].innerHTML="not an email "+d.toLocaleString();
		}else{
		if(localStorage.getItem('lastfeedCopper')==subject){
			console.log("same one");
			document.getElementsByClassName("feed-welcome_title")[0].innerHTML="same one "+d.toLocaleString();
			}else{
				localStorage.setItem('lastfeedCopper', subject);
				//window.location.href = 'https://app.copper.com/companies/190749/app#/feed';
				console.log("updated");
				document.getElementsByClassName("feed-welcome_title")[0].innerHTML="updated at "+d.toLocaleString();
				//add sound
 					var audio = new Audio('https://adegard.github.io/markdown-cv/media/mixkit-cooking-stopwatch-alert-1792.wav');
					audio.addEventListener('canplay', () =>{
						audio.play();
					}); 
				//change tab title
				window.document.title= record.logs[0].source.name;
	
				//alert(subject);
			}
	}
}

fetchData(); setInterval(fetchData, 180000);





/**
use https://caiorss.github.io/bookmarklet-maker/
to convert it in bookmarklet-maker/


Notify if new items in feed Copper
1. open https://app.copper.com/companies/<comany number>/app#/feed
2. activate bookmarklet

*/
