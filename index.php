<?php

$devMode = TRUE;

//Create dynamic site root variable.
$siteRoot = "//" . $_SERVER["HTTP_HOST"];

//If your project isn't in the root directory of your server, specify the subfolder below.
$subDir = "PE-Web-App-Framework";
if( $subDir != "" ){
	$siteRoot = "/" . $subDir;
}

/* Force HTTPS */
if( ( !isset( $_SERVER["HTTPS"] ) || $_SERVER["HTTPS"] != "on" ) && !$devMode ){
	$redirectSiteRoot = "https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
    header("Location: " . $redirectSiteRoot);
    exit();
}

//Get requested page if it is specified.
( isset( $_GET['page'] ) ) ? $page = $_GET['page'] : $page = "";

if( $page == "" ){
	$pageSelect = "default";
}else{
	$pageSelect = $page;
}

//Site owner information
$author         	 = "Mr. Developer";
$appTitle       	 = "App Template";
$copyrightOwner 	 = "Mr. Developer Inc.";
$appDescription 	 = "";
$appKeywords		 = "";
$facebookDescription = "";
$googleAnalyticsId	 = "UA-XXXXXXXX-X";

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php echo $appTitle; ?></title>
	<meta name="Author" content="<?php echo $author; ?>">
	<meta name="Description" content="<?php echo $author; ?>">
	<meta name="Keywords" content="<?php echo $author; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="icon" href="<?php echo $siteRoot; ?>/images/favicon.png" />
	
	<!-- FACEBOOK META TAGS -->
	<meta property="og:url" content="<?php echo $siteRoot; ?>" />
	<meta property="og:title" content="<?php echo $appTitle; ?>" />
	<meta property="og:description" content="<?php echo $facebookDescription; ?>" />
	<meta property="og:image" content="<?php echo $siteRoot; ?>/images/icons/FB_Icon.png" />
	
	<link rel="stylesheet" href="<?php echo $siteRoot; ?>/css/main.css?v=2.24.2017.1" media="screen,projection,print" />
	
	<!-- Deferred scripts loaded at the end of the body element -->
	<script src="<?php echo $siteRoot; ?>/js/jquery.js?v=3.1.1"></script>
	<script>
		//Google Analytics
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', '<?php echo $googleAnalyticsId; ?>', 'auto');
		//End Google Analytics
	</script>
</head>
<body onload="onloadFunctionSet('<?php echo $pageSelect; ?>')" id="PageBody">
		<div id="MainBox">
		<header id="AppHeader" class="bg">
			<div id="MenuButton" onclick="App.openCloseMenu()">
				<div class="MenuIconSpacer"></div>
				<div class="MenuIconBar"></div>
				<div class="MenuIconSpacer"></div>
				<div class="MenuIconBar"></div>
				<div class="MenuIconSpacer"></div>
				<div class="MenuIconBar"></div>
				<div class="MenuIconSpacer"></div>
			</div>
			<div id="WebsiteTitle">
				<?php echo $appTitle;?>
			</div>
			<div id="SocialMedia">
				
			</div>
		</header>
		
		<nav id="NavMain">
			<div id="NavScrollWrap">
				<div class="NavLink bg" id="NavHomeButton" onclick="App.loadPage('home')">Home</div>
				<div class="NavLink bg" onclick="App.closeMenu()">Close Menu</div>
			</div>
		</nav>
		<div style="display:none;" id="MenuBackgroundShader" onclick="App.closeMenu()"></div>
		
		<div id="Content">
			<div id="ContentTitleContainer">
				<div id="ContentTitle">Loading...</div>
			</div>
			<div id="MainContent"></div>
			<div style="clear:both;"></div>
		</div>
		
		<footer id="Footer">
			<span>Our </span><span onclick="App.loadPage('privacy_policy')" class="textLink">Privacy Policy</span><span> & </span><span onclick="App.loadPage('disclaimer')" class="textLink">Disclaimer</span>
			<div>All material herein &copy; <?php echo date('Y'); ?> <?php echo $copyrightOwner;?>, all rights reserved.</div>
		</footer><!-- Fixes auto height on main content area -->
	</div>
	<!-- End Main Container -->

	<!-- Deferred Javascript Source Files -->
	<script src="<?php echo $siteRoot; ?>/js/app.js?v=2.24.2017.1"></script>
	<!-- End of Deferred Javascript Source Files -->
</body>
</html>