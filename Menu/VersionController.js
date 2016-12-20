#pragma strict

//--this object tracks which version of the game this is - free or paid (battle arena)

public var paidVersion : boolean = false;


function Awake () {

	//--because this is a singleton, we want only one
	if (FindObjectsOfType(GetType()).Length > 1)
	{
		//--destroy others like this
		Debug.Log("destroying this duplicate of LevelsController");
		Destroy(gameObject);
	}
}