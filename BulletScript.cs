using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletScript : MonoBehaviour {

	public float speed = 1f;
	public GameObject Vfx;
	public GameObject ParticleObj;
	public GameObject Owner; //--discount this from any collisions
	public float forceAmount = 200f;
	public float explosionScale = 1f;

	private Transform tr;
	private Rigidbody rb;
	private Collider coll;

	// Use this for initialization
	void Start () {
		Destroy(gameObject,7);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}


// #pragma strict

// public var speed = 1;
// public var Vfx : GameObject;
// public var ParticleObj : GameObject;
// public var Owner : GameObject; //--discount this from any collisions
// public var forceAmount : float = 200;
// public var explosionScale : float = 1f;

// private var tr : Transform;
// private var rb : Rigidbody;
// private var coll : Collider;

// function Start () {
// 	Destroy(gameObject,7);
	
// //	rb = GetComponent.<Rigidbody>();
// 	tr = transform;
// 	coll = GetComponent.<Collider>();
 
// }

// function FixedUpdate () {
// 	tr.Translate(Vector3.forward * speed * Time.deltaTime);
	
// 	//rb.AddForce(transform.forward * speed);
// }


// function OnTriggerEnter(other: Collider) 
// {
// 	if((other.gameObject == Owner) || (other.gameObject.name == "Shield")) {

// 		Debug.Log("hitting self");
		
// 	}else {
// 		coll.enabled = false;
	
// 		if (other.GetComponent.<Rigidbody>()) {
// 			Debug.Log("apply force to "+other.name);
// 			// Apply force to the target object - calculate force
			
// 			if(other.tag == "Player") {
// 				//--apply more force when hitting player
// 				forceAmount = forceAmount*5;
// 			}
// 			var force : Vector3 = tr.forward * forceAmount;
			
// 	//		force.y = 0;
// 			other.GetComponent.<Rigidbody>().AddForce(force, ForceMode.Impulse);
			
// 			Destroy(Vfx);

// 			if(ParticleObj){
// 				ParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;
// 			}
// 		}
		
// 		//--spawn an explosion
// 		var explosionInstance : GameObject = Instantiate(Resources.Load("Explosion", GameObject),
// 			transform.position, 
// 			transform.rotation
// 		);
// 		explosionInstance.transform.localScale = Vector3(explosionScale,explosionScale,explosionScale);
		
// 		Destroy(explosionInstance,3);

// 	}
// //	Debug.Log("collided with "+other.name);
	



// }
