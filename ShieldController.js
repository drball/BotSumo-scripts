#pragma strict

public var shieldObj : GameObject;
public var shieldActive : boolean;
private var forceAmt : float = 250;
private var abilityCountDownInitial : int = 10;
private var abilityCountDown : int = abilityCountDownInitial;

function Start () {
	shieldObj.SetActive(false);
}

function ActivateShield(){
	shieldObj.SetActive(true);
	shieldActive = true;
	InvokeRepeating("Countdown",0,1);

	//-blink the shield into existence
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.04);
        shieldObj.GetComponent.<Renderer>().enabled = !shieldObj.GetComponent.<Renderer>().enabled;
        blinkingAmt++;
    }
    shieldObj.GetComponent.<Renderer>().enabled = true;
}

function Countdown(){
	if((abilityCountDown > 0) && (shieldActive == true)){
		abilityCountDown--;
		Debug.Log("shield countdown: "+abilityCountDown);
		
		if(abilityCountDown <=0){
			DisableShield();
		}
	}
}

function DisableShield(){

	Debug.Log("disable the shield");

	//-blink the shield out and disable it
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
		Debug.Log("blinkingAMt = "+blinkingAmt);
        yield WaitForSeconds(0.04);
        shieldObj.GetComponent.<Renderer>().enabled = !shieldObj.GetComponent.<Renderer>().enabled;
        blinkingAmt++;
    }
    shieldObj.GetComponent.<Renderer>().enabled = false;

	shieldObj.SetActive(false);
	shieldActive = false;
}

function OnCollisionEnter (collision : Collision) 
{

	if(shieldActive == true){
		var contact : ContactPoint = collision.contacts[0];

		var other : GameObject = contact.otherCollider.gameObject;

		Debug.Log("a shield collision has happened between "+contact.thisCollider.name +" and "+other.name);

		if(other.tag == "Player" || other.tag == "Box") {

			//--create some sparks when we hit the other
			var pos: Vector3 = contact.point;
			Debug.Log(contact.thisCollider.name + " hit " + contact.otherCollider.name+"at position "+pos);

			var sparkInstance : GameObject = Instantiate(Resources.Load("ShieldSpark", GameObject),
				pos, 
				Quaternion.identity
			);

			Destroy(sparkInstance,3);

			var otherRb : Rigidbody = other.GetComponent.<Rigidbody>();

			if(!otherRb){
				//-maybe this object has a separate rb & collider - try the parent
				otherRb = other.transform.parent.gameObject.GetComponent.<Rigidbody>();
			}

		}

		
		if (otherRb) {
			
			// Apply force to the target object - calculate force

			var forceAmtLocal : float = forceAmt;
			var directionToOther = other.transform.position - gameObject.transform.position;
		
			if(other.tag == "Player") {
				//--apply more force when hitting player
				forceAmtLocal = forceAmt + 800;
			} 
			Debug.Log("---cog apply force of "+forceAmtLocal+" to "+other.name+" forcemat = "+forceAmt);

			otherRb.AddForce((directionToOther * forceAmtLocal), ForceMode.Impulse);
			otherRb.AddTorque(transform.right * 450, ForceMode.Impulse);
			
		}
	}


	
}