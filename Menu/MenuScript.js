#pragma strict

public var LoadingPanel : GameObject;
public var LogoFree : GameObject; 
public var LogoPaid : GameObject; 
public var MenuPopup : GameObject;

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

	// var timesPlayed : int = PlayerPrefs.GetInt("timesPlayed");

	// if(timesPlayed > 1){
	// 	MenuPopup.SetActive(true);
	// } else {
	// 	MenuPopup.SetActive(false);
	// }
}


function StartGame() {
	//--show loading panel because there's a delay
	LoadingPanel.SetActive(true);

	
	Application.LoadLevel ("levelSelect");
}

function FacebookBtnPressed() {
	Application.OpenURL("https://www.facebook.com/davidonionball");
}

function RateBtnPressed() {
	if(VersionController.paidVersion == true){
		Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.BotSumoBattleArena");
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

function BattleArenaBtnPressed() {
	Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.BotSumoBattleArena");
}

function FokkerBtnPressed() {
	Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.ChickenFokkers");
}

function ETSBtnPressed() {
	Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.EscapeTheSector");
}