#pragma strict

// private var coll : Collider;
private var forceAmtInitial : float = 110;
// private var cog : GameObject;
// private var cogSpinScript : SpinTransform;
private var forceAmt : float = forceAmtInitial;
public var PlayerCharacter : GameObject;
// private var otherRb : Rigidbody;

function Start () {

	// coll = GetComponent.<Collider>();
	// Debug.Log("start forward = "+PlayerCharacter.transform.forward);
	Debug.Log("initial force = "+forceAmt);
}

function ChangeForceAmt (cogSpeed : float){
	//--called when player collects pickup or pickup times out - based on speed of cog
	forceAmt = cogSpeed * 0.40;
	Debug.Log("change force amt = "+forceAmt+". cogspeed = "+cogSpeed);
}

function ResetForceAmt(){
	Debug.Log("reset forceamt");
	forceAmt = forceAmtInitial;
	
}

function FixedUpdate () {

	//--show an ad if spacebar is pressed
	if(Input.GetKey("up") ) {
		Debug.Log("forcemt = "+forceAmt);
		forceAmt += 10;
		Debug.Log("new forcemt = "+forceAmt);
	}
}

// function OnTriggerEnter (other : Collider) {
// 	Debug.Log("forcemt = "+forceAmt);
// 	forceAmt += 10;
// 		Debug.Log("new forcemt = "+forceAmt);
// }
function OnCollisionEnter (collision : Collision) 
{
	// forceAmt += 200;
	forceAmt = forceAmt;

	// for (var contact : ContactPoint in collision.contacts) {

		var contact : ContactPoint = collision.contacts[0];

		var other : GameObject = contact.otherCollider.gameObject;

		if(other.tag == "Player" || other.tag == "Box") {

			//--create some sparks when we hit the other
			var pos: Vector3 = contact.point;
			Debug.Log(contact.thisCollider.name + " hit " + contact.otherCollider.name+"at position "+pos);

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
			var directionToOther = other.transform.position - PlayerCharacter.transform.position;
			
			if(other.tag == "Player") {
				//--apply more force when hitting player
				forceAmtLocal = forceAmt + 300;
			} 
			Debug.Log("---cog apply force of "+forceAmtLocal+" to "+other.name+" forcemat = "+forceAmt);

			otherRb.AddForce((directionToOther * forceAmtLocal), ForceMode.Impulse);
			otherRb.AddTorque(transform.up * 450, ForceMode.Impulse);
			
		}
		
	// }
	
}