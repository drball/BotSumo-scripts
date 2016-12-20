#pragma strict

public var LoadingPanel : GameObject;
public var LogoFree : GameObject; 
public var LogoPaid : GameObject; 

private var VersionController : VersionController;

function Awake(){
	VersionController = GameObject.Find("VersionController").GetComponent.<VersionController>();

	if(VersionController.paidVersion == true){
		LogoFree.SetActive(false);
		LogoPaid.SetActive(true);
	} else {
		LogoFree.SetActive(true);
		LogoPaid.SetActive(false);
	}
}

function Start(){
	LoadingPanel.SetActive(false);
}

// public var AnalyticsController : AnalyticsController;
// public var AnalyticsController2 : Analytics;

function StartGame() {
	//--show loading panel because there's a delay
	LoadingPanel.SetActive(true);

	//--track this event
	// Analytics.CustomEvent("asdasdasdas");
	// Analytics.event("sdsf");
	// AnalyticsController = GetComponent.<AnalyticsController>();
	// AnalyticsController2 = GetComponent.<Analytics>();
	// AnalyticsController2.hello();
	
	Application.LoadLevel ("levelSelect");
}

function FacebookBtnPressed() {
	Application.OpenURL("https://www.facebook.com/drball");
}

function RateBtnPressed() {
	if(VersionController.paidVersion == true){
		Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.RoboSumo");
	}else {
		Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.RoboSumo");
	}
	
}

function TwitterBtnPressed() {
	Application.OpenURL("https://www.twitter.com/davidonionball");
	
}

function LikeBtnPressed() {
	Application.OpenURL("https://www.facebook.com/BotSumoGame/");
	
}
