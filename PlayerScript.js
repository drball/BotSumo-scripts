#pragma strict

// public var rotationSpeed : float = .5;
// public var speed : float = 1;

public var GameController : GameControllerScript;
public var alive = true;
public var score : int = 0;
public var hasMoved = false; //--use this to determine when to hide instruction
public var vfxObj : GameObject;
public var playerNum : int = 1;
public var playerCharacter : String;

private var count = 0;
private var fallingYPos : float = -2;
private var badRotationTimer : int;
private var startingPos : Vector3;
private var startingRotation : Quaternion;
static var Btn : GameObject; //--the button for this player (used for hiding the instruction)


function Start () {
	GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	
	InvokeRepeating("Timer", 1, 1);
	
	//--save start locations to variables
	startingPos = transform.position;
	
	startingRotation = transform.rotation;
	
	Respot();

	var rb = GetComponent.<Rigidbody>();
	
	if(playerNum == 1){
		Btn = GameObject.Find("LInstruction");
	} else {
		Btn = GameObject.Find("RInstruction");
		
	}


	
}


function Update() {

	if ((transform.position.y < fallingYPos) && alive == true){
		
		alive = false;
				
		if(GameController.roundActive == true){

			GameController.EndRound();
		}
	}
}


function Respot(){
	//--reset position
	transform.position = startingPos;
	
	//--reset rotation
	transform.rotation = startingRotation;
	
	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.06);
    
		if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	}else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
	
}

function Timer(){
	//--1 second cron
	//--count how long it's been on it's side.
	
	//Debug.Log("z = "+transform.eulerAngles.z+"x = "+transform.eulerAngles.x);
	if( ((transform.eulerAngles.x >= 70) && (transform.eulerAngles.x <= 300)) || ((transform.eulerAngles.z >= 70) && (transform.eulerAngles.z <= 300)) )
	{
		badRotationTimer++;
		// Debug.Log("-------------------bad rot. x="+transform.eulerAngles.x+" y="+transform.eulerAngles.y+" z ="+transform.eulerAngles.z);
	} else {
		badRotationTimer = 0;
	}
	
	//--restart if been on it's side for more than 3 seconds
	if((badRotationTimer > 3) && (alive == true)){
		badRotationTimer = 0;
		Respot();
	}
	
	//Debug.Log("rotTimer = "+badRotationTimer);
	
}

