//version to change at update
var versionnum = "V1.99 ";
console.log(versionnum);

//create checkbox 
var checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "mycheckoption";
checkbox.value = "value";
checkbox.id = "mycheckoption";

document.getElementsByClassName("WebAppHeader_left")[0].prepend(versionnum,checkbox);
document.getElementById("mycheckoption").insertAdjacentHTML("afterend","<label for='mycheckoption'>🔉</label>");
document.getElementById("mycheckoption").checked = true;

//decorate
AddImage("https://cdn.icon-icons.com/icons2/1250/PNG/512/1494258020-leafspringplantecologygreen_84346.png", '.MenuDropdown');
AddImage("https://cdn.icon-icons.com/icons2/2079/PNG/512/garden_bonsai_gardening_tree_growth_japanese_leaf_icon_127298.png", '.WebAppHeader_center');
AddImage("https://cdn.icon-icons.com/icons2/2313/PNG/512/plant_nature_leaves_leaf_dirt_earth_icon_141982.png", '.WebAppHeader_right');
document.querySelector(".LeftNav").style.backgroundColor="#6f8e7f";
document.querySelector(".LeftNav_content").style.backgroundColor="#6f8e7f";

var selectors = [ '.LeftNav_footerIconImg', '.LeftNav_inviteUsersSection', '.NotificationsDrawer_toggle'];
removeElements(selectors);

fetchData(); setInterval(fetchData, 180000);

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

	var selectors = [ '.feedActions', '.intercom-lightweight-app', '.CommentReactions_listReactions', '.ActivityItem_attachmentContainer'];
	removeElements(selectors);
	document.querySelector(".feedActionsContainer").style.width="10px"

	//addButIn(); //add Linkedin buttons
	
	if(record.logs[0].target ==null){
		var subject = undefined;
		}else{
		var subject = record.logs[0].target.subject;
	}
	var d = new Date();

	//check answers by ADE on ast feed items:
	let arrname=[];
	for (let i = 0; i < record.logs.length; i++) { arrname[i] = record.logs[i].actor.display_name;} 
	//console.log("arrname: "+arrname);
	
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
				//randome quote
			const quotefetch=await fetch('https://api.quotable.io/random');
			const datajson =await quotefetch.json();
			const myquote= datajson.content + "  -  "+ datajson.author;		
			messageCopper("📢 " + myquote + " - "+d.toLocaleString());		
				}else{
			console.log("no new email ");		
			messageCopper(" no new email🙄, checked at "+d.toLocaleString());
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
					messageCopper("🤸‍♀️🏃‍♂️time to move your body! ");
				}else{
				console.log("no new email ");		
					messageCopper("no new email 🙄, checked at "+d.toLocaleString());
				}	
			}else{
				localStorage.setItem('lastfeedCopper', subject);
				//window.location.href = 'https://app.copper.com/companies/190749/app#/feed';
				console.log("updated");
				
				 document.querySelector('.sideMenu-item').click();; //refresh
				//add sound
				if(checkedValue){
 					var audio = new Audio('https://adegard.github.io/markdown-cv/media/ding-126626.mp3');
					audio.addEventListener('canplay', () =>{
						audio.play();
					});
				}
			messageCopper("new email! 📨, updated at "+d.toLocaleString());
			//addButIn(); //add Linkedin buttons
			}
	}
}



function count(arrname, element) {
	return arrname.reduce((ele, arrayEle) =>
	(arrayEle == element ? ele + 1 : ele), 0);
};

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

function messageCopper(mymsg) {
		document.getElementsByClassName("feed-welcome_title")[0].innerHTML= mymsg;	 //change lat bar text
		window.document.title = mymsg; //change tab title
}


function addButIn(){
		let xpos =  document.querySelectorAll(".QuickActions");
		for (let i = 0; i < xpos.length; i++) {
		    let xnme =  document.querySelectorAll(".ActivityItem_headerContent");
		    let Htmlurl = "https://www.linkedin.com/search/results/people/?keywords="+xnme[i].innerText.replace(/to ([A-Z])(.*)/g, "")+"&origin=SWITCH_SEARCH_VERTICAL&sid=~_O";
		   xpos[i].innerHTML =  xpos[i].innerHTML + "<a href='" + Htmlurl + "' target='_blank'> <button class='box'>IN</button></a>";
		}
}	

function removeElements(selectors){
    for (let i=0; i < selectors.length; i++) {
	    //console.log("removing i: "+i+" - "+selectors[i]);
        let nodesList = document.querySelectorAll(selectors[i]);
        for (let j = 0; j < nodesList.length; j++) {
            let el = nodesList[j];
            if (el && el.parentNode) el.parentNode.removeChild(el);
        }
    }
}

function AddImage(imageurl, selector){
    if ( document.body.innerHTML.indexOf(imageurl) > -1) {
      //console.log('Image exists. ');
      } else {
        //console.log('Image does not exists.')
        const image = document.createElement('img')
        image.src = imageurl;
        image.style.height = '50px';
        document.querySelector(selector).prepend(image)
    }
}


//progressBarActivity("test","36","100");
/**
Add this to Bokmarklet:

javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://adegard.github.io/markdown-cv/media/bookmarlet_feed_notify_copper.js' })();

Notify if new items in feed Copper
1. open https://app.copper.com/companies/<comany number>/app#/feed
2. activate bookmarklet

*/
