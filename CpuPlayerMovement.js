#pragma strict

private var PlayerController : PlayerScript;
private var rb : Rigidbody;
public var rotationSpeed : float = .5;
public var speed : float = 1;

function Start () {
	Debug.Log("cpu player movement loaded");

	PlayerController = GetComponent.<PlayerScript>(); // get refrence to playercontroller script

	rb = GetComponent.<Rigidbody>();
}

function Update () {
	//--for non-physics things
}

function FixedUpdate () {

	//-- for physics things
	if (PlayerController.alive == true) {
	
		//-- move forward
		rb.AddRelativeForce(Vector3.forward * (speed*5), ForceMode.Impulse);

	} else {
		
		//-- rotate the player
		transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
	}

}