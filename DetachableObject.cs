using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//--spawns new identical object in the root with an RB if trigger is hit with significant force

public class DetachableObject : MonoBehaviour {

	public Rigidbody rb;
	public GameObject detachedVersion;
	
	// Update is called once per frame
	void Update () {
		
	}

	void OnTriggerEnter(Collider other) {

		Rigidbody otherRb = other.GetComponent<Rigidbody>();
        
		if( otherRb ){
			Debug.Log("speed of other "+otherRb.velocity.magnitude);

			float collisionMagnitude = otherRb.velocity.magnitude + rb.velocity.magnitude;

			if(collisionMagnitude > 0.2f){
				Debug.Log("collision was enough to detach");
				Detach();
			}
		}
    }

    void Detach(){
    	Debug.Log("pop off");
		gameObject.SetActive(false);

		//--spawn new - in same pos as this 
		GameObject newObj = Instantiate(detachedVersion, transform.position, transform.rotation);
		newObj.transform.localScale = transform.lossyScale;
    }

}
