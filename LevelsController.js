//--a singleton for remembering stuff about levels
#pragma strict

public var currentLevel : String;
public var LoadingDialog : GameObject; 
public var singlePlayer : boolean;

function Awake () {

	//--because this is a singleton, we want only onee
	if (FindObjectsOfType(GetType()).Length > 1)
	{
		//--destroy others like this
		Debug.Log("destroying this duplicate of LevelsController");
		Destroy(gameObject);
	}
}

function Start() {
	Debug.Log("LevelsController has started");
	
	HideLoadingDialog();
}

function SelectLevel(destinationTitle : String){
	//--select a level - then load the playerSelect screen
	LoadingDialog.SetActive(true);
	yield WaitForSeconds(0.25);

	currentLevel = destinationTitle;
	Debug.Log("levelscontroller is remembering level "+destinationTitle);
	Application.LoadLevel("playerSelect");
}

function LoadSelectedLevel(){
	//--load the level we selected earlier
	//--called from the playerSelect screen
	ShowLoadingDialog();

	yield WaitForSeconds(0.25);

	Debug.Log("levelscontroller is loading level "+currentLevel);
	Application.LoadLevel(currentLevel);
}


function ShowLoadingDialog(){
	Debug.Log("show loading");
	LoadingDialog.SetActive(true);
}

function HideLoadingDialog(){
	Debug.Log("hide loading");
	LoadingDialog.SetActive(false);
}


