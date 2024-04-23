//version to change at update
var versionnum = "V1.89 ";
console.log(versionnum);

//create checkbox 
var checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "mycheckoption";
checkbox.value = "value";
checkbox.id = "mycheckoption";

document.getElementsByClassName("WebAppHeader_left")[0].prepend(versionnum,checkbox);
document.getElementById("mycheckoption").insertAdjacentHTML("afterend","<label for='mycheckoption'>Sounds</label>");
document.getElementById("mycheckoption").checked = true;



//run script trigger
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

	//hide right bar
	for (const elements of document.querySelectorAll('.feedActions')) { elements.style.display = 'none';}
	document.querySelector(".feedActionsContainer").style.width="10px"
	//hide message question mark
	for (const elements of document.querySelectorAll('.intercom-lightweight-app')) { elements.style.display = 'none';}
	//hide comments/emoji
	for (const elements of document.querySelectorAll('.CommentReactions_listReactions')) {  elements.style.display = 'none';}
	//hide attachement area
	for (const elements of document.querySelectorAll('.ActivityItem_attachmentContainer')) { elements.style.display = 'none';}
	
	//randome quote
	const quotefetch=await fetch('https://api.quotable.io/random');
	const datajson =await quotefetch.json();
	const myquote= datajson.content + "  -  "+ datajson.author;
	
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
	
	progressBarActivity("ACTIVITY : ",count(arrname, "ADE"),"11");
	
	var checkedValue = document.getElementById("mycheckoption").checked;
	
	if(localStorage.getItem('lastfeedCopper')==undefined || subject==undefined){
			localStorage.setItem('lastfeedCopper', subject);
			console.log("not an email ");
			if( d.getMinutes() > 35 &&  d.getMinutes() < 45){
				//add a sound
				if(checkedValue){
					var audio = new Audio('https://adegard.github.io/markdown-cv/media/quothello-therequot-158832.mp3');
					audio.addEventListener('canplay', () =>{
						audio.play();
					});
			document.getElementsByClassName("feed-welcome_title")[0].innerHTML="📢 " + myquote + " - "+d.toLocaleString();			
				}else{
			document.getElementsByClassName("feed-welcome_title")[0].innerHTML=" no new email, checked at "+d.toLocaleString();					
				}		
			}
		}else{
		if(localStorage.getItem('lastfeedCopper')==subject){
			console.log("same one");
				if( d.getMinutes() > 55){
					//add sound for a break
					if(checkedValue){
						var audio = new Audio('https://adegard.github.io/markdown-cv/media/wa-dealio-15-38113.mp3');
						audio.addEventListener('canplay', () =>{
							audio.play();
						});
					}	
					document.getElementsByClassName("feed-welcome_title")[0].innerHTML="🤸‍♀️🏃‍♂️time to move your body! ";
				}else{
					document.getElementsByClassName("feed-welcome_title")[0].innerHTML="no new email, checked at "+d.toLocaleString();
				}	
			}else{
				localStorage.setItem('lastfeedCopper', subject);
				//window.location.href = 'https://app.copper.com/companies/190749/app#/feed';
				console.log("updated");
				document.getElementsByClassName("feed-welcome_title")[0].innerHTML="new email! 📨, updated at "+d.toLocaleString();
				 document.querySelector('.sideMenu-item').click();; //refresh
				//add sound
				if(checkedValue){
 					var audio = new Audio('https://adegard.github.io/markdown-cv/media/ding-126626.mp3');
					audio.addEventListener('canplay', () =>{
						audio.play();
					});
				}
				//change tab title
				window.document.title= record.logs[0].source.name;
			}
	}
}

fetchData(); setInterval(fetchData, 180000);

function progressBarActivity(mytitle,currval,maxbar) {
	var elemplace = document.getElementsByClassName("feed-welcome_message")[0]; //.innerHTML
	var myHTML = `
	    <p>`+mytitle+`</p>
	    <progress class="progress progress1" max="`+maxbar+`" value="`+currval+`"></progress><span>`+currval+`/`+maxbar+`</span>
	  `
	var div = document.createElement('div');
	div.setAttribute('class', 'task-progress');
	elemplace.innerHTML = myHTML;
	//elemplace.prepend(div);
}

//progressBarActivity("test","36","100");
/**
Add this to Bokmarklet:

javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://adegard.github.io/markdown-cv/media/bookmarlet_feed_notify_copper.js' })();

Notify if new items in feed Copper
1. open https://app.copper.com/companies/<comany number>/app#/feed
2. activate bookmarklet

*/
