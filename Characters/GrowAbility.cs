using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GrowAbility : MonoBehaviour {

	private Vector3 normalScale;
	private float scaleFactor = 0.20f;
	private Rigidbody Rb;
	private float normalMass;

	// Use this for initialization
	void Start () {
		Rb = GetComponent<Rigidbody>();
	
		normalScale = transform.localScale;
		normalMass = Rb.mass;
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
 
		transform.localScale += new Vector3(scaleFactor, scaleFactor, scaleFactor);
		
		//--make player stronger    
	    Rb.mass = normalMass + 300;
	}

	void DisableAbilityBroadcast(){
		//--put player back to normal mass
		Rb.mass = normalMass;
			
		//--make player back to normal size 
		transform.localScale = normalScale;
	}
}
