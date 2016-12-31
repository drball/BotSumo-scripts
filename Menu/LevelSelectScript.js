#pragma strict

public var LevelsController : LevelsController;
public var unlockModal : GameObject; 

private var VersionController : VersionController;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
	VersionController = GameObject.Find("VersionController").GetComponent.<VersionController>();
	HideUnlockModal();

	// GameObject.Find("LockedPanel").SetActive(false);

	//--hide the padlock only if this is paid version
	if(VersionController.paidVersion == true)
	{
		for(var obj : GameObject in GameObject.FindGameObjectsWithTag("PaidOnly"))
		{
		    Debug.Log("hidee "+obj.name);
		    obj.SetActive(false);
		}
	}
	
}

function LoadMainLevel(){
	// Application.LoadLevel ("main");
	// LevelsController.currentLevel = "main";
	LevelsController.SelectLevel("main");

}

function LoadPitLevel(){

	Debug.Log("load pit level");

	if(VersionController.paidVersion == true){
		LevelsController.SelectLevel("pit");
	} else {
		ShowUnlockModal();
	}

}

function LoadUnstableLevel(){

	Debug.Log("load unstable level");

	if(VersionController.paidVersion == true){
		LevelsController.SelectLevel("unstable");
	} else {
		ShowUnlockModal();
	}

}

function ShowUnlockModal(){
	unlockModal.SetActive(true);
}

function HideUnlockModal(){
	unlockModal.SetActive(false);
}

function DownloadPaidVersionBtn (){
	Application.OpenURL("https://play.google.com/store/apps/details?id=com.DavidDickBall.BotSumoBattleArena");
}