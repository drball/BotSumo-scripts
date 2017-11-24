#pragma strict

//--used for the cogbot, and also a shield. Uses OnCollisionEnter to find the contact point for sparks

public var forceAmtInitial : float = 110; //force - before modifications
private var forceAmt : float;
// public var PlayerCharacter : GameObject; //--to get proper direction

function Start () {

	// Debug.Log("initial force = "+forceAmt);
	forceAmt = forceAmtInitial;
}

function ChangeForceAmt (cogSpeed : float){
	//--called when player collects pickup or pickup times out - based on speed of cog
	forceAmt = cogSpeed * 0.40;
	Debug.Log("change force amt = "+forceAmt+". cogspeed = "+cogSpeed);
}

function ResetForceAmt(){
	// Debug.Log("reset forceamt");
	forceAmt = forceAmtInitial;
}

function FixedUpdate () {

	//--debug
	// if(Input.GetKey("up") ) {
	// 	Debug.Log("forcemt = "+forceAmt);
	// 	forceAmt += 10;
	// 	Debug.Log("new forcemt = "+forceAmt);
	// }
}

function OnCollisionEnter (collision : Collision) 
{

	forceAmt = forceAmt; //--needed?

	var contact : ContactPoint = collision.contacts[0];

	var other : GameObject = contact.otherCollider.gameObject;

	Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name);

	if(other.tag == "Player" || other.tag == "Box") {

		//--create some sparks when we hit the other
		var pos: Vector3 = contact.point;
		// Debug.Log(contact.thisCollider.name + " hit " + contact.otherCollider.name+"at position "+pos);

		var sparkInstance : GameObject = Instantiate(Resources.Load("Spark", GameObject),
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
			forceAmtLocal = forceAmt + 300;
		} 
		Debug.Log("---cog apply force of "+forceAmtLocal+" to "+other.name+" forceamt = "+forceAmt);

		otherRb.AddForce((directionToOther * forceAmtLocal), ForceMode.Impulse);
		otherRb.AddTorque(transform.up * 450, ForceMode.Impulse);
		
	}
	
}