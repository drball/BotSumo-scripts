#pragma strict

private var coll : Collider;
private var forceAmtInitial : float = 110;
// private var cog : GameObject;
// private var cogSpinScript : SpinTransform;
private var forceAmt : float = forceAmtInitial;
public var PlayerCharacter : GameObject;
private var otherRb : Rigidbody;

function Start () {

	coll = GetComponent.<Collider>();
	// Debug.Log("start forward = "+PlayerCharacter.transform.forward);
	// Debug.Log("initial force = "+forceAmt);
}

function ChangeForceAmt (cogSpeed : float){
	//--called when player collects pickup or pickup times out - based on speed of cog
	forceAmt = cogSpeed * 0.40;
	Debug.Log("change force amt = "+forceAmt+". cogspeed = "+cogSpeed);
}

function ResetForceAmt(){
	forceAmt = forceAmtInitial;
}

function OnTriggerEnter (other : Collider) 
{

	if(other.tag == "Player") {
		otherRb = other.GetComponent.<Rigidbody>();

		if(!otherRb){
			//-maybe this player has a separate rb & collider - try the parent
			otherRb = other.transform.parent.gameObject.GetComponent.<Rigidbody>();
		}
	} else {
		otherRb = other.GetComponent.<Rigidbody>();
	}

	if (otherRb) {
		
		// Apply force to the target object - calculate force

		var forceAmtLocal = forceAmt;
		var directionToOther = other.transform.position - PlayerCharacter.transform.position;
		
		if(other.tag == "Player") {
			//--apply more force when hitting player
			forceAmtLocal = forceAmt + 300;
		} 
		Debug.Log("cog apply force of "+forceAmtLocal+" to "+other.name);
		
		otherRb.AddForce((directionToOther * forceAmtLocal), ForceMode.Impulse);
		otherRb.AddTorque(transform.up * 450, ForceMode.Impulse);
		
	}

	
	
}