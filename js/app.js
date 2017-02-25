//Create "onload" function set
function onloadFunctionSet( pageSelection ){
	
	//Get page location for correct URL address.
	App.currentDirectory = window.location;
	
	//Open requested page if specified or load visitors last page.
	if( pageSelection === 'default' ){
		
		if( sessionStorage.pageMemory !== undefined && sessionStorage.pageMemory !== "" ){
			
			//Load visitors last page.
			App.loadPage( sessionStorage.pageMemory );
			
		}else{
			
			//Load default home page.
			App.loadPage( 'home' );
			
		}
		
	}else{
		
		//Load requested page. (URL requests)
		App.loadPage( pageSelection );
		
	}
	
	
}
//END of "onload" funciton set

//Main Object
var App = {
	
	cachePrevent:  "2.24.2017.1", //Specifies the document version number to prevent caching of old data.
	currentDirectory:         "", //Set in onloadFunctionSet().
	currentPage:              "",
	previousPage:             "",
	pageAttemptCount:          0,
	enableAnalytics:	   false,
	menuOpen:			   false,
	
	openCloseMenu: function(){

		if( this.menuOpen ){
		
			$('#NavMain')[0].style.display = "none";
			$('#MenuBackgroundShader')[0].style.display = "none";
			this.menuOpen = false;
		
		}else{
			
			$('#NavMain')[0].style.display = "block";
			$('#MenuBackgroundShader')[0].style.display = "block";
			this.menuOpen = true;
		
		}
	},
	
	closeMenu: function(){

		this.menuOpen = true;
		this.openCloseMenu();

	},
	
	loadPage: function( file ){
		
		this.previousPage                     = this.currentPage;   //Move last current page to previous page storage.
		this.currentPage                      = file.toLowerCase(); //Store current page access in object.
		sessionStorage.pageMemory             = file.toLowerCase(); //Store current page in browser session storage.
		$('#ContentTitle')[0].innerHTML       = "Loading...";       //Set title text.
		$('#MainContent')[0].style.visibility = "hidden";           //Ensures previous content gets cleared from the screen.
		this.closeMenu();
		document.body.scrollTop = 0;//Scroll to top of document.
		var htmlFileLocation    = this.currentDirectory+"/pages/"+file+".html?v="+this.cachePrevent;//Create unique file name to prevent caching.
		
		$.ajax({
			dataType: "html",
			url:      htmlFileLocation,
			data:     {},//Empty data object. Not required for GET method.
			success: function( data, textStatus, jqXHR ){
				
					$("#MainContent")[0].innerHTML  = data;
					
					if( $("#AppPageTitle")[0] === undefined ){
						
						$('#ContentTitle')[0].innerHTML = "Title Tag Not Found";
						
					}else{
						
						$('#ContentTitle')[0].innerHTML = $("#AppPageTitle")[0].innerHTML;
						
					}
					
					if( $("#PostLoadJavaScriptCode")[0] !== undefined && $("#PostLoadJavaScriptCode")[0].innerHTML != "" ){
						
						jQuery.globalEval( $("#PostLoadJavaScriptCode")[0].innerHTML );
						
					}
					
					if( App.currentPage.toLowerCase() === "contact" ){
						var ReferenceNumber      = Math.floor( ( Math.random()*1000000 ) + 1 );
						$('#human')[0].innerHTML = ReferenceNumber;
						//Function below fixes autofocus for Firefox
						AutoFocus('Contact');
					}
					
					$('#MainContent')[0].style.visibility = "visible";
					
					//Google Analytics tracking.
					if( App.enableAnalytics ){
						
						var pageValue = '/index.php?page=' + App.currentPage.toLowerCase();
						ga('send', {
						  hitType: 'pageview',
						  page: pageValue
						});
					
					}
				
				},
			error: function( jqXHR, textStatus, errorThrown ){
				
					App.pageAttemptCount++;
					
					if( App.pageAttemptCount >= 3 ){
				
						//Debug
						//console.log( "App.loadPage() text status: "   + textStatus );
						//console.log( "App.loadPage() error message: " + errorThrown );
						//console.log( "App.loadPage() jqXHR status: "  + jqXHR.status );
						
						//Reset counter.
						App.pageAttemptCount = 0;
						
						//Display error page.
						if( jqXHR.status === 404 ){
							
							$('#ContentTitle')[0].innerHTML = "Opps - Page Not Found";
							$("#MainContent")[0].innerHTML  = "The page you are looking for does not exist. Please let us know if you have received this error.";
						
						}else{
							
							$('#ContentTitle')[0].innerHTML = "Opps - Error Loading Page";
							$("#MainContent")[0].innerHTML  = "The page you are trying to load seems to be having a bad day. Please check back later.";
							
						}
						$('#MainContent')[0].style.visibility = "visible";
						
						//Track page load error via Google Analytics.
						if( App.enableAnalytics ){
							
							var pageValue = '/index.php?page=' + App.currentPage.toLowerCase() + '&error_code=' + jqXHR.status;
							ga('send', {
							  hitType: 'pageview',
							  page: pageValue
							});
						
						}
						
						//Clear viewers page memory. We don't want to send them to a bad page if they refresh their browser.
						sessionStorage.pageMemory = "";
					
					}else{
						
						//Retry page load.
						App.loadPage( App.currentPage.toLowerCase() );
						
					}
				
				},
			complete: function( jqXHR, textStatus ){
				
				}
		});
		
	}
	
}

//HELPER FUNCTIONS BELOW

//Recalculate background size
function autoResizeBackground(){//Called when viewer resizes browser window
	//Patch for IE8 on getting browser window inner width
	if(window.innerWidth){
		var userWidth = window.innerWidth;
	}else{
		var userWidth = $(window).width();
	}
	//Patch for IE8 on getting browser window inner height
	if(window.innerHeight){
		var userHeight = window.innerHeight;
		userHeight    += 100;
	}else{
		var userHeight = document.documentElement.clientHeight;
		userHeight    += 100;
	}
	var ActivityOverlay          = $('#ActivityOverlay')[0];
	ActivityOverlay.style.width  = userWidth + "px";
	ActivityOverlay.style.height = userHeight + "px";
}


//Trim leading and trailing spaces as well as tabs
function Trim(str){
	str = str.replace(/^\s+|\s+$/g,'');//Removes all leading and trailing spaces
	str = str.replace(/\t/g,'');//Removes all tabs Test
	str = str.replace(/\\/g,'');//Removes escape slashes used in mysql database security functions
	return str;
}