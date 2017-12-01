#pragma strict

public var abilityActive : boolean = false;
private var PlayerScript : PlayerScript;
public var abilityCountDown : int = abilityCountDownInitial;

private var normalScale : Vector3;
private var scaleFactor : float = 0.25;
private var Rb: Rigidbody;
private var normalMass : float;
//private var normalSpeed : float;
private var vfxObj : GameObject;
private var abilityCountDownInitial : int = 10;

//--vars for Bot B
private var BulletEmitter1 : GameObject;
// private var BulletEmitter2 : GameObject;
// private var fireFromL : boolean; //--alternates whether fire from L or R
private var fireRateNormal : float = 0.75;
private var fireRate : float = fireRateNormal;

//--vars for cog bot
// private var cogSpeedInitial : int; //--get this from cogSpinScript
// private var cog : GameObject;
// private var cogCollider : Collider;
// private var cogSpinScript : SpinTransform;
// private var bounceBackScript : BounceBack;
// private var cogSpinMax : int = 950;
// private var cogSpinCollider : int = 950;

//--vars for solar 
// public var movingHead : GameObject;
// public var target : GameObject;
// private var targets : GameObject[];

function Start () {
	PlayerScript = GetComponent.<PlayerScript>();
	
	vfxObj = PlayerScript.vfxObj;
	
	Rb = GetComponent.<Rigidbody>();
	
	normalScale = transform.localScale;
	normalMass = Rb.mass;
		
	InvokeRepeating("Countdown", 0, 1);
		
	if (PlayerScript.playerCharacter == "Solar"){
		// Invoke("FindOpponent", 1);
		// BulletEmitter1 = transform.Find("Solar/SolarHeadWrapper/BulletEmitter").gameObject;
	} else {

	}
	
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
	
	//--each character has different abilities
	if(PlayerScript.playerCharacter == "Solar") {

		// InvokeRepeating("FireLaser", 0, fireRate / 2f);

	}else {
		//--default ability - make player bigger 
		transform.localScale += new Vector3(scaleFactor, scaleFactor, scaleFactor);
		
		//--make player stronger    
	    Rb.mass = normalMass + 300;
    }
    
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

	//--put player back to normal mass
	Rb.mass = normalMass;
		
	//--make player back to normal size 
	transform.localScale = normalScale;
	
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



