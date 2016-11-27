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
private var BulletEmitter2 : GameObject;
private var fireFromL : boolean; //--alternates whether fire from L or R
private var fireRateNormal : float = 0.75;
private var fireRate : float = fireRateNormal;

//--vars for cog bot
private var cogSpeedInitial : int; //--get this from cogSpinScript
private var cog : GameObject;
// private var cogColliderObj : GameObject;
private var cogCollider : Collider;
private var cogSpinScript : SpinTransform;
private var bounceBackScript : BounceBack;
private var cogSpinMax : int = 950;
private var cogSpinCollider : int = 950;

function Start () {
	//GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerScript = GetComponent.<PlayerScript>();
	
	vfxObj = PlayerScript.vfxObj;
	
	Rb = GetComponent.<Rigidbody>();
	
	normalScale = transform.localScale;
	normalMass = Rb.mass;
		
	InvokeRepeating("Countdown", 0, 1);

	Debug.Log("player character is "+PlayerScript.playerCharacter);
		
	if(PlayerScript.playerCharacter == "B")
	{	
		BulletEmitter1 = transform.Find("BulletEmitter1").gameObject;
		BulletEmitter2 = transform.Find("BulletEmitter2").gameObject;

	} else if (PlayerScript.playerCharacter == "Cog"){
			cog = transform.Find("CogWrapper").gameObject;
			cogSpinScript = cog.GetComponent.<SpinTransform>();
			cogSpeedInitial = cogSpinScript.spinZ;
			bounceBackScript = transform.Find("TriggerCollider").gameObject.GetComponent.<BounceBack>();
			Debug.Log("cog spin value = "+cogSpeedInitial);
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



function ActivateAbility () {

	abilityActive = true;
	Debug.Log("ability active");
	
	//--pause player for a bit - whilst flashing
	PlayerScript.alive = false;
	
	//--each character has different abilities
	if(PlayerScript.playerCharacter == "B")
	{
		InvokeRepeating("FireBullet", 0, fireRate);

	}else if(PlayerScript.playerCharacter == "Cog") {

		//--increase speed of spinning cog
		cogSpinScript.spinZ = cogSpinScript.spinZ + cogSpeedInitial;
		if(cogSpinScript.spinZ > cogSpinMax) {
			cogSpinScript.spinZ = cogSpinMax;
		}
		Debug.Log("new cogspeed is "+cogSpinScript.spinZ);
		bounceBackScript.ChangeForceAmt(cogSpinScript.spinZ);

	}else {
		//--default ability - make player bigger 
		transform.localScale += new Vector3(scaleFactor, scaleFactor, scaleFactor);
		
		//--make player stronger    
	    Rb.mass = normalMass + 300;
    }
//	}else if(PlayerScript.playerCharacter == "B") 
//	{
//		
//	}else if(PlayerScript.playerCharacter == "C") 
//	{
//		//--increase speed
//		Rb.speed = normalSpeed + 300;
//	}
    
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

	if(PlayerScript.playerCharacter == "B")
	{
		CancelInvoke("FireBullet");

	} else if(PlayerScript.playerCharacter == "Cog"){
		cogSpinScript.spinZ = cogSpeedInitial;
		bounceBackScript.ResetForceAmt();

	}else {
		//--put player back to normal mass
		Rb.mass = normalMass;
			
		//--make player back to normal size 
		transform.localScale = normalScale;
	}
		
//	}else if(PlayerScript.playerCharacter == "B") 
//	{
//		
//	}else if(PlayerScript.playerCharacter == "C") 
//	{
//		Rb.speed = normalSpeed;
//	}
	

	
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

function FireBullet() {

	fireFromL = !fireFromL;
	
	var Emitter : Vector3;
	
	if( fireFromL == true ){
//		var bulletInstance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
//			BulletEmitter1.transform.position, 
//			transform.rotation
//		);
		Emitter = BulletEmitter1.transform.position;
	}else {
//		var bulletInstance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
//			BulletEmitter2.transform.position, 
//			transform.rotation
//		);
		Emitter = BulletEmitter2.transform.position;
	}
	
	var bulletInstance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
			Emitter, 
			transform.rotation
		);
	
	//--set the owner of this bullet
	bulletInstance.GetComponent.<BulletScript>().Owner = gameObject;

}