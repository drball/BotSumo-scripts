#pragma strict

public var rotationSpeed : float = .5;
public var speed : float = 1;
public var moving : boolean = false;
private var PlayerController : PlayerScript;
private var rb : Rigidbody;

function Start () {
	PlayerController = GetComponent.<PlayerScript>();

	rb = GetComponent.<Rigidbody>();
}

function Update () {

}

function FixedUpdate () 
{
	if ((moving == true) && (PlayerController.alive == true)){
	
		//-- stop it rotating
		rb.angularVelocity = Vector3.zero;
	
		//-- move forward
		rb.AddRelativeForce (Vector3.forward * speed, ForceMode.Impulse);

		transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
		
		//--if gets too fast, constrain speed
		if (rb.velocity.magnitude > speed) 
		{
	    	//GetComponent.<Rigidbody>().velocity = GetComponent.<Rigidbody>().velocity.normalized * speed;
		}
	
	} else {
		
		//-- rotate the player
		transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
	}

}

function Move(localmoving : boolean) {
	//--called when the button is pressed or stopped pressing 
	moving = localmoving; //--assign to public var
	
	if((localmoving == false) && (PlayerController.alive == true)) {

		//--switch spin direction
		rotationSpeed = -rotationSpeed;
	}
	
	if(!PlayerController.hasMoved && PlayerController.Btn){
		PlayerController.hasMoved = true;
		
		//--fade the instruction out for this player's control btn
		PlayerController.Btn.GetComponent.<Animator>().Play("FadeOut");
	}

}