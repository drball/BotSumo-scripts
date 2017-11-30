using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CogSpinAbility : MonoBehaviour {

	private float cogSpeedInitial; //--get this from cogSpinScript
	public GameObject cog;
	private Collider cogCollider;
	public rotate SpinScript;
	public BounceBackScript bounceBackScript;
	private float cogSpinMax = 950f;
	private float cogSpinCollider = 950f;

	// Use this for initialization
	void Start () {

		cogSpeedInitial = SpinScript.spinZ;
		// Debug.Log("cog spin value = "+cogSpeedInitial);
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
		//--increase speed of spinning cog
		SpinScript.spinZ = SpinScript.spinZ + cogSpeedInitial;
		if(SpinScript.spinZ > cogSpinMax) {
			SpinScript.spinZ = cogSpinMax;
		}
		Debug.Log("new cogspeed is "+SpinScript.spinZ);
		bounceBackScript.ChangeForceAmt(SpinScript.spinZ);
	}

	void DisableAbilityBroadcast(){
		SpinScript.spinZ = cogSpeedInitial;
		bounceBackScript.ResetForceAmt();
	}
}
