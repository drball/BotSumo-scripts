#pragma strict

public var LevelsController : LevelsController;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
}

function LoadMainLevel(){
	// Application.LoadLevel ("main");
	// LevelsController.currentLevel = "main";
	LevelsController.SelectLevel("main");

}

function LoadPitLevel(){
	LevelsController.SelectLevel("pit");

}