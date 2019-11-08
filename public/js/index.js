var t1 = new TimelineMax({paused: true});

t1.to(".scroll-menu.one", 0.8, {
	 y: 11,
     rotation:45,
	 ease: Expo.easeInOut,
});
t1.to(".scroll-menu.two", 0.8, {
     y: 0,
     rotation: -45,
	 ease: Expo.easeInOut,
	 delay: -0.8, 
});

t1.from('.scroll-side-data',2,{
	x:-200,
	autoAlpha:0,
	ease:Expo.easeInOut,      	
});

t1.to(".scroll-side-menu", 2, {
	display:"block",
	ease: Expo.easeInOut,
	delay: -2,
	
});
t1.staggerFrom(".scroll-side-menu ul li", 2, {x: -200, opacity: 0, ease:Expo.easeOut}, 0.3);


t1.reverse();
$(document).on("click", ".toggle-btn", function() {
     t1.reversed(!t1.reversed());
});
$(document).on("click", "a", function() {
     t1.reversed(!t1.reversed());
});
$(document).on("click", "a", function() {
	t1.reversed(!t1.reversed());
});

$(window).scroll(function(){
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
	$('div.toggle-btn').addClass('scrolled',$(this).scrollTop()>100);
    $('div.scroll-side-menu').addClass('scrolled',$(this).scrollTop()>100);

});

const upcoming_parent=document.getElementById('upcoming-scrolling-wrapper-flexbox');
const past_parent=document.getElementById('past-scrolling-wrapper-flexbox');

const upcoming_url="https://commudle.com/api/v1/communities/script-foundation-india/upcoming_kommunity_events";
const past_url="https://commudle.com/api/v1/communities/script-foundation-india/past_kommunity_events";

function create_element(element)
{
   return Document.createElement(element);
}

function append_element(parent,child)
{
	return parent.append(child);
}
function fetch_commudle_upcoming()
{
   fetch(upcoming_url)
   .then((resp)=>resp.json())
   .then(function(data){
	   
		let events_=data.data.upcoming_events;
		if(events_.length==0)
		{
             return (document.getElementById('upcoming-horizontal-scroll').innerHTML+=`<div class="upcoming_coming"><h2>Coming Soon....</h2></div>`) 
		}
		else
		{
		  return events_.map(function(event){
		
			var start_date=new Date(event.data.attributes.start_time);
			var start_date_str=start_date.toDateString();
			var end_date=new Date(event.data.attributes.end_time);
			var address="VENUE : To be declared soon";
			if(event.included)
			{ 
				if(event.included.length==0)
			{ 
				
			}
			else
			{
                 var address=event.included[0].attributes.name+" "+event.included[0].attributes.address;           
			}
			}
		    document.getElementById('upcoming-horizontal-scroll').innerHTML+=`<div class="card">
		    <div class="card-body"><h5>${event.data.attributes.name}</h5>
			<hr><h6> &nbsp; Date : ${start_date_str.substr(3)}</h6>
			<p>${address}</p><br>
			<button class="btn details"><a href="${event.data.links.web_url}">Details</a></button>
			<button class="btn register"><a href="${event.data.links.available_forms_web_links.Registration}">Register</a></button>
			</div></div>`;
	   })
	   }
   })
   .catch(function(error){
	   console.log(error);
   })
   
}

function fetch_commudle_past()
{
   fetch(past_url)
   .then((resp)=>resp.json())
   .then(function(data){
		let events_=data.data.past_events;
	   if(events_.length==0)
	   {
           return (document.getElementById('past-horizontal-scroll').innerHTML+=`<div class="upcoming_coming"><h2>Coming Soon....</h2></div>`)
	   }
		else
		{return events_.map(function(event){
			// console.log(event.included);
			var start_date=new Date(event.data.attributes.start_time);
			var start_date_str=start_date.toDateString();
			var end_date=new Date(event.data.attributes.end_time);
		 //   console.log(start_date.toDateString());
			document.getElementById('past-horizontal-scroll').innerHTML+=`<div class="card">
			<div class="card-body"><h5>${event.data.attributes.name}</h5>
			<hr><h6> &nbsp; Date : ${start_date_str.substr(3)}</h6>
			<p>${event.included[0].attributes.name} . ${event.included[0].attributes.address}</p>
			<button class="btn details"><a href="${event.data.links.web_url}">Details</a></button>
			</div></div>`;
	   })
	}
   })
   .catch(function(error){
	   console.log(error);
   })
   
}


new WOW().init();

window.addEventListener("load", myInit, true); 
function myInit()
	{ 
		fetch_commudle_upcoming();
		fetch_commudle_past();	     
	};


var mymap = L.map('mapid',{ center: [24.3530065,76.8638575],zoom: 2});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
   }).addTo(mymap);

  var i; 
 var locations=[[30.7333,76.7794,'Script, Chandigarh'],
				[21.1458,79.0882,'Script, Nagpur'],
				[18.5204, 73.856,'Script, Pune'],
				[19.0760, 72.8777,'Script, Mumbai'],
				[12.9716, 77.5946,'Script, Bengaluru'],
				[26.9124, 75.7873,'Script, Jaipur'],
				[48.7783, -99.4179,'Script, United States of America'],
				[28.6139,77.2090,'Script, Headquarters, New Delhi'],
			];
			var mark={};
 for(i=0;i<locations.length;i++)
 {  
	var markerGroup = L.layerGroup().addTo(mymap);
    mark[i]=L.marker([locations[i][0],locations[i][1]]).addTo(mymap).bindPopup(locations[i][2]).openPopup().addTo(markerGroup);  
}
$(document).on('change','input',function(e){
	console.log("asdasd");
	if(e.target.value.length>0){
	
	for(i=0;i<locations.length;i++)
	{
		var str=e.target.value;
	    var res=new RegExp(str);
		if(res.test(locations[i][2].toLowerCase())){console.log("okk");}
		else{console.log("not okk");mymap.removeLayer(mark[i]);}
	}
	}
else{
	
	for(i=0;i<locations.length;i++)
	{  
	   var markerGroup = L.layerGroup().addTo(mymap);
	   mark[i]=L.marker([locations[i][0],locations[i][1]]).addTo(mymap).bindPopup(locations[i][2]).openPopup().addTo(markerGroup);  
   }

	}
});



/*	 

$(document).ready(function(){
	$("a").on('click',function(event){
		if(this.hash!=="")
		{
			event.preventDefault();
			var hash=this.hash;

			$('html','body').animate({
				scrollTop: $(hash).offset().top}, 800, function(){
			  window.location.hash = hash;
			});
		}
	})
})


<div class="card"><div class="card-body"><h4>${event.data.attributes.name}</h4><hr><h6>${events.data.attributes.start_time}</h6><p>${event.included[0].attributes.name}</p></div><div>

let dip =create_element('div');
			divp.className+='card';
			let divc = create_element('div');
			divc.className+='card-body';
			let h4 = create_element('h4');
			let p = create_element('p');
			
		   h4.innerHTML=events.data.attributes.name;
			append(divc,h4);
			append(divp,divc);
			append(div.upcoming-scrolling-wrapper-flexbox,divp)

*/


