#pragma strict

private var startPos : float;
private var pushedPos : float;

function Start () {
	startPos = gameObject.transform.position.z;
	pushedPos = startPos + 0.2;

}

function Update () {
	
}

function OnCollisionEnter (collision : Collision) 
{


	var contact : ContactPoint = collision.contacts[0];

	var other : GameObject = contact.otherCollider.gameObject;

	// Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name+" impulse was "+collision.impulse.magnitude);

	if(other.tag == "Player" && collision.impulse.magnitude > 10) {
		Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name);

		//--depress the button
		gameObject.transform.position.z = pushedPos;

		yield WaitForSeconds(3);

		gameObject.transform.position.z = startPos;
	}
}