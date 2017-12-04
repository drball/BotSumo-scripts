#pragma strict

public var abilityActive : boolean = false;
private var PlayerScript : PlayerScript;
public var abilityCountDown : int = abilityCountDownInitial;
private var vfxObj : GameObject;
private var abilityCountDownInitial : int = 10;


function Start () {
	PlayerScript = GetComponent.<PlayerScript>();
	
	vfxObj = PlayerScript.vfxObj;
		
	InvokeRepeating("Countdown", 0, 1);
}



function Countdown(){
	if((abilityCountDown > 0) && (abilityActive == true)){
		abilityCountDown--;
//		Debug.Log("countdown: "+abilityCountDown);
		
		if(abilityCountDown <=0){
			DisableAbility();
		}
	}
}

function FixedUpdate () {

	//--debug
	if(Input.GetKey("a") ) {
		ActivateAbility();
	}
}

function Update(){

	// if(PlayerScript.playerCharacter == "Solar") {

	// 	if(target){

	// 		var rotation = transform.rotation;

	// 		if(abilityActive){
	// 			rotation = Quaternion.LookRotation(Vector3(target.transform.position.x, movingHead.transform.position.y, target.transform.position.z) - movingHead.transform.position);
	// 		} 

 // 			movingHead.transform.rotation = Quaternion.Slerp(movingHead.transform.rotation, rotation, Time.deltaTime * 6f);

	// 	}
	// }
}

function ActivateAbility () {

	abilityActive = true;
	Debug.Log("ability active");
	BroadcastMessage("ActivateAbilityBroadcast");
	
	//--pause player for a bit - whilst flashing
	PlayerScript.alive = false;

    abilityCountDown = abilityCountDownInitial;

	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.05);

        if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	} else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
    
    PlayerScript.alive = true;
 
}


function DisableAbility() {

	abilityActive = false;

	Debug.Log("back to normal");

	SendMessage("DisableAbilityBroadcast");
	
	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.05);
    
		if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	}else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
}



