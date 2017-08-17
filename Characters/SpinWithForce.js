#pragma strict

public var spinX : float = 0;
public var spinY : float = 0;
public var spinZ : float = 0;

function Start () {

}

function Update () {
	GetComponent.<Rigidbody>().AddRelativeTorque(spinX,spinY,spinZ);
}