#pragma strict

private var startPos : float;
private var pushedPos : float;
private var initialColor : Color;
private var rend: Renderer;
var highlightColor : Color;

public var PitObj : GameObject;
public static var pressed : boolean = false;
private var PitObjScript : PitPitScript;

// Most of this scripts is now implemented in C# in the script called BtnScript_CS
// The only function that needs to be left in this script is the PitObjScript.DropPit()
// which calls a method from another Js script, which would not be accessible from
// the c# script. Hence, please keep this script attached to the red button along
// with the BtnScript_CS script


function Start () {
	//startPos = gameObject.transform.position.z;
	//pushedPos = startPos + 0.2;

	//rend = GetComponent.<Renderer>();

	//initialColor = rend.material.color;

	PitObjScript = PitObj.GetComponent.<PitPitScript>();
}

function OnCollisionEnter (collision : Collision)
{
	var contact : ContactPoint = collision.contacts[0];

	var other : GameObject = contact.otherCollider.gameObject;

	// Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name+" impulse was "+collision.impulse.magnitude);

	if(other.tag == "Player"|| other.tag == "Box" && collision.impulse.magnitude > 10 && pressed == false) {
		//Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name);

		//pressed = true;



		////--depress the button
		//gameObject.transform.position.z = pushedPos;
		//rend.material.color = highlightColor;

		//--drop the pit!
		PitObjScript.DropPit();

		////--restore button
		//yield WaitForSeconds(15);

		//gameObject.transform.position.z = startPos;
		//pressed = false;
		//rend.material.color = initialColor;


	}
}