#pragma strict

private var VersionController : VersionController;
public var unlocked : boolean = false;
public var levelName : String;
private var LevelSelectScript : LevelSelectScript;
private var LevelsController : LevelsController;
public var LockedPanel : GameObject;

function Awake () {

	VersionController = GameObject.Find("VersionController").GetComponent.<VersionController>(); //--a singleton
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>(); //--a singleton
	LevelSelectScript = GameObject.Find("GameController").GetComponent.<LevelSelectScript>();

	// CheckIfLocked();
}

function CheckIfLocked (){
	if(VersionController.paidVersion == true)
	{
		unlocked = true;
		Debug.Log("this is the paid version - unlocked "+levelName);

	} else {
		Debug.Log(levelName+" check if unlocked");
		//--now check if this particular level has been unlocked
		if(PlayerPrefs.GetInt(levelName+"Unlocked")){
			unlocked = true;
			Debug.Log(levelName+" is unlocked");
		} else {
			Debug.Log(levelName+" is locked");
		}
	}

	if( unlocked == true){
		UnlockButton();
	}
}

function UnlockButton (){
	//--hide the padlock overlay for this button
	Debug.Log("unlock button for "+levelName);

	LockedPanel.SetActive(false);

	// for(var obj : GameObject in Transform.FindGameObjectsWithTag("PaidOnly"))
	// {
	//     Debug.Log("hide "+obj.name);
	//     obj.SetActive(false);
	// }
}

function PressButton(){
	//--button action
	if(unlocked){
		LevelsController.SelectLevel(levelName);
	} else {
		LevelSelectScript.ShowUnlockModal(levelName);
	}
}